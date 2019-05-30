import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CLOSING_TIME, DEFAULT_BG_TASK_ID, DEFAULT_FG_TASK_ID, DEFAULT_CONFIG, WAITING_FOR_OVERLAY_DISAPPEAR } from '../utils/constants';
import { NGX_UI_LOADER_CONFIG_TOKEN } from './ngx-ui-loader-config.token';
import { NgxUiLoaderConfig } from '../utils/interfaces';
import { Loaders, Loader, ShowEvent, Tasks, Task } from '../utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NgxUiLoaderService {
  /**
   * For internal use only.
   * @docs-private
   */
  backgroundClosing$: Observable<ShowEvent>;

  /**
   * For internal use only.
   * @docs-private
   */
  foregroundClosing$: Observable<ShowEvent>;

  /**
   * For internal use only.
   * @docs-private
   */
  showBackground$: Observable<ShowEvent>;

  /**
   * For internal use only.
   * @docs-private
   */
  showForeground$: Observable<ShowEvent>;

  private bgClosing: BehaviorSubject<ShowEvent>;
  private defaultConfig: NgxUiLoaderConfig;
  private fgClosing: BehaviorSubject<ShowEvent>;
  private loaders: Loaders;
  private showBackground: BehaviorSubject<ShowEvent>;
  private showForeground: BehaviorSubject<ShowEvent>;

  /**
   * Constructor
   */
  constructor(@Optional() @Inject(NGX_UI_LOADER_CONFIG_TOKEN) private config: NgxUiLoaderConfig) {
    this.defaultConfig = { ...DEFAULT_CONFIG };
    if (this.config) {
      if (this.config.minTime && this.config.minTime <= 0) {
        this.config.minTime = DEFAULT_CONFIG.minTime;
      }
      this.defaultConfig = { ...this.defaultConfig, ...this.config };
    }
    this.loaders = {};
    this.showForeground = new BehaviorSubject<ShowEvent>({ loaderId: '', isShow: false });
    this.showForeground$ = this.showForeground.asObservable();
    this.showBackground = new BehaviorSubject<ShowEvent>({ loaderId: '', isShow: false });
    this.showBackground$ = this.showBackground.asObservable();
    this.fgClosing = new BehaviorSubject<ShowEvent>({ loaderId: '', isShow: false });
    this.foregroundClosing$ = this.fgClosing.asObservable();
    this.bgClosing = new BehaviorSubject<ShowEvent>({ loaderId: '', isShow: false });
    this.backgroundClosing$ = this.bgClosing.asObservable();
  }

  /**
   * For internal use only.
   * @docs-private
   */
  bindLoaderData(loaderId: string): void {
    let isMaster = false;
    if (loaderId === this.defaultConfig.masterLoaderId) {
      this.throwErrorIfMasterLoaderExists(true);
      isMaster = true;
    } else { // not master loader
      this.throwErrorIfLoaderExists(loaderId, true);
    }
    if (this.loaders[loaderId]) {
      this.loaders[loaderId].isBound = true;
      this.loaders[loaderId].isMaster = isMaster;
      // emit showEvent after data loader is bound
      if (this.hasForeground(loaderId)) {
        this.showForeground.next({ loaderId, isShow: true });
      } else {
        if (this.hasBackground(loaderId)) {
          this.showBackground.next({ loaderId, isShow: true });
        }
      }
    } else {
      this.createLoaderData(loaderId, isMaster, true);
    }
  }

  /**
   * For internal use only.
   * @docs-private
   */
  updateLoaderId(loaderId: string, newLoaderId: string): void {
    this.throwErrorIfLoaderNotExist(loaderId);
    if (this.loaders[loaderId].loaderId === this.defaultConfig.masterLoaderId) {
      console.warn(`[ngx-ui-loader] - Cannot change loaderId of master loader. The current ` +
        `master's loaderId is "${this.defaultConfig.masterLoaderId}". If you really want to ` +
        `change it, please use NgxUiLoaderModule.forRoot() method.`);
      return;
    }
    if (newLoaderId !== loaderId) {
      this.throwErrorIfLoaderExists(newLoaderId, true);
      this.loaders[newLoaderId] = {
        loaderId: newLoaderId,
        tasks: { ...this.loaders[loaderId].tasks },
        isMaster: false,
        isBound: this.loaders[loaderId].isBound
      };
      delete this.loaders[loaderId];
    }
  }

  /**
   * For internal use only.
   * @docs-private
   */
  destroyLoaderData(loaderId: string): void {
    this.stopAllLoader(loaderId);
    delete this.loaders[loaderId];
  }

  /**
   * Get default loader configuration
   * @returns default configuration object
   */
  getDefaultConfig(): NgxUiLoaderConfig {
    return { ...this.defaultConfig };
  }

  /**
   * Get all the loaders
   */
  getLoaders(): Loaders {
    return JSON.parse(JSON.stringify(this.loaders));
  }

  /**
   * Get data of a specified loader. If loaderId is not provided, it will return data of master loader(if existed)
   */
  getLoader(loaderId?: string): Loader {
    if (loaderId) {
      this.throwErrorIfLoaderNotExist(loaderId);
    } else {
      this.throwErrorIfMasterLoaderNotExist();
      loaderId = this.defaultConfig.masterLoaderId;
    }
    return JSON.parse(JSON.stringify(this.loaders[loaderId]));
  }

  /**
   * Check whether the queue has a running foreground task with the given `taskId`.
   * If no `taskId` specified, it will check whether the queue has any running foreground tasks.
   * @param loaderId the loader Id
   * @param taskId the optional task Id
   * @returns boolean
   */
  hasForeground(loaderId: string, taskId?: string): boolean {
    return this.hasRunningTask(loaderId, taskId, true);
  }

  /**
   * Check whether the queue has a running background task with the given `taskId`.
   * If no `taskId` specified, it will check whether the queue has any running background tasks.
   * @param loaderId the loader Id
   * @param taskId the optional task Id
   * @returns boolean
   */
  hasBackground(loaderId: string, taskId?: string): boolean {
    return this.hasRunningTask(loaderId, taskId, false);
  }

  /**
   * Start the foreground loading of loader having `loaderId` with a specified `taskId`.
   * The loading is only closed off when all taskIds of that loader are called with stopLoader() method.
   * @param loaderId the loader Id
   * @param taskId the optional task Id of the loading. taskId is set to 'fd-default' by default.
   */
  startLoader(loaderId: string, taskId: string = DEFAULT_FG_TASK_ID): void {
    if (!this.readyToStart(loaderId, taskId, true)) {
      return;
    }
    if (!this.loaders[loaderId].tasks[taskId].isOtherRunning) { // no other foreground task running
      if (this.hasBackground(loaderId)) {
        this.backgroundCloseout(loaderId);
        this.showBackground.next({ loaderId, isShow: false });
      }
      this.showForeground.next({ loaderId, isShow: true });
    }
  }

  /**
   * Start the foreground loading of master loader with a specified `taskId`.
   * The loading is only closed off when all taskIds of that loader are called with stop() method.
   * NOTE: Really this function just wraps startLoader() function
   * @param taskId the optional task Id of the loading. taskId is set to 'fd-default' by default.
   */
  start(taskId: string = DEFAULT_FG_TASK_ID): void {
    this.startLoader(this.defaultConfig.masterLoaderId, taskId);
  }

  /**
   * Start the background loading of loader having `loaderId` with a specified `taskId`.
   * The loading is only closed off when all taskIds of that loader are called with stopLoaderBackground() method.
   * @param loaderId the loader Id
   * @param taskId the optional task Id of the loading. taskId is set to 'bg-default' by default.
   */
  startBackgroundLoader(loaderId: string, taskId: string = DEFAULT_BG_TASK_ID): void {
    if (!this.readyToStart(loaderId, taskId, false)) {
      return;
    }
    if (!this.hasForeground(loaderId) && !this.loaders[loaderId].tasks[taskId].isOtherRunning) {
      this.showBackground.next({ loaderId, isShow: true });
    }
  }

  /**
   * Start the background loading of master loader with a specified `taskId`.
   * The loading is only closed off when all taskIds of that loader are called with stopBackground() method.
   * NOTE: Really this function just wraps startBackgroundLoader() function
   * @param taskId the optional task Id of the loading. taskId is set to 'bg-default' by default.
   */
  startBackground(taskId: string = DEFAULT_BG_TASK_ID): void {
    this.startBackgroundLoader(this.defaultConfig.masterLoaderId, taskId);
  }

  /**
   * Stop a foreground loading of loader having `loaderId` with specific `taskId`
   * @param loaderId the loader Id
   * @param taskId the optional task Id to stop. If not provided, 'fg-default' is used.
   * @returns Object
   */
  stopLoader(loaderId: string, taskId: string = DEFAULT_FG_TASK_ID): void {
    if (!this.readyToStop(loaderId, taskId)) {
      return;
    }
    if (!this.hasForeground(loaderId)) {
      this.foregroundCloseout(loaderId);
      this.showForeground.next({ loaderId, isShow: false });
      if (this.hasBackground(loaderId)) {
        setTimeout(() => {
          if (this.hasBackground(loaderId)) { // still have background tasks
            this.showBackground.next({ loaderId, isShow: true });
          }
        }, WAITING_FOR_OVERLAY_DISAPPEAR);
      }
    }
  }

  /**
   * Stop a foreground loading of master loader with specific `taskId`
   * @param taskId the optional task Id to stop. If not provided, 'fg-default' is used.
   * @returns Object
   */
  stop(taskId: string = DEFAULT_FG_TASK_ID): void {
    this.stopLoader(this.defaultConfig.masterLoaderId, taskId);
  }

  /**
   * Stop a background loading of loader having `loaderId` with specific `taskId`
   * @param loaderId the loader Id
   * @param taskId the optional task Id to stop. If not provided, 'bg-default' is used.
   * @returns Object
   */
  stopBackgroundLoader(loaderId: string, taskId: string = DEFAULT_BG_TASK_ID): void {
    if (!this.readyToStop(loaderId, taskId)) {
      return;
    }
    if (!this.hasForeground(loaderId) && !this.hasBackground(loaderId)) {
      this.backgroundCloseout(loaderId);
      this.showBackground.next({ loaderId, isShow: false });
    }
  }

  /**
   * Stop a background loading of master loader with specific taskId
   * @param taskId the optional task Id to stop. If not provided, 'bg-default' is used.
   * @returns Object
   */
  stopBackground(taskId: string = DEFAULT_BG_TASK_ID): void {
    this.stopBackgroundLoader(this.defaultConfig.masterLoaderId, taskId);
  }

  /**
   * Stop all the background and foreground loadings of loader having `loaderId`
   * @param loaderId the loader Id
   */
  stopAllLoader(loaderId: string): void {
    this.throwErrorIfLoaderNotExist(loaderId);
    if (this.hasForeground(loaderId)) {
      this.foregroundCloseout(loaderId);
      this.showForeground.next({ loaderId, isShow: false });
    } else if (this.hasBackground(loaderId)) {
      this.backgroundCloseout(loaderId);
      this.showBackground.next({ loaderId, isShow: false });
    }
    this.clearAllTimers(this.loaders[loaderId].tasks);
    this.loaders[loaderId].tasks = {};
  }

  /**
   * Stop all the background and foreground loadings of master loader
   */
  stopAll(): void {
    this.stopAllLoader(this.defaultConfig.masterLoaderId);
  }

  /**
   * Create loader data if it does not exist
   * @docs-private
   */
  private createLoaderData(loaderId: string, isMaster: boolean, isBound: boolean): void {
    if (!this.loaders[loaderId]) {
      this.loaders[loaderId] = {
        loaderId,
        tasks: {},
        isMaster,
        isBound
      };
    }
  }

  /**
   * Throw error if the loaderId does not exist.
   * @docs-private
   */
  private throwErrorIfLoaderNotExist(loaderId: string): void {
    if (!this.loaders[loaderId]) {
      throw new Error(`[ngx-ui-loader] - loaderId "${loaderId}" does not exist.`);
    }
  }

  /**
   * Throw error if the loaderId has already existed.
   * @docs-private
   */
  private throwErrorIfLoaderExists(loaderId: string, useIsBoundProp?: boolean): void {
    if (this.loaders[loaderId] && (this.loaders[loaderId].isBound && useIsBoundProp)) {
      throw new Error(`[ngx-ui-loader] - loaderId "${loaderId}" is duplicated.`);
    }
  }

  /**
   * Throw error if the master loader has already existed.
   * @docs-private
   */
  private throwErrorIfMasterLoaderExists(useIsBoundProp?: boolean): void {
    if (this.loaders[this.defaultConfig.masterLoaderId] && (this.loaders[this.defaultConfig.masterLoaderId].isBound && useIsBoundProp)) {
      throw new Error(`[ngx-ui-loader] - The master loader has already existed. `
        + `The app should have only one master loader and it should be placed in the root app template`);
    }
  }

  /**
   * Throw error if the master loader does not exist.
   * @docs-private
   */
  private throwErrorIfMasterLoaderNotExist(): void {
    if (!this.loaders[this.defaultConfig.masterLoaderId]) {
      throw new Error(`[ngx-ui-loader] - The master loader does not exist.`);
    }
  }

  /**
   * Manage to close foreground loading
   * @docs-private
   * @param loaderId the loader id
   */
  private foregroundCloseout(loaderId: string): void {
    this.fgClosing.next({ loaderId, isShow: true });
    setTimeout(() => {
      this.fgClosing.next({ loaderId, isShow: false });
    }, CLOSING_TIME);
  }

  /**
   * Manage to close background loading
   * @docs-private
   * @param loaderId the loader id
   */
  private backgroundCloseout(loaderId: string): void {
    this.bgClosing.next({ loaderId, isShow: true });
    setTimeout(() => {
      this.bgClosing.next({ loaderId, isShow: false });
    }, CLOSING_TIME);
  }

  /**
   * Clear all timers of the given task
   * @docs-private
   */
  private clearTimers(task: Task): void {
    if (task.delayTimer) {
      clearTimeout(task.delayTimer);
    }
    if (task.maxTimer) {
      clearTimeout(task.maxTimer);
    }
    if (task.minTimer) {
      clearTimeout(task.minTimer);
    }
  }

  /**
   * Clear all timers of the given tasks
   * @docs-private
   */
  private clearAllTimers(tasks: Tasks): void {
    Object.keys(tasks).map((id) => {
      this.clearTimers(tasks[id]);
    });
  }

  /**
   * @docs-private
   */
  private hasRunningTask(loaderId: string, taskId: string, isForeground: boolean): boolean {
    if (this.loaders[loaderId]) {
      const tasks: Tasks = this.loaders[loaderId].tasks;
      if (taskId) {
        return tasks[taskId]
          ? tasks[taskId].startAt ? true : false
          : false;
      }
      return Object.keys(tasks)
        .some(id => !!tasks[id].startAt && tasks[id].isForeground === isForeground);
    }
    return false;
  }

  /**
   * @docs-private
   */
  private readyToStart(loaderId: string, taskId: string, isForeground: boolean): boolean {
    this.createLoaderData(loaderId, undefined, false);
    const isOtherRunning = this.hasRunningTask(loaderId, undefined, isForeground);
    if (!this.loaders[loaderId].tasks[taskId]) {
      this.loaders[loaderId].tasks[taskId] = { taskId, isForeground };
    } else {
      if (this.loaders[loaderId].tasks[taskId].isForeground !== isForeground) {
        throw new Error(`[ngx-ui-loader] - taskId "${taskId}" is duplicated.`);
      }
    }
    if (this.setDelayTimer(this.loaders[loaderId].tasks[taskId], loaderId)) {
      return false;
    }
    this.loaders[loaderId].tasks[taskId] = {
      ...this.loaders[loaderId].tasks[taskId],
      isOtherRunning,
      startAt: Date.now()
    };
    this.setMaxTimer(this.loaders[loaderId].tasks[taskId], loaderId);
    if (!this.loaders[loaderId].isBound) {
      return false;
    }
    return true;
  }

  /**
   * @docs-private
   */
  private readyToStop(loaderId: string, taskId: string): boolean {
    this.throwErrorIfLoaderNotExist(loaderId);
    const task: Task = this.loaders[loaderId].tasks[taskId];
    if (!task) {
      return false;
    }
    if (task.isDelayed) {
      this.clearTimers(task);
      delete this.loaders[loaderId].tasks[taskId];
      return false;
    }
    if (this.setMinTimer(task, loaderId)) {
      return false;
    }
    this.clearTimers(task);
    delete this.loaders[loaderId].tasks[taskId];
    return true;
  }

  /**
   * Set delay timer, if `delay` > 0
   * @docs-private
   * @returns boolean
   */
  private setDelayTimer(task: Task, loaderId: string): boolean {
    if (this.defaultConfig.delay > 0) {
      if (task.isDelayed) {
        return true;
      }
      if (!task.delayTimer) {
        task.isDelayed = true;
        task.delayTimer = setTimeout(() => {
          task.isDelayed = false;
          if (task.isForeground) {
            this.startLoader(loaderId, task.taskId);
          } else {
            this.startBackgroundLoader(loaderId, task.taskId);
          }
        }, this.defaultConfig.delay);
        return true;
      }
    }
    return false;
  }

  /**
   * Set maxTimer if `maxTime` > `minTime`
   * @docs-private
   * @returns boolean
   */
  private setMaxTimer(task: Task, loaderId: string): void {
    if (this.defaultConfig.maxTime > this.defaultConfig.minTime) {
      if (!task.maxTimer) {
        task.maxTimer = setTimeout(() => {
          if (task.isForeground) {
            this.stopLoader(loaderId, task.taskId);
          } else {
            this.stopBackgroundLoader(loaderId, task.taskId);
          }
        }, this.defaultConfig.maxTime);
      }
    }
  }

  /**
   * Set minTimer if `startAt` + `minTime` > `Date.now()`
   * @docs-private
   * @returns boolean
   */
  private setMinTimer(task: Task, loaderId: string): boolean {
    const now = Date.now();
    if (task.startAt) {
      if (task.startAt + this.defaultConfig.minTime > now) {
        task.minTimer = setTimeout(() => {
          if (task.isForeground) {
            this.stopLoader(loaderId, task.taskId);
          } else {
            this.stopBackgroundLoader(loaderId, task.taskId);
          }
        }, task.startAt + this.defaultConfig.minTime - now);
        return true;
      }
    }
    return false;
  }
}
