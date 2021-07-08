// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/*
 * Note: This reducer breaks convention on how reducers should be setup.
 */

import BaseAction from "../base/BaseAction";

export interface RequestingState {
  readonly [key: string]: boolean;
}

export const initialState: RequestingState = {};

export default function requestingReducer(state: RequestingState = initialState, action: BaseAction<any>): RequestingState {
  // We only take actions that include 'REQUEST_' in the type.
  const isRequestType: boolean = action.type.includes('REQUEST_');

  if (isRequestType === false) {
    return state;
  }

  // Remove the string '_FINISHED' from the action type so we can use the first part as the key on the state.
  const requestName: string = action.type.replace('_FINISHED', '');
  
  // If the action type includes '_FINISHED' or '_ERROR'. The boolean value will be false. Otherwise we
  // assume it is a starting request and will be set to true.
  const isFinishedRequestType: boolean = action.type.includes('_FINISHED');
  const isErrorRequestType: boolean = action.type.includes('_ERROR');
  
  const isRequesting = isFinishedRequestType === false && isErrorRequestType === false;

  return {
    ...state,
    [requestName]: isRequesting,
  };
}
