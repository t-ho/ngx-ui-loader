import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NGX_UI_LOADER_HTTP_CONFIG_TOKEN } from './ngx-ui-loader-http-config.token';
import { NgxUiLoaderHttpConfig } from './ngx-ui-loader-http-config';
import { HTTP_LOADER_TASK_ID } from '../utils/constants';
import { getExclude, isIgnored } from '../utils/functions';
import { Exclude } from '../utils/interfaces';

@Injectable()
export class NgxUiLoaderHttpInterceptor implements HttpInterceptor {

  private count: number;
  private defaultConfig: NgxUiLoaderHttpConfig;
  private exclude: Exclude;

  /**
   * Constructor
   * @param config
   * @param ngxUiLoaderService
   */
  constructor(@Optional() @Inject(NGX_UI_LOADER_HTTP_CONFIG_TOKEN) config: NgxUiLoaderHttpConfig,
    private ngxUiLoaderService: NgxUiLoaderService) {

    this.count = 0;
    this.defaultConfig = {
      loaderId: this.ngxUiLoaderService.getDefaultConfig().masterLoaderId,
      showForeground: false
    };

    this.exclude = getExclude(config);

    if (config) {
      this.defaultConfig = { ...this.defaultConfig, ...config };
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isIgnored(req.url, this.exclude.strs, this.exclude.regExps)) {
      return next.handle(req);
    }

    this.count++;
    if (this.defaultConfig.showForeground) {
      if (!this.ngxUiLoaderService.hasForeground(this.defaultConfig.loaderId, HTTP_LOADER_TASK_ID)) {
        this.ngxUiLoaderService.startLoader(this.defaultConfig.loaderId, HTTP_LOADER_TASK_ID);
      }
    } else {
      if (!this.ngxUiLoaderService.hasBackground(this.defaultConfig.loaderId, HTTP_LOADER_TASK_ID)) {
        this.ngxUiLoaderService.startBackgroundLoader(this.defaultConfig.loaderId, HTTP_LOADER_TASK_ID);
      }
    }

    return next.handle(req).pipe(finalize(() => {
      this.count--;
      if (this.count === 0) {
        if (this.defaultConfig.showForeground) {
          this.ngxUiLoaderService.stopLoader(this.defaultConfig.loaderId, HTTP_LOADER_TASK_ID);
        } else {
          this.ngxUiLoaderService.stopBackgroundLoader(this.defaultConfig.loaderId, HTTP_LOADER_TASK_ID);
        }
      }
    }));
  }

}
