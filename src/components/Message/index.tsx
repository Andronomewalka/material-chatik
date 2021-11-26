import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Message as MessageProp, MessageType } from "state/messages";

const SendMessage: React.FC<MessageProp> = ({ text, user, timeUtc }) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        width: "fit-content",
        maxWidth: "60%",
        padding: 1,
        margin: "5px 15px 5px auto",
      }}
      elevation={3}
    >
      <Typography color={theme.palette.text.primary}>{text}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <Typography variant="caption">{timeUtc}</Typography>
        <Typography variant="caption">{user}</Typography>
      </Box>
    </Paper>
  );
};

const ReceiveMessage: React.FC<MessageProp> = ({ text, user, timeUtc }) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        width: "fit-content",
        maxWidth: "60%",
        padding: 1,
        margin: "5px auto 5px 7px",
      }}
      elevation={3}
    >
      <Typography color={theme.palette.text.primary}>{text}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <Typography variant="caption">{user}</Typography>
        <Typography variant="caption">{timeUtc}</Typography>
      </Box>
    </Paper>
  );
};

const Message: React.FC<MessageProp> = ({ type, ...props }) => {
  const theme = useTheme();

  return (
    <>
      {type === MessageType.Send ? (
        <SendMessage {...props} />
      ) : (
        <ReceiveMessage {...props} />
      )}
    </>
  );
};

export default Message;
export * from "./types";
