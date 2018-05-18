import { NgxUiLoaderConfig } from './ngx-ui-loader-config';

/**
 * The configuration of spinners
 */
export const SPINNER_CONFIG = {
  'rotating-plane': {
    divs: 1,
    class: 'sk-rotating-plane'
  },
  'double-bounce': {
    divs: 2,
    class: 'sk-double-bounce'
  },
  'rectangle-bounce': {
    divs: 5,
    class: 'sk-rectangle-bounce'
  },
  'wandering-cubes': {
    divs: 2,
    class: 'sk-wandering-cubes'
  },
  'pulse':  {
    divs: 1,
    class: 'sk-pulse'
  },
  'chasing-dots': {
    divs: 2,
    class: 'sk-chasing-dots'
  },
  'three-bounce': {
    divs: 3,
    class: 'sk-three-bounce'
  },
  'circle': {
    divs: 12,
    class: 'sk-circle'
  },
  'cube-grid': {
    divs: 9,
    class: 'sk-cube-grid'
  },
  'fading-circle': {
    divs: 12,
    class: 'sk-fading-circle'
  },
  'folding-cube': {
    divs: 4,
    class: 'sk-folding-cube'
  },
  'three-strings': {
    divs: 3,
    class: 'sk-three-strings'
  },
};

/**
 * Available spinner types
 */
export const SPINNER_TYPES = {
  rotatingPlane: 'rotating-plane',
  doubleBounce: 'double-bounce',
  rectangleBounce: 'rectangle-bounce',
  wanderingCubes: 'wandering-cubes',
  pulse: 'pulse',
  chasingDots: 'chasing-dots',
  threeBounce: 'three-bounce',
  circle: 'circle',
  cubeGrid: 'cube-grid',
  fadingCircle: 'fading-circle',
  foldingCube: 'folding-cube',
  threeStrings: 'three-strings',
};

/**
 * Available postions
 */
export const NGX_POSITIONS = {
  topLeft: 'top-left',
  topCenter: 'top-center',
  topRight: 'top-right',
  centerLeft: 'center-left',
  centerCenter: 'center-center',
  centerRight: 'center-right',
  bottomLeft: 'bottom-left',
  bottomCenter: 'bottom-center',
  bottomRight: 'bottom-right'
};

/**
 * Progress bar directions
 */
export const PB_DIRECTIONS = {
  leftToRight: 'ltr',
  rightToLeft: 'rtl'
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
  textPosition: NGX_POSITIONS.centerCenter
};

/**
 * The default id of the loading
 */
export const DEFAULT_ID = 'default';

/**
 * The time close out a loading
 */
export const INTERVAL = 1100;
