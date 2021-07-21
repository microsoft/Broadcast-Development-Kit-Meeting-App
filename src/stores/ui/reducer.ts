// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Reducer } from "redux";
import * as UIActions from "./actions";
import baseReducer from "../base/BaseReducer";

export interface UIState {
    activeSections: number[];
    activeCards: string[];
}

const INITIAL_STATE: UIState = {
    activeSections: [0,1,2],
    activeCards: [],
};

export const uiReducer: Reducer = baseReducer(INITIAL_STATE, {
    [UIActions.ADD_CALL_ACTIVE_SECTION](
        state: UIState,
        action: UIActions.AddCallActiveSection
    ): UIState {
        const items: number[] = action.payload?.filter((item: number) => !state.activeSections.includes(item)) || [];
        const updatedSections = [...state.activeSections, ...items];

        return {
            ...state,
            activeSections: updatedSections,
        };
    },
    [UIActions.REMOVE_CALL_ACTIVE_SECTION](
        state: UIState,
        action: UIActions.RemoveCallActiveSection
    ): UIState {
        const indexToRemove = state.activeSections.findIndex((item:number) => item === action.payload!)

        if (indexToRemove === -1){
            return state
        }

        const items = state.activeSections;
        items.splice(indexToRemove, 1);

        return {
            ...state,
            activeSections: items,
        };
    },
    [UIActions.ADD_CALL_ACTIVE_CARD](
        state: UIState,
        action: UIActions.AddCallActiveCard
    ): UIState {
        const items: string[] = action.payload?.filter((item: string) => !state.activeCards.includes(item)) || [];
        const updatedSections = [...state.activeCards, ...items];

        return {
            ...state,
            activeCards: updatedSections,
        };
    },
    [UIActions.REMOVE_CALL_ACTIVE_CARD](
        state: UIState,
        action: UIActions.RemoveCallActiveCard
    ): UIState {
        const indexToRemove = state.activeCards.findIndex((item:string) => item === action.payload!)

        if (indexToRemove === -1){
            return state
        }

        const items = state.activeCards;
        items.splice(indexToRemove, 1);

        return {
            ...state,
            activeCards: items,
        };
    },
});
