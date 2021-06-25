import { Action } from 'redux';
import { RequestResponse } from '../../services/api';

export interface RequestFinishedActionParameters<T> {
  payload: RequestResponse<T>;
  meta?: any;
}

export default interface BaseAction<T> extends Action<string> {
  type: string;
  payload?: T;
  error?: boolean;
  meta?: any;
}

export const createBaseAction = <T = undefined>({
  type,
  payload,
  error = false,
  meta = null,
}: BaseAction<T>): BaseAction<T> => {
  return { type, payload, error, meta };
};
