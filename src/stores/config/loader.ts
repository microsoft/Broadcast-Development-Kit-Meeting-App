// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Config } from "@/models/config/types";
import { DefaultError } from "@/models/error/types";
import Axios from "axios";

const loader = new Promise<Config>((resolve, reject) => {
  Axios.get("/config.json")
    .then((o) => resolve(o.data as Config))
    .catch((err) => {
      console.log("Error loading config:", err);
      const errorResponse = new DefaultError("Error loading config", err);

      reject(errorResponse);
    });
});

export const retrieveConfig = (): Promise<Config> => loader;
