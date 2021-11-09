import React from "react";
import { MessageProp, MessageType } from "./types";
import { Box, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Message: React.FC<MessageProp> = ({ text, user, type }) => {
  const theme = useTheme();
  return (
    <Box>
      <Paper
        sx={{
          width: "fit-content",
          maxWidth: "60%",
          padding: 1,
          margin: `${
            type === MessageType.Send
              ? "5px 15px 5px auto"
              : "5px auto 5px 15px"
          }`,
        }}
        elevation={3}
      >
        <Typography color={theme.palette.text.primary}>{text}</Typography>
      </Paper>
    </Box>
  );
};

export default Message;
export * from "./types";
