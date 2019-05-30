import { DirectionType, PositionType, SpinnerType } from './types';

export interface Task {
  delayTimer?: NodeJS.Timer;
  isDelayed?: boolean;
  isForeground: boolean;
  isOtherRunning?: boolean;
  maxTimer?: NodeJS.Timer;
  minTimer?: NodeJS.Timer;
  startAt?: number;
  taskId: string;
}

export interface Tasks {
  [taskId: string]: Task;
}

export interface Loader {
  loaderId: string;
  tasks: Tasks;
  isMaster?: boolean;
  isBound: boolean;
}

export interface Loaders {
  [loaderId: string]: Loader;
}

export interface ShowEvent {
  loaderId: string;
  isShow: boolean;
}

export interface Config {
  exclude?: string[]; // not show loader for the urls that start with these strings
  excludeRegexp?: string[]; // not show loader for the urls matching these regexps
  loaderId?: string;
  showForeground?: boolean;
}

export interface Exclude {
  strs: string[];
  regExps: RegExp[];
}

export interface NgxUiLoaderConfig {
  bgsColor?: string;
  bgsOpacity?: number;
  bgsPosition?: PositionType;
  bgsSize?: number;
  blur?: number;
  bgsType?: SpinnerType;
  delay?: number;
  fgsColor?: string;
  fgsPosition?: PositionType;
  fgsSize?: number;
  fgsType?: SpinnerType;
  gap?: number;
  logoPosition?: PositionType;
  logoSize?: number;
  logoUrl?: string;
  masterLoaderId?: string;
  overlayBorderRadius?: string;
  overlayColor?: string;
  pbColor?: string;
  pbDirection?: DirectionType;
  pbThickness?: number;
  hasProgressBar?: boolean;
  text?: string;
  textColor?: string;
  textPosition?: PositionType;
  maxTime?: number;
  minTime?: number;
}

export interface NgxUiLoaderHttpConfig extends Config { }

export interface NgxUiLoaderRouterConfig extends Config { }
