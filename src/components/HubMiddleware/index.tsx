import React from "react";
import { ChildrenProp } from "utils/childrenProp";
import useHubReceiver from "./hubReceiver";

export const HubMiddleware: React.FC<ChildrenProp> = ({ children }) => {
  useHubReceiver();
  return <>{children}</>;
};
