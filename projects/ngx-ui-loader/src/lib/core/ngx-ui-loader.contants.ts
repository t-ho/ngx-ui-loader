import { NgxUiLoaderConfig } from './ngx-ui-loader-config';

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
 * Available spinner types
 */
export const SPINNER_TYPES = {
  ballScaleMultiple: 'ball-scale-multiple',
  ballSpin: 'ball-spin',
  ballSpinClockwise: 'ball-spin-clockwise',
  chasingDots: 'chasing-dots',
  circle: 'circle',
  cubeGrid: 'cube-grid',
  doubleBounce: 'double-bounce',
  fadingCircle: 'fading-circle',
  foldingCube: 'folding-cube',
  pulse: 'pulse',
  rectangleBounce: 'rectangle-bounce',
  rectangleBounceParty: 'rectangle-bounce-party',
  rectangleBouncePulseOut: 'rectangle-bounce-pulse-out',
  rectangleBouncePulseOutRapid: 'rectangle-bounce-pulse-out-rapid',
  rotatingPlane: 'rotating-plane',
  threeBounce: 'three-bounce',
  threeStrings: 'three-strings',
  wanderingCubes: 'wandering-cubes',
};

/**
 * Available postions
 */
export const NGX_POSITIONS = {
  bottomCenter: 'bottom-center',
  bottomLeft: 'bottom-left',
  bottomRight: 'bottom-right',
  centerCenter: 'center-center',
  centerLeft: 'center-left',
  centerRight: 'center-right',
  topCenter: 'top-center',
  topLeft: 'top-left',
  topRight: 'top-right',
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
  textPosition: NGX_POSITIONS.centerCenter,
  threshold: 500
};

/**
 * The default id of the loading
 */
export const DEFAULT_ID = 'default';

/**
 * The time close out a loading
 */
export const INTERVAL = 1100;
