import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, CloseIcon } from "@fluentui/react-northstar";
import { removeToastById } from "@/stores/toast/actions";
import AppState from "@/stores/AppState";

export const AlertMessage: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: AppState) => state.toast.items);

  const waitAndDismissAlert = (id: string, duration = 8000): Promise<void> => {
    return new Promise((resolve) =>
      setTimeout(() => dismissAlert(id), duration)
    );
  };

  const dismissAlert = (id: string): void => {
    dispatch(removeToastById(id));
  };

  return (
    <>
      {items && items.map((item, index) => {
        waitAndDismissAlert(item.id);
        return (
          <Alert
            key={index}
            danger
            style={{
              height: "20px",
              marginBottom: "4px",
              fontSize: "10pt",
              width: "100%"
            }}
            actions={<CloseIcon onClick={() => dismissAlert(item.id)} />}
            content={item.message}
          />
        );
      })}
    </>
  );
};
