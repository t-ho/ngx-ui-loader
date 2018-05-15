import { NgxProgressConfig } from './ngx-progress-config';

export const SPINNER = {
  rotatingPlane: {
    divs: 1,
    class: 'sk-rotating-plane'
  },
  doubleBounce: {
    divs: 2,
    class: 'sk-double-bounce'
  },
  rectangleBounce: {
    divs: 5,
    class: 'sk-rectangle-bounce'
  },
  wanderingCubes: {
    divs: 2,
    class: 'sk-wandering-cubes'
  },
  pulse:  {
    divs: 1,
    class: 'sk-pulse'
  },
  chasingDots: {
    divs: 2,
    class: 'sk-chasing-dots'
  },
  threeBounce: {
    divs: 3,
    class: 'sk-three-bounce'
  },
  circle: {
    divs: 12,
    class: 'sk-circle'
  },
  cubeGrid: {
    divs: 9,
    class: 'sk-cube-grid'
  },
  fadingCircle: {
    divs: 12,
    class: 'sk-fading-circle'
  },
  foldingCube: {
    divs: 4,
    class: 'sk-folding-cube'
  },
  threeStrings: {
    divs: 3,
    class: 'sk-three-strings'
  },
};

export const SPINNER_TYPES = {
  rotatingPlane: 'rotatingPlane',
  doubleBounce: 'doubleBounce',
  rectangleBounce: 'rectangleBounce',
  wanderingCubes: 'wanderingCubes',
  pulse: 'pulse',
  chasingDots: 'chasingDots',
  threeBounce: 'threeBounce',
  circle: 'circle',
  cubeGrid: 'cubeGrid',
  fadingCircle: 'fadingCircle',
  foldingCube: 'foldingCube',
  threeStrings: 'threeStrings',
};

export const DEFAULT_CONFIG: NgxProgressConfig = {
  bgsColor: '#00ACC1',
  bgsOpacity: 0.7,
  bgsSize: 60,
  bgsType: SPINNER_TYPES.rectangleBounce,
  fgsColor: '#00ACC1',
  fgsSize: 60,
  fgsType: SPINNER_TYPES.rectangleBounce,
  logoUrl: '',
  overlayColor: 'rgba(40, 40, 40, 0.8)',
  progressBarColor: '#00ACC1',
  progressBarHeight: 5,
  text: '',
  textColor: '#FFFFFF',
};

export const DEFAULT_ID = 'default';

export const INTERVAL = 1200;
