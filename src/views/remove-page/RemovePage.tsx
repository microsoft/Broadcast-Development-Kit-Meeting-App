import { Flex, Text } from "@fluentui/react-northstar";
import * as React from "react";

interface IRemovePageProps {};

const RemovePage: React.FC<IRemovePageProps> = (props) => {

  return (
      <Flex column gap="gap.small" className="tabComponent">
          <Text>Please click on the <b>Remove</b> button below to remove the extension from this meeting.</Text> 
      </Flex>
  );
};

export default RemovePage;