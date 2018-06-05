import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { DEFAULT_ID, DEFAULT_CONFIG } from './ngx-ui-loader.contants';
import { NGX_UI_LOADER_CONFIG_TOKEN } from './ngx-ui-loader-config.token';
import { NgxUiLoaderConfig } from './ngx-ui-loader-config';

const DELAY = 1100;

@Injectable()
export class NgxUiLoaderService {

  private _defaultConfig: NgxUiLoaderConfig;
  private _waitingForeground: {};
  private _waitingBackground: {};

  private _showForeground: BehaviorSubject<boolean>;
  private _showBackground: BehaviorSubject<boolean>;
  private _foregroundClosing: BehaviorSubject<boolean>;
  private _backgroundClosing: BehaviorSubject<boolean>;

  /**
   * For internal use
   * @docs-private
   */
  showForeground: Observable<boolean>;

  /**
   * For internal use
   * @docs-private
   */
  showBackground: Observable<boolean>;

  /**
   * For internal use
   * @docs-private
   */
  foregroundClosing: Observable<boolean>;

  /**
   * For internal use
   * @docs-private
   */
  backgroundClosing: Observable<boolean>;

  private _onStart: Subject<any>;
  private _onStop: Subject<any>;
  private _onStopAll: Subject<any>;

  /**
   * Emit when a loading is started
   */
  onStart: Observable<any>;

  /**
   * Emit when a loading is stopped
   */
  onStop: Observable<any>;

  /**
   * Emit when all loadings are stopped
   */
  onStopAll: Observable<any>;

  /**
   * Constructor
   * @param config
   */
  constructor(@Optional() @Inject(NGX_UI_LOADER_CONFIG_TOKEN) private config: NgxUiLoaderConfig) {

    this._defaultConfig = { ...DEFAULT_CONFIG };

    if (this.config) {
      if (this.config.threshold && this.config.threshold <= 0) {
        this.config.threshold = DEFAULT_CONFIG.threshold;
      }
      this._defaultConfig = { ...this._defaultConfig, ...this.config };
    }

    this._waitingForeground = {};
    this._waitingBackground = {};
    this._showForeground = new BehaviorSubject<boolean>(false);
    this.showForeground = this._showForeground.asObservable();
    this._showBackground = new BehaviorSubject<boolean>(false);
    this.showBackground = this._showBackground.asObservable();
    this._foregroundClosing = new BehaviorSubject<boolean>(false);
    this.foregroundClosing = this._foregroundClosing.asObservable();
    this._backgroundClosing = new BehaviorSubject<boolean>(false);
    this.backgroundClosing = this._backgroundClosing.asObservable();

    this._onStart = new Subject<any>();
    this.onStart = this._onStart.asObservable();
    this._onStop = new Subject<any>();
    this.onStop = this._onStop.asObservable();
    this._onStopAll = new Subject<any>();
    this.onStopAll = this._onStopAll.asObservable();
  }

  /**
   * Get default loader configuration
   * @returns default configuration object
   */
  getDefaultConfig(): NgxUiLoaderConfig {
    return { ...this._defaultConfig };
  }

  /**
   * Get current status
   * @returns An object with waiting foreground and background properties
   */
  getStatus() {
    return {
      waitingForeground: { ...this._waitingForeground },
      waitingBackground: { ...this._waitingBackground }
    };
  }

  /**
   * Determine whether the loader is active
   * @returns true if the loader is active
   */
  private isActive() {
    return Object.keys(this._waitingForeground).length > 0 || Object.keys(this._waitingBackground).length > 0;
  }

  /**
   * Check whether the queue has any waiting foreground loader
   * @returns true if at least one waiting foreground loader exists
   */
  hasForeground(id?: string) {
    if (id) {
      return this._waitingForeground[id] ? true : false;
    }
    return Object.keys(this._waitingForeground).length > 0;
  }

