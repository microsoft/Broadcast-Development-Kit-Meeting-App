// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AnyAction } from "redux";
import { MockStore } from "redux-mock-store";

// Test Helpers
export function findAction(store: MockStore, type: string): AnyAction {
  return store.getActions().find((action) => action.type === type);
}

export function getAction(store: MockStore, type: string): Promise<AnyAction> {
  const action = findAction(store, type);
  if (action) {
    return Promise.resolve(action);
  }

  return new Promise((resolve) => {
    store.subscribe(() => {
      const eventualAction = findAction(store, type);
      if (eventualAction) {
        resolve(eventualAction);
      }
    });
  });
}
