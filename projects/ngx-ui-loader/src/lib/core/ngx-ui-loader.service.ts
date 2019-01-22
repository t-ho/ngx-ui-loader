import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { CLOSING_TIME, DEFAULT_TASK_ID, DEFAULT_CONFIG, WAITING_FOR_OVERLAY_DISAPPEAR } from './ngx-ui-loader.contants';
import { NGX_UI_LOADER_CONFIG_TOKEN } from './ngx-ui-loader-config.token';
import { NgxUiLoaderConfig } from './ngx-ui-loader-config';
import { Loaders, Loader, ShowEvent, StartStopEvent, StopAllEvent, Task } from './ngx-ui-loader.interfaces';

@Injectable({
  providedIn: 'root'
})
export class NgxUiLoaderService {

  // Public properties

  /**
   * For internal use only. It may be changed in the future.
   * @docs-private
   */
  backgroundClosing$: Observable<ShowEvent>;

  /**
   * For internal use only. It may be changed in the future.
   * @docs-private
   */
  foregroundClosing$: Observable<ShowEvent>;

  /**
   * For internal use only. It may be changed in the future.
   * @docs-private
   */
  onStart$: Observable<StartStopEvent>;

  /**
   * For internal use only. It may be changed in the future.
   * @docs-private
   */
  onStop$: Observable<StartStopEvent>;

  /**
   * For internal use only. It may be changed in the future.
   * @docs-private
   */
  onStopAll$: Observable<StopAllEvent>;

  /**
   * For internal use only. It may be changed in the future.
   * @docs-private
   */
  showBackground$: Observable<ShowEvent>;

  /**
   * For internal use only. It may be changed in the future.
   * @docs-private
   */
  showForeground$: Observable<ShowEvent>;

  // Private properties
  private bgClosing: BehaviorSubject<ShowEvent>;
  private defaultConfig: NgxUiLoaderConfig;
  private fgClosing: BehaviorSubject<ShowEvent>;
  private loaders: Loaders;
  private onStart: Subject<StartStopEvent>;
  private onStop: Subject<StartStopEvent>;
  private onStopAll: Subject<StopAllEvent>;
  private showBackground: BehaviorSubject<ShowEvent>;
  private showForeground: BehaviorSubject<ShowEvent>;

