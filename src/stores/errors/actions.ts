import BaseAction from '../base/BaseAction';

export const REMOVE_ERROR: string = 'REMOVE_ERROR';
export const CLEAR_ALL_ERROR: string = 'CLEAR_ALL_ERROR';

export function removeById(id: string): BaseAction<string> {
  return {
    type: REMOVE_ERROR,
    payload: id,
  };
}

export function clearAll(): BaseAction<undefined> {
  return {
    type: CLEAR_ALL_ERROR,
  };
}
