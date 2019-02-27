/**
 * The interface of ngx-ui-loader configuration
 */
export interface NgxUiLoaderHttpConfig {
  exclude?: string[]; // not show loader for the api urls that start with these strings
  excludeRegexp?: string[]; // not show loader for the api urls matching these regexps
  loaderId?: string;
  showForeground?: boolean;
}
