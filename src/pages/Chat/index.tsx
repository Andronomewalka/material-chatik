import React, { useEffect, useState } from "react";
import { MessageProp, MessageType } from "components/Message";
import { nanoid } from "nanoid";
import ChatInput from "components/Chat/ChatInput";
import ChatHistory from "components//Chat/ChatHistory";
import BoxContainer from "components/Common/BoxContainer";
import { Box } from "@mui/system";
import Channels from "components/Channels";
import { Divider } from "@mui/material";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        "& > div:last-child": {
          flex: "1 0",
        },
      }}
    >
      <Channels />
      <BoxContainer>
        <ChatHistory messages={messages} />
        <ChatInput onSubmit={onNewSendMessage} />
      </BoxContainer>
    </Box>
  );
};

export default Chat;
