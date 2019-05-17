/**
 * The interface of ngx-ui-loader configuration
 */
export interface NgxUiLoaderRouterConfig {
  exclude?: string[]; // not show loader for the urls that start with these strings
  excludeRegexp?: string[]; // not show loader for the urls matching these regexps
  loaderId?: string;
  showForeground?: boolean;
}
