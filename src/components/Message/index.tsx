import React from "react";
import { Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Message as MessageProp, MessageType } from "state/messages";

const Message: React.FC<MessageProp> = ({ text, user, type }) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        width: "fit-content",
        maxWidth: "60%",
        padding: 1,
        margin: `${
          type === MessageType.Send ? "5px 15px 5px auto" : "5px auto 5px 7px"
        }`,
      }}
      elevation={3}
    >
      <Typography color={theme.palette.text.primary}>{text}</Typography>
    </Paper>
  );
};

export default Message;
export * from "./types";
