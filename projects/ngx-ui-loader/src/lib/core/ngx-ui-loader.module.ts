import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { NgxUiLoaderComponent } from './ngx-ui-loader.component';
import { NgxUiLoaderBlurredDirective } from './ngx-ui-loader-blurred.directive';
import { NGX_UI_LOADER_CONFIG_TOKEN } from './ngx-ui-loader-config.token';
import { NgxUiLoaderConfig } from './ngx-ui-loader-config';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    NgxUiLoaderComponent,
    NgxUiLoaderBlurredDirective,
  ],
  exports: [
    NgxUiLoaderComponent,
    NgxUiLoaderBlurredDirective,
  ]
})
export class NgxUiLoaderModule {

  /**
   * Contructor
   * @param parentModule optional
   */
  constructor(@Optional() @SkipSelf() parentModule: NgxUiLoaderModule) {
    if (parentModule) {
      throw new Error('[ngx-ui-loader] - NgxUiLoaderModule is already loaded. It should be imported in the root `AppModule` only!');
    }
  }

  /**
   * forRoot
   * @param ngxUiLoaderConfig
   * @returns A module with its provider dependencies
   */
  static forRoot(ngxUiLoaderConfig: NgxUiLoaderConfig): ModuleWithProviders {
    return {
      ngModule: NgxUiLoaderModule,
      providers: [
        {
          provide: NGX_UI_LOADER_CONFIG_TOKEN,
          useValue: ngxUiLoaderConfig
        }
      ]
    };
  }
}
