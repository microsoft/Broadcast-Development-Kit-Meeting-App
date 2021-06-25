import { UserRoles, AuthConfig } from "../auth/types";

export interface BaseFeatureFlag {
  description: string;
  isActive: boolean;
  userRole?: UserRoles;
}

export type FeatureFlagsTypes = BaseFeatureFlag;

export interface FeatureFlags {
  readonly [key: string]: FeatureFlagsTypes;
}

export interface Config {
  buildNumber: string;
  apiBaseUrl: string;
  authConfig: AuthConfig | null;
  featureFlags: FeatureFlags | undefined;
}
