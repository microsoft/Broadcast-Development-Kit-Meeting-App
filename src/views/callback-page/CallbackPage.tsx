import React, { useEffect } from "react";
import * as microsoftTeams from "@microsoft/teams-js";
import { getHashParameters } from "@/services/helpers";

const CallbackPage: React.FC = () => {
  useEffect(() => {
    const hash = window.location.hash;
    const hashParams = getHashParameters(hash);
    if (hashParams["error"]) {
      // TODO: Save in local storage the corresponding error
      microsoftTeams.authentication.notifyFailure(hashParams["error"]);
    } else if (hashParams["access_token"]) {
      const localState = localStorage.getItem("auth.state");

      if (localState === hashParams["state"]) {
        microsoftTeams.authentication.notifySuccess(JSON.stringify(hashParams));
      } else {
        // TODO: Save in local storage the corresponding error
        microsoftTeams.authentication.notifyFailure("StateDoesNotMatch")
      }
    }
  }, []);

  return (
    null
  )
}

export default CallbackPage;
