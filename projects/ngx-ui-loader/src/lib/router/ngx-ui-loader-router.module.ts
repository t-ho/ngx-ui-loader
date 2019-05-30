import { NgModule, ModuleWithProviders, Inject, Optional, SkipSelf } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';

import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NgxUiLoaderRouterConfig } from '../utils/interfaces';
import { NGX_UI_LOADER_ROUTER_CONFIG_TOKEN } from './ngx-ui-loader-router-config.token';
import { ROUTER_LOADER_TASK_ID } from '../utils/constants';
import { getExclude, isIgnored } from '../utils/functions';
import { Exclude } from '../utils/interfaces';

@NgModule({})
export class NgxUiLoaderRouterModule {

  private exclude: Exclude;

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
      loaderId: ngxUiLoaderService.getDefaultConfig().masterLoaderId,
      showForeground: true
    };

    this.exclude = getExclude(config);

    if (config) {
      defaultConfig = { ...defaultConfig, ...config };
    }

    router.events
      .subscribe((event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          if (!isIgnored(event.url, this.exclude.strs, this.exclude.regExps)) {
            if (defaultConfig.showForeground) {
              ngxUiLoaderService.startLoader(defaultConfig.loaderId, ROUTER_LOADER_TASK_ID);
            } else {
              ngxUiLoaderService.startBackgroundLoader(defaultConfig.loaderId, ROUTER_LOADER_TASK_ID);
            }
          }
        }

        if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
          if (!isIgnored(event.url, this.exclude.strs, this.exclude.regExps)) {
            if (defaultConfig.showForeground) {
              ngxUiLoaderService.stopLoader(defaultConfig.loaderId, ROUTER_LOADER_TASK_ID);
            } else {
              ngxUiLoaderService.stopBackgroundLoader(defaultConfig.loaderId, ROUTER_LOADER_TASK_ID);
            }
          }
        }
      });
  }

}
