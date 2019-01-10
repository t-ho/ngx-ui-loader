import { DirectionType, PositionType, SpinnerType } from './ngx-ui-loader.types';

/**
 * The interface of ngx-ui-loader configuration
 */
export interface NgxUiLoaderConfig {
  bgsColor?: string;
  bgsOpacity?: number;
  bgsPosition?: PositionType;
  bgsSize?: number;
  blur?: number;
  bgsType?: SpinnerType;
  fgsColor?: string;
  fgsPosition?: PositionType;
  fgsSize?: number;
  fgsType?: SpinnerType;
  gap?: number;
  logoPosition?: PositionType;
  logoSize?: number;
  logoUrl?: string;
  isFullViewPort?: boolean;
  overlayColor?: string;
  pbColor?: string;
  pbDirection?: DirectionType;
  pbThickness?: number;
  hasProgressBar?: boolean;
  text?: string;
  textColor?: string;
  textPosition?: PositionType;
  threshold?: number;
}
