// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import App from "./App";
import './index.css'
import configureStore, {history} from "./stores";

const store = configureStore();

ReactDOM.render(<>
  <ReduxProvider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </ReduxProvider>

</>, document.getElementById("root"));
