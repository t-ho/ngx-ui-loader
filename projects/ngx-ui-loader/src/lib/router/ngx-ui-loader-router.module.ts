import { NgModule, ModuleWithProviders, Inject, Optional, SkipSelf } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';

import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NgxUiLoaderRouterConfig } from '../utils/interfaces';
import { NGX_UI_LOADER_ROUTER_CONFIG_TOKEN } from './ngx-ui-loader-router-config.token';
import { ROUTER_LOADER_TASK_ID } from '../utils/constants';
import { getExcludeObj, isIgnored } from '../utils/functions';
import { Exclude } from '../utils/interfaces';

@NgModule({})
export class NgxUiLoaderRouterModule {
  private exclude: Exclude;

  /**
   * forRoot
   * @returns A module with its provider dependencies
   */
  static forRoot(routerConfig: NgxUiLoaderRouterConfig): ModuleWithProviders<NgxUiLoaderRouterModule> {
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
   */
  constructor(
    @Optional() @SkipSelf() parentModule: NgxUiLoaderRouterModule,
    @Optional() @Inject(NGX_UI_LOADER_ROUTER_CONFIG_TOKEN) customConfig: NgxUiLoaderRouterConfig,
    router: Router,
    loader: NgxUiLoaderService
  ) {
    if (parentModule) {
      throw new Error('[ngx-ui-loader] - NgxUiLoaderRouterModule is already loaded. It should be imported in the root `AppModule` only!');
    }

    let config: NgxUiLoaderRouterConfig = {
      loaderId: loader.getDefaultConfig().masterLoaderId,
      showForeground: true
    };

    this.exclude = getExcludeObj(customConfig);

    if (customConfig) {
      config = { ...config, ...customConfig };
    }

    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        if (!isIgnored(event.url, this.exclude.strs, this.exclude.regExps)) {
          if (config.showForeground) {
            loader.startLoader(config.loaderId, ROUTER_LOADER_TASK_ID);
          } else {
            loader.startBackgroundLoader(config.loaderId, ROUTER_LOADER_TASK_ID);
          }
        }
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        if (!isIgnored(event.url, this.exclude.strs, this.exclude.regExps)) {
          if (config.showForeground) {
            loader.stopLoader(config.loaderId, ROUTER_LOADER_TASK_ID);
          } else {
            loader.stopBackgroundLoader(config.loaderId, ROUTER_LOADER_TASK_ID);
          }
        }
      }
    });
  }
}
