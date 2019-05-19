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
