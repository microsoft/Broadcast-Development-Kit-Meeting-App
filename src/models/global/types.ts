export interface Status<StatusCodeEnum>{
  code: StatusCodeEnum;
  message?: string;
}

export enum StatusCode {
  NOTLOADED = 0,
  LOADING = 1,
  LOADED = 2,
  ERROR = 3
}

export interface PollingSettings {
  pollingTime: number;
  isPollingEnabled: boolean;
}

export interface Dictionary<T> {
  [Key: string]: T;
}
