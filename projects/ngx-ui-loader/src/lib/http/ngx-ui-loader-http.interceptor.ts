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

  constructor(@Inject(NGX_UI_LOADER_HTTP_CONFIG_TOKEN) @Optional() config: NgxUiLoaderHttpConfig,
    private ngxUiLoaderService: NgxUiLoaderService) {

    this.count = 0;
    this.defaultConfig = {
      showForeground: false
    };

    if (config) {
      Object.assign(this.defaultConfig, config);
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.count++;
    if (this.defaultConfig.showForeground) {
      if (!this.ngxUiLoaderService.hasForeground(HTTP_LOADER_ID)) {
        this.ngxUiLoaderService.start(HTTP_LOADER_ID);
      }
    } else {
      if (!this.ngxUiLoaderService.hasBackground(HTTP_LOADER_ID)) {
        this.ngxUiLoaderService.startBackground(HTTP_LOADER_ID);
      }
    }

    return next.handle(req).pipe(finalize(() => {
      this.count--;
      if (this.count === 0) {
        if (this.defaultConfig.showForeground) {
          this.ngxUiLoaderService.stop(HTTP_LOADER_ID);
        } else {
          this.ngxUiLoaderService.stopBackground(HTTP_LOADER_ID);
        }
      }
    }));
  }
}
