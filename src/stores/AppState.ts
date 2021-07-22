// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { TeamsContextState } from "@/stores/teamsContext/reducer";
import { RouterState } from "connected-react-router";
import { AuthState } from "@/stores/auth/reducer";
import { ConfigState } from "@/stores/config/reducer";
import { PublicCallState } from "@/stores/calls/public-call/reducer";
import { RequestingState } from "@/stores/requesting/reducer";
import { ErrorState } from "@/stores/errors/reducer";
import { ToastState } from "@/stores/toast/reducer";
import { PrivateCallState } from "@/stores/calls/private-call/reducer";
import { BotServiceAppState } from "@/stores/service/reducer";
import { UIState } from "./ui/reducer";

export default interface AppState {
  router: RouterState;
  config: ConfigState;
  auth: AuthState;
  privateCall: PrivateCallState;
  publicCall: PublicCallState;
  teamsContext: TeamsContextState;
  botService: BotServiceAppState;
  errors: ErrorState;
  toast: ToastState;
  ui: UIState;
  requesting: RequestingState;
}
