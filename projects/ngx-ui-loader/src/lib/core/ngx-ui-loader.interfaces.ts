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

export interface ShowEvent {
  loaderId: string;
  isShow: boolean;
}
