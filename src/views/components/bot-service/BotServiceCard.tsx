import React from "react";
import { Icon } from "@iconify/react";
import { RobotIcon } from "@fluentui/react-icons-northstar";
import stop20Filled from "@iconify-icons/fluent/stop-20-filled";
import play20Filled from "@iconify-icons/fluent/play-20-filled";
import { Flex, Button, Text, Avatar, Card } from "@fluentui/react-northstar";
import { BotService, ProvisioningStateValues } from "@/models/botService/types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  startVirtualMachineAsync,
  stopVirtualMachineAsync,
} from "@/stores/service/asyncActions";

interface BotServiceCardProps {
  botService: BotService;
}

const BotServiceCard: React.FC<BotServiceCardProps> = (props) => {
  const dispatch = useDispatch();
  const [showStopConfirmation, setShowStopConfirmation] = useState(false);

  const { id: provisioningStateValue, name: provisioningStateDisplayName } =
    props.botService.infrastructure.provisioningDetails.state;

  const showStop: boolean =
    provisioningStateValue === ProvisioningStateValues.Provisioned;

  const hasTransitioningState: boolean =
    provisioningStateValue === ProvisioningStateValues.Provisioning ||
    provisioningStateValue === ProvisioningStateValues.Deprovisioning;

  const serviceStatusColor = (): string => {
    switch (provisioningStateValue) {
      case ProvisioningStateValues.Provisioning:
        return "#F8D22A";
      case ProvisioningStateValues.Provisioned:
        return "#6BB700";
      case ProvisioningStateValues.Deprovisioning:
        return "#E97548";
      case ProvisioningStateValues.Deprovisioned:
        return "#8A8886";
      default:
        return "#B3B0AD";
    }
  };

  const handleActionButton = () => {
    !showStop
      ? dispatch(startVirtualMachineAsync())
      : setShowStopConfirmation(true);
  };

  const handleConfirmStopButton = () => {
    dispatch(stopVirtualMachineAsync());
    setShowStopConfirmation(false);
  };

  return (
    <>
      <Flex
        style={{
          paddingTop: "4px",
          paddingBottom: "6px",
        }}
        vAlign="center"
        gap="gap.small"
        space="between"
      >
        <Flex gap="gap.small" vAlign="center">
          <Avatar
            icon={<RobotIcon />}
            label="VM Status"
            status={{
              color: serviceStatusColor(),
              status: provisioningStateDisplayName,
            }}
          />

          <Text weight="semibold">Service: {provisioningStateDisplayName}</Text>
        </Flex>
        <Button
          icon={
            !showStop ? (
              <Icon icon={play20Filled} color="white" />
            ) : (
              <Icon icon={stop20Filled} color="white" />
            )
          }
          disabled={hasTransitioningState}
          loading={hasTransitioningState}
          onClick={handleActionButton}
          iconOnly
          circular
        />
      </Flex>
      {showStopConfirmation && (
        <Flex gap="gap.small" hAlign="center" vAlign="center">
          <Card aria-roledescription="card with action buttons">
            <Flex
              style={{
                paddingBottom: "4px",
              }}
            >
              <Text>Are you sure you want to stop the service?</Text>
            </Flex>
            <Card.Footer fitted>
              <Flex gap="gap.small" hAlign="end">
                <Button
                  content="Cancel"
                  onClick={() => setShowStopConfirmation(false)}
                />
                <Button
                  content="Accept"
                  primary
                  onClick={handleConfirmStopButton}
                />
              </Flex>
            </Card.Footer>
          </Card>
        </Flex>
      )}
    </>
  );
};

export default BotServiceCard;
