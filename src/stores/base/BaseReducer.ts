// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Reducer } from 'redux';
import BaseAction from './BaseAction';

type ReducerMethod<T> = (state: T, action: BaseAction<any>) => T;
type ReducerMethods<T> = { [actionType: string]: ReducerMethod<T> };

/*
 The API related reducers have to implement this baseReducer. If an action of type
 REQUEST_SOMETHING_FINISHED is flagged with error, it doesn't have to be processed.
*/
export default function baseReducer<T = any>(initialState: T, methods: ReducerMethods<T>): Reducer<T> {
  return (state: T = initialState, action: BaseAction<any>): T => {
    const method: ReducerMethod<T> | undefined = methods[action.type];

    // if the action doesn't have a method or the has been flagged as error
    // we return the current state and do not mutate the state
    if (!method || action.error) {
      return state;
    }

    return method(state, action);
  };
}
