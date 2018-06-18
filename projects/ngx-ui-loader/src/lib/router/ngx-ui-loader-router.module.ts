import { NgModule, ModuleWithProviders, Inject, Optional, SkipSelf } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NgxUiLoaderRouterConfig } from './ngx-ui-loader-router-config';
import { NGX_UI_LOADER_ROUTER_CONFIG_TOKEN } from './ngx-ui-loader-router-config.token';
import { ROUTER_LOADER_ID } from './ngx-ui-loader-router.constants';

@NgModule({})
export class NgxUiLoaderRouterModule {

  /**
   * forRoot
   * @param routerConfig Configuration
   * @returns A module with its provider dependencies
   */
  static forRoot(routerConfig: NgxUiLoaderRouterConfig): ModuleWithProviders {
    return {
      ngModule: NgxUiLoaderRouterModule,
      providers: [
        {
          provide: NGX_UI_LOADER_ROUTER_CONFIG_TOKEN,
          useValue: routerConfig
        }
      ]
    };
  }

  /**
   * Constructor
   *
   * @param parentModule
   * @param config
   * @param router
   * @param ngxUiLoaderService
   */
  constructor(
    @Optional() @SkipSelf() parentModule: NgxUiLoaderRouterModule,
    @Optional() @Inject(NGX_UI_LOADER_ROUTER_CONFIG_TOKEN) config: NgxUiLoaderRouterConfig,
    router: Router,
    ngxUiLoaderService: NgxUiLoaderService) {

    if (parentModule) {
      throw new Error('[ngx-ui-loader] - NgxUiLoaderRouterModule is already loaded. It should be imported in the root `AppModule` only!');
    }

    let defaultConfig: NgxUiLoaderRouterConfig = {
      showForeground: true
    };

    if (config) {
      defaultConfig = Object.assign(defaultConfig, config);
    }

    router.events
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          if (defaultConfig.showForeground) {
            ngxUiLoaderService.start(ROUTER_LOADER_ID);
          } else {
            ngxUiLoaderService.startBackground(ROUTER_LOADER_ID);
          }
        }

        if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
          if (defaultConfig.showForeground) {
            ngxUiLoaderService.stop(ROUTER_LOADER_ID);
          } else {
            ngxUiLoaderService.stopBackground(ROUTER_LOADER_ID);
          }
        }
      });
  }
}
