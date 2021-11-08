import React, { SyntheticEvent, useRef, useState } from "react";
import {
  alpha,
  Box,
  IconButton,
  InputBase,
  Stack,
  styled,
} from "@mui/material";
import { ChatInputProp, ChatProp } from "./types";
import Message, { MessageProp, MessageType } from "components/Message";
import SendIcon from "@mui/icons-material/Send";

const ChatInput: React.FC<ChatInputProp> = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const onSubmitInternal = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit(value);
    setValue("");
  };

  return (
    <InputContainer onSubmit={onSubmitInternal}>
      <InputBase
        sx={{ width: "100%", height: "50px", color: "inherit", paddingLeft: 2 }}
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

const Chat: React.FC<ChatProp> = () => {
  const [messages, setMessages] = useState(Array<MessageProp>());
  const chatListRef = useRef<HTMLDivElement>(null);

  const onNewSendMessage = (text: string) => {
    setMessages([
      ...messages,
      {
        text: text,
        user: "huila",
        type: MessageType.Send,
      },
    ]);

    console.log(chatListRef.current?.scrollHeight);
    chatListRef.current?.scrollTo(0, chatListRef.current?.scrollHeight + 200);
  };

  return (
    <Box height="100%">
      <Stack
        ref={chatListRef}
        direction="column"
        alignItems="center"
        flexGrow={1}
        spacing={2}
        padding={2}
        height="600px"
        overflow="auto"
        sx={{
          "& > :first-child": {
            marginTop: "auto !important",
          },
        }}
      >
        {messages.map((cur) => (
          <Message {...cur} />
        ))}
      </Stack>
      <ChatInput onSubmit={onNewSendMessage} />
    </Box>
  );
};

export default Chat;

const InputContainer = styled("form")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[50],
}));
