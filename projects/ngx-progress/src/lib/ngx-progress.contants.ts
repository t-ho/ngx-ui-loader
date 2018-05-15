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
};

export const DEFAULT_CONFIG: NgxProgressConfig = {
  bgColor: '#00ACC1',
  bgOpacity: 0.7,
  bgSize: '60px',
  bgSpinnerType: SPINNER_TYPES.rectangleBounce,
  fgColor: '#00ACC1',
  fgSize: '60px',
  fgSpinnerType: SPINNER_TYPES.rectangleBounce,
  overlayColor: 'rgba(40, 40, 40, 0.8)',
};

export const DEFAULT_ID = 'default';

export const INTERVAL = 1200;
