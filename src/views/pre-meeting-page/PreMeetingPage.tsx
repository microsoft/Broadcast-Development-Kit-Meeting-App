import { Flex, Text } from "@fluentui/react-northstar";
import * as React from "react";

interface IPreMeetingPageProps {};

const PreMeetingPage: React.FC<IPreMeetingPageProps> = (props) => {

  return (
    <Flex column gap="gap.small" className="tabComponent">
      <Text>The extension has been successfully added to the meeting and will be available inside the meeting once it starts.</Text>
      <Text>To remove the extension, click on the downward arrow besides this meeting tab header and select <b>Remove</b>. Note that Teams only allows to do this in the chat tab.</Text> 
    </Flex>
  );
};

export default PreMeetingPage;