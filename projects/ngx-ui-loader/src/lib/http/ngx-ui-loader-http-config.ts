/**
 * The interface of ngx-ui-loader configuration
 */
export interface NgxUiLoaderHttpConfig {
  showForeground?: boolean;
  exclude?: string[]; // not show loader for these api url
}
