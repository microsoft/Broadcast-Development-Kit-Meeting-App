// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import BaseAction from '../base/BaseAction';

export const ADD_CALL_ACTIVE_SECTION = 'ADD_CALL_ACTIVE_SECTION';
export const REMOVE_CALL_ACTIVE_SECTION = 'REMOVE_CALL_ACTIVE_SECTION';
export const ADD_CALL_ACTIVE_CARD = 'ADD_CALL_ACTIVE_CARD';
export const REMOVE_CALL_ACTIVE_CARD = 'REMOVE_CALL_ACTIVE_CARD';

export interface AddCallActiveSection extends BaseAction<number[]> { }
export interface RemoveCallActiveSection extends BaseAction<number> { }
export interface AddCallActiveCard extends BaseAction<string[]> { }
export interface RemoveCallActiveCard extends BaseAction<string> { }

export const addCallActiveSection = (items: number[]): AddCallActiveSection => ({
    type: ADD_CALL_ACTIVE_SECTION,
    payload: items
});

export const removeCallActiveSection = (item: number): RemoveCallActiveSection => ({
    type: REMOVE_CALL_ACTIVE_SECTION,
    payload: item
});

export const addCallActiveCard = (items: string[]): AddCallActiveCard => ({
    type: ADD_CALL_ACTIVE_CARD,
    payload: items
});

export const removeCallActiveCard = (item: string): RemoveCallActiveCard => ({
    type: REMOVE_CALL_ACTIVE_CARD,
    payload: item
});
