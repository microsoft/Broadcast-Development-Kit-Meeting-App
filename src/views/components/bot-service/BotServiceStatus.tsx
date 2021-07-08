// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React, { useEffect } from "react";
import AppState from "@/stores/AppState";
import { Flex, Loader } from "@fluentui/react-northstar";
import { useDispatch, useSelector } from "react-redux";

import { getVirtualMachineStateAsync } from "@/stores/service/asyncActions";
import { BotService } from "@/models/botService/types";
import * as BotServiceActions from "@/stores/service/actions";
import { selectRequesting } from "@/stores/requesting/selectors";
import BotServiceCard from "./BotServiceCard";

const BotServiceStatus: React.FC = () => {
  const dispatch = useDispatch();
  const botServices: BotService[] = useSelector(
    (appstate: AppState) => appstate.botService.botServices
  );
  const isRequesting: boolean = useSelector((appstate: AppState) =>
    selectRequesting(appstate, [BotServiceActions.REQUEST_SERVICE_STATUS])
  );
  const isStarting: boolean = useSelector((appstate: AppState) =>
    selectRequesting(appstate, [BotServiceActions.REQUEST_START_SERVICE])
  );
  const isStoping: boolean = useSelector((appstate: AppState) =>
    selectRequesting(appstate, [BotServiceActions.REQUEST_STOP_SERVICE])
  );
  const hasBotServices = botServices.length > 0;

  useEffect(() => {
    if (!isStarting && !isStoping) {
      setTimeout(() => {
        dispatch(getVirtualMachineStateAsync());
      }, 3000);
    }
  }, [botServices, isStarting, isStoping]);

  return (
    <>
    
        {hasBotServices ? (
          <>
            {botServices.map((botService: BotService) => (
              <BotServiceCard key={botService.id} botService={botService} />
            ))}
          </>
        ) : (
          <Flex vAlign="center" hAlign="center">
            <Loader />
          </Flex>
        )}
    </>
  );
};

export default BotServiceStatus;
