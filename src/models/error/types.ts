// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { v4 as uuidv4 } from 'uuid';

export type ApplicationError = ApiError | DefaultError;

export interface ErrorDefaults {
  id: string;
  message: string;
}

export class DefaultError implements ErrorDefaults {
  id: string = uuidv4();
  message: string = '';
  raw: any = null;

  constructor(message: string, raw?: any) {
    this.message = message;
    if (raw) {
      this.raw = raw;
    }
  }
}

export class ApiError implements ErrorDefaults {
  id: string = uuidv4();
  message: string = '';
  status: number = 0;
  errors: string[] = [];
  url: string = '';
  raw: any = null;
}
