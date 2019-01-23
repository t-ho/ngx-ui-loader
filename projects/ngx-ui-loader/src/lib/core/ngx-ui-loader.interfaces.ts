export interface Task {
  [taskId: string]: number;
}

export interface Loader {
  loaderId: string;
  foreground: Task;
  background: Task;
  isMaster?: boolean;
  isBound: boolean;
}

export interface Loaders {
  [loaderId: string]: Loader;
}

interface LoaderEvent {
  loaderId: string;
}

export interface ShowEvent extends LoaderEvent {
  isShow: boolean;
}

export interface StartStopEvent extends LoaderEvent {
  taskId: string;
  isForeground: boolean;
}
