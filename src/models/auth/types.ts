// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Status, StatusCode } from "../global/types";

export enum AuthStatusCode {
  Unauthenticated,
  Authenticating,
  Authenticated,
  AuthenticationError,
}

export interface AuthStatus {
  status: AuthStatusCode;
  errorMessage: string | null;
  apiToken: string | null;
}

export interface UserProfile {
  id: string | null;
  userName: string | null;
  userRole: UserRoles | null;
  accessedAs: UserRoles | null;
}

export interface AuthConfig {
  domain: string;
  clientId: string;
  instance: string;
  tenantId: string;
  groupId: string;
  spaClientId: string;
}

export enum UserRoles {
  Attendee,
  Producer,
}
