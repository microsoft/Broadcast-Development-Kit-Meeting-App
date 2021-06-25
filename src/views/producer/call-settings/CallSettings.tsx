import {
  Button,
  Dropdown,
  Flex,
  FlexItem,
  Form,
  Input,
  RadioGroup,
  Text,
} from "@fluentui/react-northstar";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AppState from "@/stores/AppState";
import { useDispatch, useSelector } from "react-redux";
import useInput from "@/hooks/useInput";
import { CallDefaults, StreamMode, StreamProtocol } from "@/models/calls/types";
import { updateCallDefaults } from "@/stores/calls/private-call/actions";
import { CALL_DETAILS_PATH } from "@/models/global/constants";

const protocols = Object.keys(StreamProtocol).filter(
  (i) => !isNaN(parseInt(i))
);

const items = protocols.map((p, index) => {
  return StreamProtocol[index];
});

const CallSettings: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const call = useSelector(
    (state: AppState) => state.privateCall.activeCall ?? null
  );

  //State
  const [mode, setMode] = useState(StreamMode.Listener);
  const [hasPassphraseError, setHasPassphraseError] = useState(false);

  const defaultProtocol = call?.defaultProtocol ?? StreamProtocol.RTMP;

  const {
    value: selectedProtocol,
    setValue: setSelectedProtocol,
    bind: bindSelectedProtocol,
  } = useInput(
    StreamProtocol[defaultProtocol],
    StreamProtocol[defaultProtocol]
  );

  const {
    value: passphrase,
    setValue: setPassphrase,
    bind: bindPassphrase,
  } = useInput("", "");

  const {
    value: latency,
    setValue: setLatency,
    bind: bindLatency,
  } = useInput("750", "750");

  useEffect(() => {
    if (call) {
      setSelectedProtocol(StreamProtocol[call.defaultProtocol]);
      setPassphrase(call.defaultPassphrase);
      setLatency(call.defaultLatency);
      setMode(call.defaultMode);
    }
  }, []);

  // no call, nothing to see
  if (!call) {
    return null;
  }

  const callId = call.id;

  //Methods
  const redirectToMeetingDetails = () => {
    const path = `${CALL_DETAILS_PATH}${callId}`;
    console.log(path);
    history.push(path);
  };

  const onDefaultsUpdated = (e: React.FormEvent) => {
    e.preventDefault();
    setHasPassphraseError(false);

    // invoke an asyncAction that will update on API
    console.log(selectedProtocol, passphrase, latency);

    const protocol =
      StreamProtocol[selectedProtocol as keyof typeof StreamProtocol];

    if (protocol === StreamProtocol.SRT) {
      if (
        passphrase.length &&
        (passphrase.length < 10 || passphrase.length > 79)
      ) {
        setHasPassphraseError(true);
        return;
      }
    }

    const newDefaults: CallDefaults = {
      protocol: StreamProtocol[selectedProtocol as keyof typeof StreamProtocol],
      latency: protocol === StreamProtocol.SRT ? latency : 750,
      passphrase: protocol === StreamProtocol.SRT ? passphrase : "",
      mode: mode,
    };

    console.log(newDefaults);

    dispatch(
      updateCallDefaults({ callId, defaults: newDefaults as CallDefaults })
    );

    redirectToMeetingDetails();
  };

  const onClickCancelBtn = (event: unknown) => {
    redirectToMeetingDetails();
  };

  return (
    <Flex column gap="gap.small">
      <Form onSubmit={onDefaultsUpdated}>
        <Text weight="bold" content="Default Streaming Protocol" />

        <Dropdown
          items={items}
          highlightFirstItemOnOpen={true}
          defaultValue={selectedProtocol}
          checkable
          getA11ySelectionMessage={{
            onAdd: (item) => `${item} has been selected.`,
          }}
          {...bindSelectedProtocol}
        />

        {selectedProtocol === StreamProtocol[StreamProtocol.SRT] && (
          <>
            <Text
              weight="bold"
              content="Settings"
              style={{ marginTop: "4px" }}
            />
            Mode
            <RadioGroup
              checkedValue={mode}
              onCheckedValueChange={(e, props) =>
                setMode(props?.value as StreamMode)
              }
              items={[
                {
                  name: "listener",
                  key: "listener",
                  label: "Listener",
                  value: StreamMode.Listener,
                },
                {
                  name: "caller",
                  key: "caller",
                  label: "Caller",
                  value: StreamMode.Caller,
                },
              ]}
            />
            <Input
              name="latency"
              label="Latency"
              type={"number"}
              defaultValue={"50"}
              {...bindLatency}
              fluid
            />
            <Input
              name="passphrase"
              label="Passphrase"
              {...bindPassphrase}
              fluid
            />
            {hasPassphraseError && (
              <FlexItem align="start">
                <Text
                  content="Passphrase length must be between 10 and 79 characters"
                  color="red"
                  temporary
                />
              </FlexItem>
            )}
          </>
        )}

        <Flex gap="gap.smaller" space="between">
          <Button
            onClick={onClickCancelBtn}
            content="Cancel"
            secondary
            loader="Back up bus"
          />
          <Button content="Save" primary />
        </Flex>
      </Form>
    </Flex>
  );
};

export default CallSettings;
