import { Reducer } from "redux";
import * as ToastsAction from "./actions";
import baseReducer from "../base/BaseReducer";

export enum ToastStatusEnum {
  Error = "error",
  Warning = "warning",
  Success = "success",
}

export interface ToastItem {
  id: string;
  type: string;
  message: string;
}

export interface ToastState {
  items: ToastItem[];
}

const INITIAL_STATE: ToastState = {
  items: [],
};

export const toastReducer: Reducer = baseReducer(INITIAL_STATE, {
  [ToastsAction.ADD_TOAST](
    state: ToastState,
    action: ToastsAction.AddToastMessage
  ): ToastState {
    return {
      ...state,
      items: [...state.items, action.payload!],
    };
  },
  [ToastsAction.REMOVE_TOAST](
    state: ToastState,
    action: ToastsAction.RemoveToastMessage
  ) {
    const toastId = action.payload;

    return {
      ...state,
      items: state.items.filter((model) => model.id !== toastId),
    };
  },
});
