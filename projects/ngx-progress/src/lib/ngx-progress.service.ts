import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { INTERVAL, DEFAULT_ID, DEFAULT_CONFIG } from './ngx-progress.contants';
import { NGX_PROGRESS_CONFIG_TOKEN } from './ngx-progress-config.token';
import { NgxProgressConfig } from './ngx-progress-config';

@Injectable()
export class NgxProgressService {

  private defaultConfig: NgxProgressConfig;
  private foregroundQueue: any;
  private backgroundQueue: any;
  private fgTimeoutHandler: any;
  private bgTimeoutHandler: any;

  private _showForeground: BehaviorSubject<boolean>;
  private _showBackground: BehaviorSubject<boolean>;
  private _foregroundClosing: BehaviorSubject<boolean>;
  private _backgroundClosing: BehaviorSubject<boolean>;

  showForeground: Observable<boolean>;
  showBackground: Observable<boolean>;
  foregroundClosing: Observable<boolean>;
  backgroundClosing: Observable<boolean>;

  constructor(@Optional() @Inject(NGX_PROGRESS_CONFIG_TOKEN) private progressConfig: NgxProgressConfig) {
    this.defaultConfig = Object.assign({}, DEFAULT_CONFIG);

    if (this.progressConfig) {
      this.defaultConfig = { ...this.defaultConfig, ...this.progressConfig };
    }

    this.foregroundQueue = {};
    this.backgroundQueue = {};
    this._showForeground = new BehaviorSubject<boolean>(false);
    this.showForeground = this._showForeground.asObservable();
    this._showBackground = new BehaviorSubject<boolean>(false);
    this.showBackground = this._showBackground.asObservable();
    this._foregroundClosing = new BehaviorSubject<boolean>(false);
    this.foregroundClosing = this._foregroundClosing.asObservable();
    this._backgroundClosing = new BehaviorSubject<boolean>(false);
    this.backgroundClosing = this._backgroundClosing.asObservable();
  }

  getDefaultConfig(): NgxProgressConfig {
    return this.defaultConfig;
  }

  isActive() {
    return Object.keys(this.foregroundQueue).length > 0 || Object.keys(this.backgroundQueue).length > 0;
  }

  isForeground() {
    return Object.keys(this.foregroundQueue).length > 0;
  }

  isBackground() {
    return Object.keys(this.backgroundQueue).length > 0;
  }

  start(id?: string, foreground?: boolean) {
    id = id ? id : DEFAULT_ID;
    foreground = typeof foreground === 'boolean' ? foreground : true;

    let wasBackground = false;

    if (foreground) {
      wasBackground = this.isBackground();
      this.foregroundQueue[id] = true;
    } else {
      this.backgroundQueue[id] = true;
    }

    const isForeground = this.isForeground();

    if (isForeground) {
      this._showForeground.next(true);
    } else {
      this._showBackground.next(true);
    }

    if (wasBackground) {
      this.backgroundCloseout();
    }

    if (isForeground) {
      this._showBackground.next(false);
    } else {
      this._showForeground.next(false);
    }
  }

  startBackground(id?: string) {
    return this.start(id, false);
  }

  stop(id?: string) {
    id = id ? id : DEFAULT_ID;

    const wasForeground = this.foregroundQueue[id];

    if (wasForeground) {
      delete this.foregroundQueue[id];
    } else if (this.backgroundQueue[id]) {
      delete this.backgroundQueue[id];
    } else {
      return;
    }

    if (!this.isActive()) {
      this._showForeground.next(false);
      this._showBackground.next(false);
      if (wasForeground) {
        this.foregroundCloseout();
      } else {
        this.backgroundCloseout();
      }
    } else if (!this.isForeground()) {
      this._showBackground.next(true);
      this._showForeground.next(false);
      this.foregroundCloseout();
    }
  }

  private foregroundCloseout() {
    this._foregroundClosing.next(true);
    this.fgTimeoutHandler = setTimeout(() => {
      this._foregroundClosing.next(false);
    }, INTERVAL);
  }

  private backgroundCloseout() {
    this._backgroundClosing.next(true);
    this.bgTimeoutHandler = setTimeout(() => {
      this._backgroundClosing.next(false);
    }, INTERVAL);
  }

  clearAll() {
    this.foregroundQueue = {};
    this.backgroundQueue = {};
    this._showForeground.next(false);
    this._showBackground.next(false);
    this._foregroundClosing.next(false);
    this._backgroundClosing.next(false);
    clearTimeout(this.fgTimeoutHandler);
    clearTimeout(this.bgTimeoutHandler);
  }
}
