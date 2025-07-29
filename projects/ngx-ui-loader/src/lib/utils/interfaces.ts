/* eslint-disable @typescript-eslint/no-empty-interface */
import { DirectionType, PositionType, SpinnerType } from './types';

export interface Time {
  delay?: number;
  maxTime?: number;
  minTime?: number;
}

export interface Task extends Time {
  delayTimer?: ReturnType<typeof setTimeout>;
  isDelayed?: boolean;
  isForeground: boolean;
  isOtherRunning?: boolean;
  maxTimer?: ReturnType<typeof setTimeout>;
  minTimer?: ReturnType<typeof setTimeout>;
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

export interface NgxUiLoaderConfig extends Time {
  bgsColor?: string;
  bgsOpacity?: number;
  bgsPosition?: PositionType;
  bgsSize?: number;
  blur?: number;
  bgsType?: SpinnerType;
  fastFadeOut?: boolean;
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
}

export interface NgxUiLoaderHttpConfig extends Config, Time {}

export interface NgxUiLoaderRouterConfig extends Config {}
