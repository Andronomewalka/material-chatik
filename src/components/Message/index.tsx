import React from "react";
import { Box } from "@mui/system";
import { MessageProp, MessageType } from "./types";
import { Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Message: React.FC<MessageProp> = ({ text, user, type }) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        maxWidth: "60%",
        alignSelf: type === MessageType.Send ? "end" : "start",
        padding: 1,
      }}
      elevation={3}
    >
      <Typography color={theme.palette.text.primary}>{text}</Typography>
    </Paper>
  );
};

export default Message;
export * from "./types";
