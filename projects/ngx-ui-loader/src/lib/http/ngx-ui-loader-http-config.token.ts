import { InjectionToken } from '@angular/core';
import { NgxUiLoaderHttpConfig } from './ngx-ui-loader-http-config';

/**
 * Injection token for ngx-ui-loader-http configuration
 */
export const NGX_UI_LOADER_HTTP_CONFIG_TOKEN = new InjectionToken<NgxUiLoaderHttpConfig>('ngxUiLoaderHttpCustom.config');
