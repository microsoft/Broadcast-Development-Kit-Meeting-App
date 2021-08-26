// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Reducer } from "redux";
import * as UIActions from "./actions";
import baseReducer from "../base/BaseReducer";
import { teamsTheme, ThemePrepared } from "@fluentui/react-northstar";
import { Theme } from "@/models/ui/types";

export interface UIState {
  theme: Theme;
  expandedSections: number[];
  expandedCards: string[];
}

const INITIAL_STATE: UIState = {
  theme: { name: "default", value: teamsTheme },
  expandedSections: [0, 1, 2],
  expandedCards: [],
};

export const uiReducer: Reducer = baseReducer(INITIAL_STATE, {
  [UIActions.EXPAND_SECTION](
    state: UIState,
    action: UIActions.ExpandSection
  ): UIState {
    const items: number[] =
      action.payload?.filter(
        (item: number) => !state.expandedSections.includes(item)
      ) || [];
    const updatedSections = [...state.expandedSections, ...items];

    return {
      ...state,
      expandedSections: updatedSections,
    };
  },
  [UIActions.COLLAPSE_SECTION](
    state: UIState,
    action: UIActions.CollapseSection
  ): UIState {
    const indexToRemove = state.expandedSections.findIndex(
      (item: number) => item === action.payload!
    );

    if (indexToRemove === -1) {
      return state;
    }

    const items = state.expandedSections;
    items.splice(indexToRemove, 1);

    return {
      ...state,
      expandedSections: items,
    };
  },
  [UIActions.EXPAND_CARD](
    state: UIState,
    action: UIActions.ExpandCard
  ): UIState {
    const items: string[] =
      action.payload?.filter(
        (item: string) => !state.expandedCards.includes(item)
      ) || [];
    const updatedSections = [...state.expandedCards, ...items];

    return {
      ...state,
      expandedCards: updatedSections,
    };
  },
  [UIActions.COLLAPSE_CARD](
    state: UIState,
    action: UIActions.CollapseCard
  ): UIState {
    const indexToRemove = state.expandedCards.findIndex(
      (item: string) => item === action.payload!
    );

    if (indexToRemove === -1) {
      return state;
    }

    const items = state.expandedCards;
    items.splice(indexToRemove, 1);

    return {
      ...state,
      expandedCards: items,
    };
  },
  [UIActions.SET_THEME](state: UIState, action: UIActions.SetTheme): UIState {
    return {
      ...state,
      theme: action.payload!,
    };
  },
});
