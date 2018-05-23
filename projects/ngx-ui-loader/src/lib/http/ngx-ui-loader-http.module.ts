import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxUiLoaderHttpInterceptor } from './ngx-ui-loader-http.interceptor';
import { NgxUiLoaderHttpConfig } from './ngx-ui-loader-http-config';
import { NGX_UI_LOADER_HTTP_CONFIG_TOKEN } from './ngx-ui-loader-http-config.token';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NgxUiLoaderHttpInterceptor,
      multi: true
    }
  ],
})
export class NgxUiLoaderHttpModule {

  /**
   * forRoot
   * @param httpConfig Configuration
   * @returns A module with its provider dependencies
   */
  static forRoot(httpConfig: NgxUiLoaderHttpConfig): ModuleWithProviders {
    return {
      ngModule: NgxUiLoaderHttpModule,
      providers: [
        {
          provide: NGX_UI_LOADER_HTTP_CONFIG_TOKEN,
          useValue: httpConfig
        }
      ]
    };
  }
}
