import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { MessageProp, MessageType } from "components/Message";
import { nanoid } from "nanoid";
import ChatInput from "./ChatInput";
import ChatHistory from "./ChatHistory";

function getFakeMessages(): Array<MessageProp> {
  const res: Array<MessageProp> = [];

  for (let i = 0; i < 1000; i++) {
    res.push({
      id: nanoid(),
      text: `some - ${i}`,
      user: "huila",
      type: i % 2 === 0 ? MessageType.Send : MessageType.Receive,
    });
  }

  return res;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState(Array<MessageProp>());

  const onNewSendMessage = (text: string) => {
    setMessages([
      ...messages,
      {
        id: nanoid(),
        text: text,
        user: "huila",
        type: MessageType.Send,
      },
    ]);
  };

  useEffect(() => {
    setMessages(getFakeMessages());
  }, []);

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <ChatHistory messages={messages} />
      <ChatInput onSubmit={onNewSendMessage} />
    </Box>
  );
};

export default Chat;
