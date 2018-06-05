/**
 * Available spinner types
 */
export enum SPINNER {
  ballScaleMultiple = 'ball-scale-multiple',
  ballSpin = 'ball-spin',
  ballSpinClockwise = 'ball-spin-clockwise',
  ballSpinClockwiseFadeRotating = 'ball-spin-clockwise-fade-rotating',
  ballSpinFadeRotating = 'ball-spin-fade-rotating',
  chasingDots = 'chasing-dots',
  circle = 'circle',
  cubeGrid = 'cube-grid',
  doubleBounce = 'double-bounce',
  fadingCircle = 'fading-circle',
  foldingCube = 'folding-cube',
  pulse = 'pulse',
  rectangleBounce = 'rectangle-bounce',
  rectangleBounceParty = 'rectangle-bounce-party',
  rectangleBouncePulseOut = 'rectangle-bounce-pulse-out',
  rectangleBouncePulseOutRapid = 'rectangle-bounce-pulse-out-rapid',
  rotatingPlane = 'rotating-plane',
  squareJellyBox = 'square-jelly-box',
  squareLoader = 'square-loader',
  threeBounce = 'three-bounce',
  threeStrings = 'three-strings',
  wanderingCubes = 'wandering-cubes',
}

/**
 * Available postions
 */
export enum POSITION {
  bottomCenter = 'bottom-center',
  bottomLeft = 'bottom-left',
  bottomRight = 'bottom-right',
  centerCenter = 'center-center',
  centerLeft = 'center-left',
  centerRight = 'center-right',
  topCenter = 'top-center',
  topLeft = 'top-left',
  topRight = 'top-right'
}

/**
 * Progress bar directions
 */
export enum PB_DIRECTION {
  leftToRight = 'ltr',
  rightToLeft = 'rtl'
}

/**
 * @deprecated use `SPINNER` instead. This will be removed in the version 2.x.x
 */
export enum SPINNER_TYPES {
  ballScaleMultiple = 'ball-scale-multiple',
  ballSpin = 'ball-spin',
  ballSpinClockwise = 'ball-spin-clockwise',
  ballSpinClockwiseFadeRotating = 'ball-spin-clockwise-fade-rotating',
  ballSpinFadeRotating = 'ball-spin-fade-rotating',
  chasingDots = 'chasing-dots',
  circle = 'circle',
  cubeGrid = 'cube-grid',
  doubleBounce = 'double-bounce',
  fadingCircle = 'fading-circle',
  foldingCube = 'folding-cube',
  pulse = 'pulse',
  rectangleBounce = 'rectangle-bounce',
  rectangleBounceParty = 'rectangle-bounce-party',
  rectangleBouncePulseOut = 'rectangle-bounce-pulse-out',
  rectangleBouncePulseOutRapid = 'rectangle-bounce-pulse-out-rapid',
  rotatingPlane = 'rotating-plane',
  squareJellyBox = 'square-jelly-box',
  squareLoader = 'square-loader',
  threeBounce = 'three-bounce',
  threeStrings = 'three-strings',
  wanderingCubes = 'wandering-cubes',
}

/**
 * @deprecated use `POSITION` instead. This will be removed in the version 2.x.x
 */
export enum NGX_POSITIONS {
  bottomCenter = 'bottom-center',
  bottomLeft = 'bottom-left',
  bottomRight = 'bottom-right',
  centerCenter = 'center-center',
  centerLeft = 'center-left',
  centerRight = 'center-right',
  topCenter = 'top-center',
  topLeft = 'top-left',
  topRight = 'top-right'
}

/**
 * @deprecated use `PB_DIRECTION` instead. This will be removed in the version 2.x.x
 */
export enum PB_DIRECTIONS {
  leftToRight = 'ltr',
  rightToLeft = 'rtl'
}
