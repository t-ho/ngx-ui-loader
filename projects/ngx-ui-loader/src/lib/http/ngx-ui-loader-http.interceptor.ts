import { Injectable, Inject, Optional } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NGX_UI_LOADER_HTTP_CONFIG_TOKEN } from './ngx-ui-loader-http-config.token';
import { NgxUiLoaderHttpConfig } from '../utils/interfaces';
import { HTTP_LOADER_TASK_ID } from '../utils/constants';
import { getExcludeObj, isIgnored } from '../utils/functions';
import { Exclude } from '../utils/interfaces';

@Injectable()
export class NgxUiLoaderHttpInterceptor implements HttpInterceptor {
  private count: number;
  private config: NgxUiLoaderHttpConfig;
  private exclude: Exclude;

  /**
   * Constructor
   */
  constructor(
    @Optional()
    @Inject(NGX_UI_LOADER_HTTP_CONFIG_TOKEN)
    customConfig: NgxUiLoaderHttpConfig,
    private loader: NgxUiLoaderService,
  ) {
    this.count = 0;
    this.config = {
      loaderId: this.loader.getDefaultConfig().masterLoaderId,
      showForeground: false,
    };

    this.exclude = getExcludeObj(customConfig);

    if (customConfig) {
      this.config = { ...this.config, ...customConfig };
    }
  }

  intercept(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: HttpRequest<any>,
    next: HttpHandler,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<HttpEvent<any>> {
    if (isIgnored(req.url, this.exclude.strs, this.exclude.regExps)) {
      return next.handle(req);
    }

    this.count++;
    if (this.config.showForeground) {
      this.loader.startLoader(
        this.config.loaderId,
        HTTP_LOADER_TASK_ID,
        this.config,
      );
    } else {
      this.loader.startBackgroundLoader(
        this.config.loaderId,
        HTTP_LOADER_TASK_ID,
        this.config,
      );
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.count--;
        if (this.count === 0) {
          if (this.config.showForeground) {
            this.loader.stopLoader(this.config.loaderId, HTTP_LOADER_TASK_ID);
          } else {
            this.loader.stopBackgroundLoader(
              this.config.loaderId,
              HTTP_LOADER_TASK_ID,
            );
          }
        }
      }),
    );
  }
}
