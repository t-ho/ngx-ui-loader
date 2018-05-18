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
   * @return default configuration object
   */
  getDefaultConfig(): NgxUiLoaderConfig {
    return this.helperService.getDefaultConfig();
  }

  /**
   * Get ngx-ui-loader status
   * @return a object with waiting foreground and background properties
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
    this._stop(id, true);
  }

  /**
   * Stop a background loading with specific id.
   * @param id The optional id to stop. If not provided, 'default' is used.
   */
  stopBackground(id?: string) {
    this._stop(id, false);
  }

  /**
   * Stop all foreground and background loadings
   */
  stopAll() {
    this.helperService.stopAll();
    this._onStopAll.next({ stopAll: true });
  }

  /**
   * Helper
   * @param id
   * @param foreground
   */
  private _start(id?: string, foreground?: boolean) {
    const result = this.helperService.start(id, foreground);
    this._onStart.next(result);
  }

  /**
   * Helper
   * @param id
   * @param foreground
   */
  private _stop(id?: string, foreground?: boolean) {
    const result: any = this.helperService.stop(id, foreground);
    if (result.isSuccess) {
      this._onStop.next({ id: result.id, isForeground: result.isForeground });
      if (result.stopAll) {
        this._onStopAll.next({ stopAll: true });
      }
    }
  }

}
