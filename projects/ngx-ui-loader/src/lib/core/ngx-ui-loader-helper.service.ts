import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { INTERVAL, DEFAULT_ID, DEFAULT_CONFIG, SPINNER_TYPES, NGX_POSITIONS, PB_DIRECTIONS } from './ngx-ui-loader.contants';
import { NGX_UI_LOADER_CONFIG_TOKEN } from './ngx-ui-loader-config.token';
import { NgxUiLoaderConfig } from './ngx-ui-loader-config';

@Injectable()
export class NgxUiLoaderHelperService {

  private defaultConfig: NgxUiLoaderConfig;
  private waitingForeground: any;
  private waitingBackground: any;
  private fgTimeoutHandler: any;
  private bgTimeoutHandler: any;
  private validSpinnerTypes: string[];
  private validPositions: string[];
  private validDirections: string[];

  private _showForeground: BehaviorSubject<boolean>;
  private _showBackground: BehaviorSubject<boolean>;
  private _foregroundClosing: BehaviorSubject<boolean>;
  private _backgroundClosing: BehaviorSubject<boolean>;

  showForeground: Observable<boolean>;
  showBackground: Observable<boolean>;
  foregroundClosing: Observable<boolean>;
  backgroundClosing: Observable<boolean>;

  /**
   * Constructor
   * @param config
   */
  constructor(@Optional() @Inject(NGX_UI_LOADER_CONFIG_TOKEN) private config: NgxUiLoaderConfig) {

    this.validSpinnerTypes = Object.keys(SPINNER_TYPES).map(key => SPINNER_TYPES[key]);
    this.validPositions = Object.keys(NGX_POSITIONS).map(key => NGX_POSITIONS[key]);
    this.validDirections = Object.keys(PB_DIRECTIONS).map(key => PB_DIRECTIONS[key]);

    this.defaultConfig = Object.assign({}, DEFAULT_CONFIG);

    if (this.config) {
      if (this.config.fgsType) {
        this.config.fgsType = this.validateSpinnerType('fgsType', this.config.fgsType, DEFAULT_CONFIG.fgsType);
      }
      if (this.config.bgsType) {
        this.config.bgsType = this.validateSpinnerType('bgsType', this.config.bgsType, DEFAULT_CONFIG.bgsType);
      }
      if (this.config.pbDirection) {
        this.config.pbDirection = this.validateDirection('pbDirection',
          this.config.pbDirection, DEFAULT_CONFIG.pbDirection);
      }
      if (this.config.fgsPosition) {
        this.config.fgsPosition = this.validatePosition('fgsPosition', this.config.fgsPosition, DEFAULT_CONFIG.fgsPosition);
      }
      if (this.config.bgsPosition) {
        this.config.bgsPosition = this.validatePosition('bgsPosition', this.config.bgsPosition, DEFAULT_CONFIG.bgsPosition);
      }
      if (this.config.logoPosition) {
        this.config.logoPosition = this.validatePosition('logoPosition', this.config.logoPosition, DEFAULT_CONFIG.logoPosition);
      }
      if (this.config.textPosition) {
        this.config.textPosition = this.validatePosition('textPosition', this.config.textPosition, DEFAULT_CONFIG.textPosition);
      }
      if (this.config.threshold && this.config.threshold <= 0) {
        this.config.threshold = DEFAULT_CONFIG.threshold;
      }
      this.defaultConfig = { ...this.defaultConfig, ...this.config };
    }

    this.waitingForeground = {};
    this.waitingBackground = {};
    this._showForeground = new BehaviorSubject<boolean>(false);
    this.showForeground = this._showForeground.asObservable();
    this._showBackground = new BehaviorSubject<boolean>(false);
    this.showBackground = this._showBackground.asObservable();
    this._foregroundClosing = new BehaviorSubject<boolean>(false);
    this.foregroundClosing = this._foregroundClosing.asObservable();
    this._backgroundClosing = new BehaviorSubject<boolean>(false);
    this.backgroundClosing = this._backgroundClosing.asObservable();
  }

  /**
   * Get default loader configuration
   * @returns default configuration object
   */
  getDefaultConfig(): NgxUiLoaderConfig {
    return Object.assign({}, this.defaultConfig);
  }

  /**
   * Get current status
   * @returns An object with waiting foreground and background properties
   */
  getStatus() {
    return {
      waitingForeground: this.waitingForeground,
      waitingBackground: this.waitingBackground
    };
  }

  /**
   * Determine whether the loader is active
   * @returns true if the loader is active
   */
  private isActive() {
    return Object.keys(this.waitingForeground).length > 0 || Object.keys(this.waitingBackground).length > 0;
  }

  /**
   * Check whether the queue has any waiting foreground loader
   * @returns true if at least one waiting foreground loader exists
   */
  hasForeground(id?: string) {
    if (id) {
      return this.waitingForeground[id] ? true : false;
    }
    return Object.keys(this.waitingForeground).length > 0;
  }

  /**
   * Check whether the queue has any waiting background loader
   * @returns true if at least one waiting background loader exists
   */
  hasBackground(id?: string) {
    if (id) {
      return this.waitingForeground[id] ? true : false;
    }
    return Object.keys(this.waitingBackground).length > 0;
  }