  /**
   * Check whether the queue has any waiting background loader
   * @returns true if at least one waiting background loader exists
   */
  hasBackground(id?: string) {
    if (id) {
      return this._waitingForeground[id] ? true : false;
    }
    return Object.keys(this._waitingBackground).length > 0;
  }

  /**
   * Start the foreground loading with a specified id.
   * The loading is only closed off when all IDs are called with stop() method.
   * @param id the optional id of the loading. id is set to 'default' by default.
   */
  start(id: string = DEFAULT_ID) {
    const foregroundRunning = this.hasForeground();

    this._waitingForeground[id] = Date.now();
    if (!foregroundRunning) {
      if (this.hasBackground()) {
        this.backgroundCloseout();
        this._showBackground.next(false);
      }
      this._showForeground.next(true);
    }
    this._onStart.next({ id: id, isForeground: true });
  }

  /**
   * Start the background loading with a specified id.
   * The loading is only closed off when all IDs are called with stopBackground() method.
   * @param id the optional id of the loading. id is set to 'default' by default.
   */
  startBackground(id: string = DEFAULT_ID) {
    this._waitingBackground[id] = Date.now();
    if (!this.hasForeground()) {
      this._showBackground.next(true);
    }
    this._onStart.next({ id: id, isForeground: false });
  }

  /**
   * Stop a foreground loading with specific id
   * @param id the optional id to stop. If not provided, 'default' is used.
   * @returns Object
   */
  stop(id: string = DEFAULT_ID) {
    const now = Date.now();

    if (this._waitingForeground[id]) {
      if (this._waitingForeground[id] + this._defaultConfig.threshold > now) {
        setTimeout(() => {
          this.stop(id);
        }, this._waitingForeground[id] + this._defaultConfig.threshold - Date.now());
        return;
      }
      delete this._waitingForeground[id];
    } else {
      return;
    }

    if (!this.isActive()) {
      this.foregroundCloseout();
      this._showForeground.next(false);
      this._onStop.next({ id: id, isForeground: true });
      this._onStopAll.next({ stopAll: true });
      return;
    }

    if (!this.hasForeground()) {
      this.foregroundCloseout();
      this._showForeground.next(false);
      // Show background spinner after the foreground is closed out
      setTimeout(() => {
        if (this.hasBackground()) {
          this._showBackground.next(true);
        }
      }, 500);
    }
    this._onStop.next({ id: id, isForeground: true });
  }

  /**
   * Stop a background loading with specific id
   * @param id the optional id to stop. If not provided, 'default' is used.
   * @returns Object
   */
  stopBackground(id: string = DEFAULT_ID) {
    const now = Date.now();

    if (this._waitingBackground[id]) {
      if (this._waitingBackground[id] + this._defaultConfig.threshold > now) {
        setTimeout(() => {
          this.stopBackground(id);
        }, this._waitingBackground[id] + this._defaultConfig.threshold - Date.now());
        return;
      }
      delete this._waitingBackground[id];
    } else {
      return;
    }

    if (!this.isActive()) {
      this.backgroundCloseout();
      this._showBackground.next(false);
      this._onStop.next({ id: id, isForeground: false });
      this._onStopAll.next({ stopAll: true });
      return;
    }

    this._onStop.next({ id: id, isForeground: false });
  }

  /**
   * Stop all the loadings including foreground and background
   */
  stopAll() {
    if (this.hasForeground()) {
      this.foregroundCloseout();
      this._showForeground.next(false);
    } else if (this.hasBackground()) {
      this.backgroundCloseout();
      this._showBackground.next(false);
    }
    this._waitingForeground = {};
    this._waitingBackground = {};
    this._onStopAll.next({ stopAll: true });
  }

  /**
   * Manage to close foreground loading
   */
  private foregroundCloseout() {
    this._foregroundClosing.next(true);
    setTimeout(() => {
      this._foregroundClosing.next(false);
    }, DELAY);
  }

  /**
   * Manage to close background loading
   */
  private backgroundCloseout() {
    this._backgroundClosing.next(true);
    setTimeout(() => {
      this._backgroundClosing.next(false);
    }, DELAY);
  }
}
