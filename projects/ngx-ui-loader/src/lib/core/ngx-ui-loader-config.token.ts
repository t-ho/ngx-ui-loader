import { InjectionToken } from '@angular/core';
import { NgxUiLoaderConfig } from '../utils/interfaces';

/**
 * Injection token for ngx-ui-loader configuration
 */
export const NGX_UI_LOADER_CONFIG_TOKEN = new InjectionToken<NgxUiLoaderConfig>('ngxUiLoaderCustom.config');
