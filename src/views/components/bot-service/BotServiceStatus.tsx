// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React, { useEffect } from "react";
import AppState from "@/stores/AppState";
import { Flex, Loader } from "@fluentui/react-northstar";
import { useDispatch, useSelector } from "react-redux";

import { getVirtualMachineStateAsync } from "@/stores/service/asyncActions";
import { BotService } from "@/models/botService/types";
import BotServiceCard from "./BotServiceCard";
import { useState } from "react";
import useInterval from "@/hooks/useInterval";
import { useCallback } from "react";

const BotServiceStatus: React.FC = () => {
  const dispatch = useDispatch();
  const [isPollingEnabled, setIsPollingEnabled] = useState(false)

  const botServices: BotService[] = useSelector(
    (appstate: AppState) => appstate.botService.botServices
  );
  const hasBotServices = botServices.length > 0;
  
  useInterval(useCallback(() => dispatch(getVirtualMachineStateAsync()), [dispatch, getVirtualMachineStateAsync]), isPollingEnabled ? 3000 : null);

  useEffect(()=>{
    setIsPollingEnabled(true)
  },[])

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
