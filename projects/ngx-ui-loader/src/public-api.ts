/*
 * Public API Surface of ngx-ui-loader
 */

export { NgxUiLoaderService } from './lib/core/ngx-ui-loader.service';
export { NgxUiLoaderModule } from './lib/core/ngx-ui-loader.module';
export { NgxUiLoaderComponent } from './lib/core/ngx-ui-loader.component';
export { NgxUiLoaderBlurredDirective } from './lib/core/ngx-ui-loader-blurred.directive';
export { SPINNER, POSITION, PB_DIRECTION } from './lib/utils/enums';
export {
  Loader,
  Loaders,
  NgxUiLoaderConfig,
  NgxUiLoaderHttpConfig,
  NgxUiLoaderRouterConfig,
  Task,
  Tasks,
  Time,
} from './lib/utils/interfaces';
export { NgxUiLoaderRouterModule } from './lib/router/ngx-ui-loader-router.module';
export { NgxUiLoaderHttpModule } from './lib/http/ngx-ui-loader-http.module';
