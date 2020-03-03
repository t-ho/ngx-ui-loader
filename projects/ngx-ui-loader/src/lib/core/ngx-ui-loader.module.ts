import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUiLoaderComponent } from './ngx-ui-loader.component';
import { NgxUiLoaderBlurredDirective } from './ngx-ui-loader-blurred.directive';
import { NGX_UI_LOADER_CONFIG_TOKEN } from './ngx-ui-loader-config.token';
import { NgxUiLoaderConfig } from '../utils/interfaces';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxUiLoaderComponent, NgxUiLoaderBlurredDirective],
  exports: [NgxUiLoaderComponent, NgxUiLoaderBlurredDirective]
})
export class NgxUiLoaderModule {
  /**
   * forRoot
   * @returns A module with its provider dependencies
   */
  static forRoot(ngxUiLoaderConfig: NgxUiLoaderConfig): ModuleWithProviders<NgxUiLoaderModule> {
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
