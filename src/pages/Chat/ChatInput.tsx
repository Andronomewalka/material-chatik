import React, { SyntheticEvent, useState } from "react";
import { IconButton, InputBase, styled } from "@mui/material";
import { ChatInputProp } from "./types";
import SendIcon from "@mui/icons-material/Send";

const ChatInput: React.FC<ChatInputProp> = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const onSubmitInternal = (e: SyntheticEvent) => {
    e.preventDefault();
    if (value && value.trim()) {
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <InputContainer onSubmit={onSubmitInternal}>
      <InputBase
        sx={{
          width: "100%",
          height: "40px",
          color: "inherit",
          paddingLeft: 2,
        }}
        placeholder="Type your message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconButton type="submit">
        <SendIcon color="primary" />
      </IconButton>
    </InputContainer>
  );
};

export default ChatInput;

const InputContainer = styled("form")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  backgroundColor: theme.palette.grey[50],
}));
