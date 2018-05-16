import { NgxProgressConfig } from './ngx-progress-config';

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

export const NGX_POSITION = {
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

export const PROGRESS_BAR_DIRECTION = {
  leftToRight: 'ltr',
  rightToLeft: 'rtl'
};

export const DEFAULT_CONFIG: NgxProgressConfig = {
  bgsColor: '#00ACC1',
  bgsOpacity: 0.7,
  bgsPosition: NGX_POSITION.bottomRight,
  bgsSize: 60,
  bgsType: SPINNER_TYPES.rectangleBounce,
  fgsColor: '#00ACC1',
  fgsPosition: NGX_POSITION.centerCenter,
  fgsSize: 60,
  fgsType: SPINNER_TYPES.rectangleBounce,
  logoPosition: NGX_POSITION.centerCenter,
  logoSize: 120,
  logoUrl: '',
  overlayColor: 'rgba(40, 40, 40, 0.8)',
  progressBarColor: '#00ACC1',
  progressBarDirection: PROGRESS_BAR_DIRECTION.leftToRight,
  progressBarHeight: 5,
  text: '',
  textColor: '#FFFFFF',
  textPosition: NGX_POSITION.centerCenter
};

export const DEFAULT_ID = 'default';

export const INTERVAL = 1200;
