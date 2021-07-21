// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import BaseAction from '../base/BaseAction';

export const EXPAND_SECTION = 'EXPAND_SECTION';
export const COLLAPSE_SECTION = 'COLLAPSE_SECTION';
export const EXPAND_CARD = 'EXPAND_CARD';
export const COLLAPSE_CARD = 'COLLAPSE_CARD';

export interface ExpandSection extends BaseAction<number[]> { }
export interface CollapseSection extends BaseAction<number> { }
export interface ExpandCard extends BaseAction<string[]> { }
export interface CollapseCard extends BaseAction<string> { }

export const expandSection = (items: number[]): ExpandSection => ({
    type: EXPAND_SECTION,
    payload: items
});

export const collapseSection = (item: number): CollapseSection => ({
    type: COLLAPSE_SECTION,
    payload: item
});

export const expandCard = (items: string[]): ExpandCard => ({
    type: EXPAND_CARD,
    payload: items
});

export const collapseCard = (item: string): CollapseCard => ({
    type: COLLAPSE_CARD,
    payload: item
});
