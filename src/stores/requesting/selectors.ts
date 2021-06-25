import { createSelector, ParametricSelector } from "reselect";
import IAppState from "../AppState";
import { RequestingState } from "./reducer";

export const selectRequesting: ParametricSelector<IAppState, string[], boolean> = createSelector(
  (state: IAppState) => state.requesting,
  (state: IAppState, actionTypes: string[]) => actionTypes,
  _selectRequesting
);

function _selectRequesting(requestingState: RequestingState, actionTypes: string[]): boolean {
  return actionTypes.some((actionType: string) => requestingState[actionType]);
}
