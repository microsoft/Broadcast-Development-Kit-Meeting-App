// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppState from "@/stores/AppState";
import StatusBar from "@/views/components/StatusBar";
import { Accordion, Flex, Loader, Text } from "@fluentui/react-northstar";
import { selectCallDetailsProps } from "@/stores/calls/selectors";
import useInterval from "@/hooks/useInterval";
import { getCallByMeetingIdAsync } from "@/stores/calls/private-call/asyncActions";
import InjectionStreamSettings from "./components/InjectionStreamSettings";
import InjectionStreamCard from "./components/InjectionStreamCard";
import StreamSettings from "./components/StreamSettings";
import StreamCard from "./components/StreamCard";
import BotServiceStatus from "@/views/components/bot-service/BotServiceStatus";
import "./CallDetails.css";
import {
  expandSection,
  collapseSection,
} from "@/stores/ui/actions";

const CallDetails: React.FC = () => {
  const dispatch = useDispatch();

  const callDetailsProps = useSelector((state: AppState) =>
    selectCallDetailsProps(state)
  );

  const expandedSections = useSelector(
    (state: AppState) => state.ui.expandedSections
  );

  const toggleExpandedSection = (event: any, data: any) => {
    const sectionIndex = data.index;
    const isSectionExpanded = expandedSections.includes(sectionIndex);
    isSectionExpanded
      ? dispatch(collapseSection(sectionIndex))
      : dispatch(expandSection([sectionIndex]));
  };

  const {
    callId,
    isPrimarySpeakerEnabled,
    isStageEnabled,
    isStreamSettingsEnabled,
    isInjectionStreamSettingsEnabled,
    isCallEnabled: callEnabled,
    mainStreams,
    participantStreams,
    activeStreams,
    injectionStream,
    isPollingEnabled,
    pollingTime,
    meetingId,
    callProtocol,
    isBotMuted
  } = callDetailsProps;

  useInterval(
    () => {
      dispatch(getCallByMeetingIdAsync(meetingId));
    },
    isPollingEnabled ? pollingTime : null
  );

  const sections = [
    {
      title: "Broadcast Outputs",
      streams: activeStreams.length > 0 ? activeStreams : null,
    },
    {
      title: "Main Streams",
      streams: mainStreams,
    },
    {
      title: "Participants",
      streams: participantStreams,
    },
  ];

  const isAnyStreamEnabled =
    isStreamSettingsEnabled || isInjectionStreamSettingsEnabled;

  return (
    <Flex
      column
      gap="gap.small"
      style={{
        height: "100vh",
      }}
    >
      <Flex
        column
        hAlign="stretch"
        style={{
          height: "50px",
        }}
      >
        <StatusBar />
      </Flex>
      <Flex
        column
        hAlign="stretch"
        space="between"
        style={{
          height: "calc(100% - 50px)",
          overflow: "auto",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {callEnabled ? (
          <>
            {isStreamSettingsEnabled && <StreamSettings />}
            {isInjectionStreamSettingsEnabled && <InjectionStreamSettings />}
            {!isAnyStreamEnabled && (
              <Accordion
                onTitleClick={toggleExpandedSection}
                defaultActiveIndex={expandedSections}
                panels={[
                  {
                    title: "Injection Stream",
                    content: {
                      content: (
                        <InjectionStreamCard
                          key={"injection-stream"}
                          callId={callId}
                          stream={injectionStream}
                          isBotMuted={isBotMuted}
                        />
                      ),
                      key: `content-${"Injection Stream"}`,
                      styles: {
                        paddingBottom: "8px",
                      },
                    },
                    key: `panel-${"section.title"}`,
                  },
                  ...sections.map((section) => {
                    return {
                      title: section.title,
                      content: {
                        content: section.streams ? (
                          section.streams.map((stream) => (
                            <StreamCard
                              key={stream.id}
                              callId={callId}
                              stream={stream}
                              isPrimarySpeakerEnabled={isPrimarySpeakerEnabled}
                              isStageEnabled={isStageEnabled}
                              callProtocol={callProtocol}
                            />
                          ))
                        ) : (
                          <Text temporary content="Start a stream from below" />
                        ),
                        key: `content-${section.title}`,
                        styles: {
                          paddingBottom: "8px",
                        },
                      },
                      key: `panel-${section.title}`,
                    };
                  }),
                ]}
              />
            )}
            <Flex.Item push>
              <BotServiceStatus />
            </Flex.Item>
          </>
        ) : (
          <Flex vAlign="center" hAlign="center">
            <Loader
              label="Wait while the bot joins into the meeting"
              labelPosition="below"
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default CallDetails;
