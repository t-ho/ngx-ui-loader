import { NgModule, ModuleWithProviders, Inject, Optional, SkipSelf } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';

import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NgxUiLoaderRouterConfig } from './ngx-ui-loader-router-config';
import { NGX_UI_LOADER_ROUTER_CONFIG_TOKEN } from './ngx-ui-loader-router-config.token';
import { ROUTER_LOADER_ID } from './ngx-ui-loader-router.constants';

@NgModule({})
export class NgxUiLoaderRouterModule {

  private exclude: string[];
  private excludeRegexp: RegExp[];

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

    if (config) {
      if (config.exclude) {
        this.exclude = config.exclude.map(url => url.toLowerCase());
      }
      if (config.excludeRegexp) {
        this.excludeRegexp = config.excludeRegexp.map(regexp => new RegExp(regexp, 'i'));
      }
      defaultConfig = { ...defaultConfig, ...config };
    }

    router.events
      .subscribe((event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          if (!this.isIgnored(event.url)) {
            if (defaultConfig.showForeground) {
              ngxUiLoaderService.startLoader(defaultConfig.loaderId, ROUTER_LOADER_ID);
            } else {
              ngxUiLoaderService.startBackgroundLoader(defaultConfig.loaderId, ROUTER_LOADER_ID);
            }
          }
        }

        if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
          if (!this.isIgnored(event.url)) {
            if (defaultConfig.showForeground) {
              ngxUiLoaderService.stopLoader(defaultConfig.loaderId, ROUTER_LOADER_ID);
            } else {
              ngxUiLoaderService.stopBackgroundLoader(defaultConfig.loaderId, ROUTER_LOADER_ID);
            }
          }
        }
      });
  }

  private isIgnored(url: string): boolean {
    if (this.exclude) {
      // do not show the loader for urls in the `exclude` list
      if (this.exclude.findIndex(str => url.toLowerCase().startsWith(str)) !== -1) {
        return true;
      }
    }

    if (this.excludeRegexp) {
      // do not show the loader for urls which matches regexps in the `excludeRegexp` list
      if (this.excludeRegexp.findIndex(regexp => regexp.test(url)) !== -1) {
        return true;
      }
    }

    return false;
  }
}
