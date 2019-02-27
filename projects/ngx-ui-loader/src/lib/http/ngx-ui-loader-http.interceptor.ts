import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NGX_UI_LOADER_HTTP_CONFIG_TOKEN } from './ngx-ui-loader-http-config.token';
import { NgxUiLoaderHttpConfig } from './ngx-ui-loader-http-config';
import { HTTP_LOADER_ID } from './ngx-ui-loader-http.constants';

@Injectable()
export class NgxUiLoaderHttpInterceptor implements HttpInterceptor {

  private count: number;
  private defaultConfig: NgxUiLoaderHttpConfig;
  private exclude: string[];
  private excludeRegexp: RegExp[];

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

    if (config) {
      if (config.exclude) {
        this.exclude = config.exclude.map(url => url.toLowerCase());
      }
      if (config.excludeRegexp) {
        this.excludeRegexp = config.excludeRegexp.map(regexp => new RegExp(regexp, 'i'));
      }
      this.defaultConfig = { ...this.defaultConfig, ...config };
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isIgnored(req.url)) {
      return next.handle(req);
    }

    this.count++;
    if (this.defaultConfig.showForeground) {
      if (!this.ngxUiLoaderService.hasForeground(this.defaultConfig.loaderId, HTTP_LOADER_ID)) {
        this.ngxUiLoaderService.startLoader(this.defaultConfig.loaderId, HTTP_LOADER_ID);
      }
    } else {
      if (!this.ngxUiLoaderService.hasBackground(this.defaultConfig.loaderId, HTTP_LOADER_ID)) {
        this.ngxUiLoaderService.startBackgroundLoader(this.defaultConfig.loaderId, HTTP_LOADER_ID);
      }
    }

    return next.handle(req).pipe(finalize(() => {
      this.count--;
      if (this.count === 0) {
        if (this.defaultConfig.showForeground) {
          this.ngxUiLoaderService.stopLoader(this.defaultConfig.loaderId, HTTP_LOADER_ID);
        } else {
          this.ngxUiLoaderService.stopBackgroundLoader(this.defaultConfig.loaderId, HTTP_LOADER_ID);
        }
      }
    }));
  }

  private isIgnored(url: string): boolean {
    if (this.exclude) {
      // do not show the loader for api urls in the `exclude` list
      if (this.exclude.findIndex(str => url.toLowerCase().startsWith(str)) !== -1) {
        return true;
      }
    }

    if (this.excludeRegexp) {
      // do not show the loader for api urls which matches regexps in the `excludeRegexp` list
      if (this.excludeRegexp.findIndex(regexp => regexp.test(url)) !== -1) {
        return true;
      }
    }

    return false;
  }
}
