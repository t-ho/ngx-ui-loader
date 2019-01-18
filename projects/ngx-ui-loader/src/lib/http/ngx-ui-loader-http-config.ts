/**
 * The interface of ngx-ui-loader configuration
 */
export interface NgxUiLoaderHttpConfig {
  exclude?: string[]; // not show loader for these api url
  loaderId?: string;
  showForeground?: boolean;
}