  /**
   * Constructor
   * @param config
   */
  constructor(@Optional() @Inject(NGX_UI_LOADER_CONFIG_TOKEN) private config: NgxUiLoaderConfig) {

    this.defaultConfig = { ...DEFAULT_CONFIG };

    if (this.config) {
      if (this.config.threshold && this.config.threshold <= 0) {
        this.config.threshold = DEFAULT_CONFIG.threshold;
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

    this.onStart = new Subject<StartStopEvent>();
    this.onStart$ = this.onStart.asObservable();
    this.onStop = new Subject<StartStopEvent>();
    this.onStop$ = this.onStop.asObservable();
    this.onStopAll = new Subject<StopAllEvent>();
    this.onStopAll$ = this.onStopAll.asObservable();
  }

  /**
   * For internal use only. It may be changed in the future.
   * @docs-private
   */
  initLoaderData(loaderId: string): void {
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
    } else {
      this.createLoaderData(loaderId, isMaster, true);
    }
  }

  /**
   * For internal use only. It may be changed in the future.
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
        background: { ...this.loaders[loaderId].background },
        foreground: { ...this.loaders[loaderId].foreground },
        isMaster: false,
        isBound: this.loaders[loaderId].isBound
      };
      delete this.loaders[loaderId];
    }
  }

  /**
   * For internal use only. It may be changed in the future.
   * @docs-private
   */
  destroyLoaderData(loaderId: string): void {
    this.stopLoaderAll(loaderId);
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
   * @deprecated use getLoader() or getLoaders() instead. This will be removed in the version 8.x.x
   * Return status of master loader
   */
  getStatus(): { waitingBackground: Task, waitingForeground: Task } {
    this.throwErrorIfMasterLoaderNotExist();
    return {
      waitingBackground: this.loaders[this.defaultConfig.masterLoaderId].background,
      waitingForeground: this.loaders[this.defaultConfig.masterLoaderId].foreground
    };
  }

  /**
   * Check whether the queue has a waiting foreground loader with the given `taskId`.
   * If no `taskId` specified, it will check whether the queue has any waiting foreground loader.
   * @param loaderId the loader Id
   * @param taskId the optional task Id
   * @returns boolean
   */
  hasForeground(loaderId: string, taskId?: string): boolean {
    if (this.loaders[loaderId]) {
      if (taskId) {
        return this.loaders[loaderId].foreground[taskId] ? true : false;
      }
      return Object.keys(this.loaders[loaderId].foreground).length > 0;
    }
    return false;
  }

  /**
   * Check whether the queue has a waiting background loader with the given `taskId`.
   * If no `taskId` specified, it will check whether the queue has any waiting background loader.
   * @param loaderId the loader Id
   * @param taskId the optional task Id
   * @returns boolean
   */
  hasBackground(loaderId: string, taskId?: string): boolean {
    if (this.loaders[loaderId]) {
      if (taskId) {
        return this.loaders[loaderId].background[taskId] ? true : false;
      }
      return Object.keys(this.loaders[loaderId].background).length > 0;
    }
    return false;
  }

  /**
   * Start the foreground loading of loader having `loaderId` with a specified `taskId`.
   * The loading is only closed off when all taskIds of that loader are called with stopLoader() method.
   * @param loaderId the loader Id
   * @param taskId the optional task Id of the loading. taskId is set to 'default' by default.
   */
  startLoader(loaderId: string, taskId: string = DEFAULT_TASK_ID): void {
    this.createLoaderData(loaderId, undefined, false);

    const foregroundRunning = this.hasForeground(loaderId);

    this.loaders[loaderId].foreground[taskId] = Date.now();
    if (!foregroundRunning) {
      if (this.hasBackground(loaderId)) {
        this.backgroundCloseout(loaderId);
        this.showBackground.next({ loaderId, isShow: false });
      }
      this.showForeground.next({ loaderId, isShow: true });
    }
    this.onStart.next({ loaderId, taskId, isForeground: true });
  }

  /**
   * Start the foreground loading of master loader with a specified `taskId`.
   * The loading is only closed off when all taskIds of that loader are called with stop() method.
   * NOTE: Really this function just wraps startLoader() function
   * @param taskId the optional task Id of the loading. taskId is set to 'default' by default.
   */
  start(taskId: string = DEFAULT_TASK_ID): void {
    this.startLoader(this.defaultConfig.masterLoaderId, taskId);
  }

  /**
   * Start the background loading of loader having `loaderId` with a specified `taskId`.
   * The loading is only closed off when all taskIds of that loader are called with stopLoaderBackground() method.
   * @param loaderId the loader Id
   * @param taskId the optional task Id of the loading. taskId is set to 'default' by default.
   */
  startBackgroundLoader(loaderId: string, taskId: string = DEFAULT_TASK_ID): void {
    this.createLoaderData(loaderId, undefined, false);

    this.loaders[loaderId].background[taskId] = Date.now();
    if (!this.hasForeground(loaderId)) {
      this.showBackground.next({ loaderId, isShow: true });
    }
    this.onStart.next({ loaderId, taskId, isForeground: false });
  }

  /**
   * Start the background loading of master loader with a specified `taskId`.
   * The loading is only closed off when all taskIds of that loader are called with stopBackground() method.
   * NOTE: Really this function just wraps startBackgroundLoader() function
   * @param taskId the optional task Id of the loading. taskId is set to 'default' by default.
   */
  startBackground(taskId: string = DEFAULT_TASK_ID): void {
    this.startBackgroundLoader(this.defaultConfig.masterLoaderId, taskId);
  }

  /**
   * Stop a foreground loading of loader having `loaderId` with specific `taskId`
   * @param loaderId the loader Id
   * @param taskId the optional task Id to stop. If not provided, 'default' is used.
   * @returns Object
   */
  stopLoader(loaderId: string, taskId: string = DEFAULT_TASK_ID): void {
    this.throwErrorIfLoaderNotExist(loaderId);

    const now = Date.now();

    if (this.hasForeground(loaderId, taskId)) {
      if (this.loaders[loaderId].foreground[taskId] + this.defaultConfig.threshold > now) {
        setTimeout(() => {
          this.stopLoader(loaderId, taskId);
        }, this.loaders[loaderId].foreground[taskId] + this.defaultConfig.threshold - now);
        return;
      }
      delete this.loaders[loaderId].foreground[taskId];
    } else {
      return;
    }

    if (!this.isActive(loaderId)) {
      this.foregroundCloseout(loaderId);
      this.showForeground.next({ loaderId, isShow: false });
      this.onStop.next({ loaderId, taskId, isForeground: true });
      this.onStopAll.next({ loaderId, isStopAll: true });
      return;
    }

    if (!this.hasForeground(loaderId)) {
      // We can imply that this.hasBackground(loaderId) == true
      this.foregroundCloseout(loaderId);
      this.showForeground.next({ loaderId, isShow: false });
      // Show background spinner after the foreground is closed out
      setTimeout(() => {
        this.showBackground.next({ loaderId, isShow: true });
      }, WAITING_FOR_OVERLAY_DISAPPEAR);
    }
    this.onStop.next({ loaderId, taskId, isForeground: true });
  }

  /**
   * Stop a foreground loading of master loader with specific `taskId`
   * @param taskId the optional task Id to stop. If not provided, 'default' is used.
   * @returns Object
   */
  stop(taskId: string = DEFAULT_TASK_ID): void {
    this.throwErrorIfMasterLoaderNotExist();
    this.stopLoader(this.defaultConfig.masterLoaderId, taskId);
  }

  /**
   * Stop a background loading of loader having `loaderId` with specific `taskId`
   * @param loaderId the loader Id
   * @param taskId the optional task Id to stop. If not provided, 'default' is used.
   * @returns Object
   */
  stopBackgroundLoader(loaderId: string, taskId: string = DEFAULT_TASK_ID): void {
    this.throwErrorIfLoaderNotExist(loaderId);

    const now = Date.now();

    if (this.hasBackground(loaderId, taskId)) {
      if (this.loaders[loaderId].background[taskId] + this.defaultConfig.threshold > now) {
        setTimeout(() => {
          this.stopBackgroundLoader(loaderId, taskId);
        }, this.loaders[loaderId].background[taskId] + this.defaultConfig.threshold - now);
        return;
      }
      delete this.loaders[loaderId].background[taskId];
    } else {
      return;
    }

    if (!this.isActive(loaderId)) {
      this.backgroundCloseout(loaderId);
      this.showBackground.next({ loaderId, isShow: false });
      this.onStop.next({ loaderId, taskId, isForeground: false });
      this.onStopAll.next({ loaderId, isStopAll: true });
      return;
    }

    this.onStop.next({ loaderId, taskId, isForeground: false });
  }

  /**
   * Stop a background loading of master loader with specific taskId
   * @param taskId the optional task Id to stop. If not provided, 'default' is used.
   * @returns Object
   */
  stopBackground(taskId: string = DEFAULT_TASK_ID): void {
    this.throwErrorIfMasterLoaderNotExist();
    this.stopBackgroundLoader(this.defaultConfig.masterLoaderId, taskId);
  }

  /**
   * Stop all the background and foreground loadings of loader having `loaderId`
   * @param loaderId the loader Id
   */
  stopLoaderAll(loaderId: string): void {
    this.throwErrorIfLoaderNotExist(loaderId);

    if (this.hasForeground(loaderId)) {
      this.foregroundCloseout(loaderId);
      this.showForeground.next({ loaderId, isShow: false });
    } else if (this.hasBackground(loaderId)) {
      this.backgroundCloseout(loaderId);
      this.showBackground.next({ loaderId, isShow: false });
    }
    this.loaders[loaderId].foreground = {};
    this.loaders[loaderId].background = {};
    this.onStopAll.next({ loaderId, isStopAll: true });
  }

  /**
   * Stop all the background and foreground loadings of master loader
   */
  stopAll(): void {
    this.throwErrorIfMasterLoaderNotExist();
    this.stopLoaderAll(this.defaultConfig.masterLoaderId);
  }

  /**
   * Create loader data if it does not exist
   * @param loaderId
   * @param isMaster
   * @param isBound
   * @docs-private
   */
  private createLoaderData(loaderId: string, isMaster: boolean, isBound: boolean) {
    if (!this.loaders[loaderId]) {
      this.loaders[loaderId] = {
        loaderId,
        foreground: {},
        background: {},
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
      throw new Error(`[ngx-ui-loader] - loaderId "${loaderId}" is duplicated. Please choose another one!`);
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
   * Determine whether the loader is active
   * @returns true if the loader is active
   */
  private isActive(loaderId: string): boolean {
    return this.hasForeground(loaderId) || this.hasBackground(loaderId);
  }

  /**
   * Manage to close foreground loading
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
   * @param loaderId the loader id
   */
  private backgroundCloseout(loaderId: string): void {
    this.bgClosing.next({ loaderId, isShow: true });
    setTimeout(() => {
      this.bgClosing.next({ loaderId, isShow: false });
    }, CLOSING_TIME);
  }
}