  /**
   * Start the loading with a specified id.
   * The loading is only closed off when all IDs are called with stop() method.
   * @param id the optional id of the loading. id is set to 'default' by default.
   * @param foreground is optional. If true, start foreground loading. Otherwise, start background loading.
   */
  start(id?: string, foreground?: boolean): Object {
    id = id ? id : DEFAULT_ID;
    foreground = typeof foreground === 'boolean' ? foreground : true;

    const foregroundRunning = this.hasForeground();

    if (foreground) {
      this.waitingForeground[id] = Date.now();
      if (!foregroundRunning) {
        const backgroundRunning = this.hasBackground();
        if (backgroundRunning) {
          this.backgroundCloseout();
          this._showBackground.next(false);
        }
        this._showForeground.next(true);
      }
    } else { // foreground == false
      this.waitingBackground[id] = Date.now();
      if (!foregroundRunning) {
        this._showBackground.next(true);
      }
    }
    return { id: id, isForeground: foreground };
  }

  /**
   * Stop a foreground loading with specific id
   * @param id the optional id to stop. If not provided, 'default' is used.
   * @returns Object
   */
  stop(id?: string): Object {
    const now = Date.now();
    id = id ? id : DEFAULT_ID;

    if (this.waitingForeground[id]) {
      if (this.waitingForeground[id] + this.defaultConfig.threshold > now) {
        setTimeout(() => {
          this.stop(id);
        }, this.waitingForeground[id] + this.defaultConfig.threshold - Date.now());
        return { id: id, isForeground: true, isSuccess: false, stopAll: false };
      }
      delete this.waitingForeground[id];
    } else {
      return { id: id, isForeground: true, isSuccess: false, stopAll: false };
    }

    if (!this.isActive()) {
      this.foregroundCloseout();
      this._showForeground.next(false);
      return { id: id, isForeground: true, isSuccess: true, stopAll: true };
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
    return { id: id, isForeground: true, isSuccess: true, stopAll: false };
  }

  /**
   * Stop a background loading with specific id
   * @param id the optional id to stop. If not provided, 'default' is used.
   * @returns Object
   */
  stopBackground(id?: string): Object {
    const now = Date.now();
    id = id ? id : DEFAULT_ID;

    if (this.waitingBackground[id]) {
      if (this.waitingBackground[id] + this.defaultConfig.threshold > now) {
        setTimeout(() => {
          this.stopBackground(id);
        }, this.waitingBackground[id] + this.defaultConfig.threshold - Date.now());
        return { id: id, isForeground: false, isSuccess: false, stopAll: false };
      }
      delete this.waitingBackground[id];
    } else {
      return { id: id, isForeground: false, isSuccess: false, stopAll: false };
    }

    if (!this.isActive()) {
      this.backgroundCloseout();
      this._showBackground.next(false);
      return { id: id, isForeground: false, isSuccess: true, stopAll: true };
    }

    return { id: id, isForeground: false, isSuccess: true, stopAll: false };
  }

  /**
   * Validate spinner type. Print out error if it is invalid
   * @param inputName The name of the input property
   * @param value The spinner type to verify
   * @param defaultValue The default spinner type
   * @returns a valid spinner type
   */
  validateSpinnerType(inputName: string, value: string, defaultValue: string) {
    return this.validate(this.validSpinnerTypes, inputName, value, defaultValue);
  }

  /**
   * Validate position type. Print out error if it is invalid
   * @param inputName The name of the input property
   * @param value The position value to verify
   * @param defaultValue the default position
   * @returns a valid position
   */
  validatePosition(inputName: string, value: string, defaultValue: string) {
    return this.validate(this.validPositions, inputName, value, defaultValue);
  }

  /**
   * Validate the progress bar direction. Print out error if it is invalid
   * @param inputName the name of the input property
   * @param value the direction to verify
   * @param defaultValue the default direction
   * @returns a valid direction
   */
  validateDirection(inputName: string, value: string, defaultValue: string) {
    return this.validate(this.validDirections, inputName, value, defaultValue);
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
    this.waitingForeground = {};
    this.waitingBackground = {};
  }

  /**
   * Generic validation. Print out error if the provided value is invalid
   * @param validValues An array of valid values
   * @param inputName The name of the input property
   * @param value The value to verify
   * @param defaultValue The default value
   */
  private validate(validValues: string[], inputName: string, value: string, defaultValue: string): string {
    if (validValues.findIndex(ele => ele === value) === -1) {
      console.error(`[ngx-ui-loader] - ${inputName} ("${value}") is invalid. `
        + `Default value "${defaultValue}" is used.`);
      return defaultValue;
    }
    return value;
  }

  /**
   * Manage to close foreground loading
   */
  private foregroundCloseout() {
    this._foregroundClosing.next(true);
    this.fgTimeoutHandler = setTimeout(() => {
      this._foregroundClosing.next(false);
    }, INTERVAL);
  }

  /**
   * Manage to close background loading
   */
  private backgroundCloseout() {
    this._backgroundClosing.next(true);
    this.bgTimeoutHandler = setTimeout(() => {
      this._backgroundClosing.next(false);
    }, INTERVAL);
  }

}
