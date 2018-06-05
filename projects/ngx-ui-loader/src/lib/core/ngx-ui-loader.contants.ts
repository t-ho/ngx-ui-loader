import { NgxUiLoaderConfig } from './ngx-ui-loader-config';
import { NGX_POSITIONS, PB_DIRECTIONS, SPINNER_TYPES } from './ngx-ui-loader.enums';

/**
 * The configuration of spinners
 */
export const SPINNER_CONFIG = {
  'ball-scale-multiple': {
    divs: 3,
    class: 'sk-ball-scale-multiple'
  },
  'ball-spin': {
    divs: 8,
    class: 'sk-ball-spin'
  },
  'ball-spin-clockwise': {
    divs: 8,
    class: 'sk-ball-spin-clockwise'
  },
  'ball-spin-clockwise-fade-rotating': {
    divs: 8,
    class: 'sk-ball-spin-clockwise-fade-rotating'
  },
  'ball-spin-fade-rotating': {
    divs: 8,
    class: 'sk-ball-spin-fade-rotating'
  },
  'chasing-dots': {
    divs: 2,
    class: 'sk-chasing-dots'
  },
  'circle': {
    divs: 12,
    class: 'sk-circle'
  },
  'cube-grid': {
    divs: 9,
    class: 'sk-cube-grid'
  },
  'double-bounce': {
    divs: 2,
    class: 'sk-double-bounce'
  },
  'fading-circle': {
    divs: 12,
    class: 'sk-fading-circle'
  },
  'folding-cube': {
    divs: 4,
    class: 'sk-folding-cube'
  },
  'pulse':  {
    divs: 1,
    class: 'sk-pulse'
  },
  'rectangle-bounce': {
    divs: 5,
    class: 'sk-rectangle-bounce'
  },
  'rectangle-bounce-party': {
    divs: 5,
    class: 'sk-rectangle-bounce-party'
  },
  'rectangle-bounce-pulse-out': {
    divs: 5,
    class: 'sk-rectangle-bounce-pulse-out'
  },
  'rectangle-bounce-pulse-out-rapid': {
    divs: 5,
    class: 'sk-rectangle-bounce-pulse-out-rapid'
  },
  'rotating-plane': {
    divs: 1,
    class: 'sk-rotating-plane'
  },
  'square-jelly-box': {
    divs: 2,
    class: 'sk-square-jelly-box'
  },
  'square-loader': {
    divs: 1,
    class: 'sk-square-loader'
  },
  'three-bounce': {
    divs: 3,
    class: 'sk-three-bounce'
  },
  'three-strings': {
    divs: 3,
    class: 'sk-three-strings'
  },
  'wandering-cubes': {
    divs: 2,
    class: 'sk-wandering-cubes'
  },
};

/**
 * The default configuration of ngx-ui-loader
 */
export const DEFAULT_CONFIG: NgxUiLoaderConfig = {
  bgsColor: '#00ACC1',
  bgsOpacity: 0.5,
  bgsPosition: NGX_POSITIONS.bottomRight,
  bgsSize: 60,
  bgsType: SPINNER_TYPES.rectangleBounce,
  blur: 5,
  fgsColor: '#00ACC1',
  fgsPosition: NGX_POSITIONS.centerCenter,
  fgsSize: 60,
  fgsType: SPINNER_TYPES.rectangleBounce,
  gap: 24,
  logoPosition: NGX_POSITIONS.centerCenter,
  logoSize: 120,
  logoUrl: '',
  overlayColor: 'rgba(40, 40, 40, 0.8)',
  pbColor: '#00ACC1',
  pbDirection: PB_DIRECTIONS.leftToRight,
  pbThickness: 5,
  text: '',
  textColor: '#FFFFFF',
  textPosition: NGX_POSITIONS.centerCenter,
  threshold: 500
};

/**
 * The default id of the loading
 */
export const DEFAULT_ID = 'default';
