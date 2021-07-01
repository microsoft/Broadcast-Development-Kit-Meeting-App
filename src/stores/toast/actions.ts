// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { v4 as uuid4 } from 'uuid';
import BaseAction from '../base/BaseAction';
import { ToastItem } from './reducer';

export const ADD_TOAST = 'ADD_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';

export interface AddToastMessage extends BaseAction<ToastItem> { }
export interface RemoveToastMessage extends BaseAction<string> { }

export const addToast = (message: string, type: string): AddToastMessage => ({
    type: ADD_TOAST,
    payload: { id: uuid4(), message, type }
});

export const removeToastById = (toastId: string): RemoveToastMessage => ({
    type: REMOVE_TOAST,
    payload: toastId
});

