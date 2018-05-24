import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { NgxUiLoaderHelperService } from './ngx-ui-loader-helper.service';
import { NgxUiLoaderConfig } from './ngx-ui-loader-config';

@Injectable()
export class NgxUiLoaderService {

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
   * @param helperService
   */
  constructor(private helperService: NgxUiLoaderHelperService) {
    this._onStart = new Subject<any>();
    this.onStart = this._onStart.asObservable();
    this._onStop = new Subject<any>();
    this.onStop = this._onStop.asObservable();
    this._onStopAll = new Subject<any>();
    this.onStopAll = this._onStopAll.asObservable();
  }

  /**
   * Get default configuration of the ngx-ui-loader
   * @returns default configuration object
   */
  getDefaultConfig(): NgxUiLoaderConfig {
    return this.helperService.getDefaultConfig();
  }

  /**
   * Get ngx-ui-loader status
   * @returns a object with waiting foreground and background properties
   */
  getStatus(): any {
    return this.helperService.getStatus();
  }

  /**
   * Start a foreground loading with specific id
   * @param id The optional id to start. The default value is 'default' if not provided.
   */
  start(id?: string) {
    this._start(id, true);
  }

  /**
   * Start a background loading with specific id
   * @param id The optional id to start. The default value is 'default' if not provided.
   */
  startBackground(id?: string) {
    this._start(id, false);
  }

  /**
   * Stop a foreground loading with specific id.
   * @param id The optional id to stop. If not provided, 'default' is used.
   */
  stop(id?: string) {
    this._stopHelper(this.helperService.stop(id));
  }

  /**
   * Stop a background loading with specific id.
   * @param id The optional id to stop. If not provided, 'default' is used.
   */
  stopBackground(id?: string) {
    this._stopHelper(this.helperService.stopBackground(id));
  }

  /**
   * Stop all foreground and background loadings
   */
  stopAll() {
    this.helperService.stopAll();
    this._onStopAll.next({ stopAll: true });
  }

  /**
   * Check whether the foreground ID exists or not
   * @param id foreground ID
   */
  hasForeground(id: string) {
    return this.helperService.hasForeground(id);
  }

  /**
   * Check whether the background ID exists or not
   * @param id background ID
   */
  hasBackground(id: string) {
    return this.helperService.hasBackground(id);
  }

  /**
   * Helper
   * @param id
   * @param foreground
   */
  private _start(id?: string, foreground?: boolean) {
    this._onStart.next(this.helperService.start(id, foreground));
  }

  /**
   * Stop Helper
   * @param result object is returned from the stop() or stopBackground() function of NgxUiLoderHelperService
   */
  private _stopHelper(result: any) {
    if (result.isSuccess) {
      this._onStop.next({ id: result.id, isForeground: result.isForeground });
      if (result.stopAll) {
        this._onStopAll.next({ stopAll: true });
      }
    }
  }

}
