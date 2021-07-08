// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { applyMiddleware, combineReducers, createStore, AnyAction, CombinedState, Store } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { History } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware, { ThunkMiddleware, ThunkDispatch } from 'redux-thunk';
import { createBrowserHistory } from 'history';

import AppState from './AppState';
import { contextReducer } from '@/stores/teamsContext/reducer';
import { saveAuthToken } from '@/middlewares/saveAuthTokenMiddleware';
import { callsReducer } from '@/stores/calls/private-call/reducer';
import { authReducer } from '@/stores/auth/reducer';
import { configReducer } from '@/stores/config/reducer';
import { publicCallsreducer } from '@/stores/calls/public-call/reducer';
import { botServiceReducer } from '@/stores/service/reducer';
import requestingReducer from '@/stores/requesting/reducer';
import errorReducer from '@/stores/errors/reducer';
import { toastReducer } from '@/stores/toast/reducer';
import errorToastMiddleware from '@/middlewares/errorToastMiddleware';

const createRootReducer = (history: History) => combineReducers<AppState>({
  router: connectRouter(history),
  config: configReducer,
  auth: authReducer,
  privateCall: callsReducer,
  publicCall: publicCallsreducer,
  teamsContext: contextReducer,
  botService: botServiceReducer,
  requesting: requestingReducer,
  errors: errorReducer,
  toast: toastReducer,
});

const configureStore = (): Store<CombinedState<AppState>, AnyAction> => createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(
    routerMiddleware(history),
    errorToastMiddleware,
    saveAuthToken,
    thunkMiddleware as ThunkMiddleware<AppState, AnyAction>))
);

export const history = createBrowserHistory()

export default configureStore;

export type DispatchExts = ThunkDispatch<AppState, undefined, AnyAction>;
