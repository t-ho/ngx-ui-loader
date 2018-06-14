import { InjectionToken } from '@angular/core';
import { NgxUiLoaderConfig } from './ngx-ui-loader-config';

/**
 * Injection token for ngx-ui-loader configuration
 */
export const NGX_UI_LOADER_CONFIG_TOKEN = new InjectionToken<NgxUiLoaderConfig>('ngxUiLoaderCustom.config');
