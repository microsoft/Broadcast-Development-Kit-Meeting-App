// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Reducer } from "redux";
import * as UIActions from "./actions";
import baseReducer from "../base/BaseReducer";

export interface UIState {
    expandedSections: number[];
    expandedCards: string[];
}

const INITIAL_STATE: UIState = {
    expandedSections: [0,1,2],
    expandedCards: [],
};

export const uiReducer: Reducer = baseReducer(INITIAL_STATE, {
    [UIActions.ADD_CALL_ACTIVE_SECTION](
        state: UIState,
        action: UIActions.AddCallActiveSection
    ): UIState {
        const items: number[] = action.payload?.filter((item: number) => !state.expandedSections.includes(item)) || [];
        const updatedSections = [...state.expandedSections, ...items];

        return {
            ...state,
            expandedSections: updatedSections,
        };
    },
    [UIActions.REMOVE_CALL_ACTIVE_SECTION](
        state: UIState,
        action: UIActions.RemoveCallActiveSection
    ): UIState {
        const indexToRemove = state.expandedSections.findIndex((item:number) => item === action.payload!)

        if (indexToRemove === -1){
            return state
        }

        const items = state.expandedSections;
        items.splice(indexToRemove, 1);

        return {
            ...state,
            expandedSections: items,
        };
    },
    [UIActions.ADD_CALL_ACTIVE_CARD](
        state: UIState,
        action: UIActions.AddCallActiveCard
    ): UIState {
        const items: string[] = action.payload?.filter((item: string) => !state.expandedCards.includes(item)) || [];
        const updatedSections = [...state.expandedCards, ...items];

        return {
            ...state,
            expandedCards: updatedSections,
        };
    },
    [UIActions.REMOVE_CALL_ACTIVE_CARD](
        state: UIState,
        action: UIActions.RemoveCallActiveCard
    ): UIState {
        const indexToRemove = state.expandedCards.findIndex((item:string) => item === action.payload!)

        if (indexToRemove === -1){
            return state
        }

        const items = state.expandedCards;
        items.splice(indexToRemove, 1);

        return {
            ...state,
            expandedCards: items,
        };
    },
});
