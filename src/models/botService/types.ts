// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export enum BotServiceInfrastructureState {
  Running = "PowerState/running",
  Deallocating = "PowerState/deallocating",
  Deallocated = "PowerState/deallocated",
  Starting = "PowerState/starting",
  Stopped = "PowerState/stopped",
  Stopping = "PowerState/stopping",
  Unknown = "PowerState/unknown",
}

export interface BotService {
  id: string;
  name: string;
  callId: string;
  state: BotServiceStates;
  infrastructure: Infrastructure;
}

export interface Infrastructure {
  virtualMachineName: string;
  resourceGroup: string;
  subscriptionId: string;
  powerState: BotServiceInfrastructureState;
  provisioningDetails: ProvisioningDetails;
}

export interface ProvisioningDetails {
  state: ProvisioningState;
  messsage: string;
}

export interface ProvisioningState {
  id: ProvisioningStateValues;
  name: string;
}

export enum ProvisioningStateValues {
  Provisioning = 0,
  Provisioned = 1,
  Deprovisioning = 2,
  Deprovisioned = 3,
  Error = 4,
  Unknown = 5,
}

export enum BotServiceStates {
  Unavailable = 0,
  Available = 1,
  Busy = 2,
}
