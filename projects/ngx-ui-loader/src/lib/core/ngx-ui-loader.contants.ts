import { NgxUiLoaderConfig } from './ngx-ui-loader-config';
import { POSITION, PB_DIRECTION, SPINNER } from './ngx-ui-loader.enums';

/**
 * The default value of task id
 */
export const DEFAULT_TASK_ID = 'default';

/**
 * The default value of loader id
 */
export const DEFAULT_MASTER_LOADER_ID = 'master';

export const CLOSING_TIME = 1100;

export const WAITING_FOR_OVERLAY_DISAPPEAR = 500;


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
  bgsPosition: POSITION.bottomRight,
  bgsSize: 60,
  bgsType: SPINNER.ballSpinClockwise,
  blur: 5,
  fgsColor: '#00ACC1',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 60,
  fgsType: SPINNER.ballSpinClockwise,
  gap: 24,
  logoPosition: POSITION.centerCenter,
  logoSize: 120,
  logoUrl: '',
  masterLoaderId: DEFAULT_MASTER_LOADER_ID,
  overlayBorderRadius: '0',
  overlayColor: 'rgba(40, 40, 40, 0.8)',
  pbColor: '#00ACC1',
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 3,
  hasProgressBar: true,
  text: '',
  textColor: '#FFFFFF',
  textPosition: POSITION.centerCenter,
  threshold: 500
};
