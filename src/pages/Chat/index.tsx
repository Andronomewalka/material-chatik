import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { nanoid } from "nanoid";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { selectChannelId } from "state/channels";
import { getMessages, selectMessages, sendMessage } from "state/messages";
import { MessageProp, MessageType } from "components/Message";
import ChatInput from "components/Chat/ChatInput";
import ChatHistory from "components//Chat/ChatHistory";
import BoxContainer from "components/Common/BoxContainer";
import Channels from "components/Channels";
import { selectUser } from "state/user";

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
  const dispatch = useAppDispatch();
  const selectedChannelId = useAppSelector(selectChannelId);
  const user = useAppSelector(selectUser);
  const messages = useAppSelector(selectMessages);

  const onNewSendMessage = (text: string) => {
    dispatch(
      sendMessage({
        id: nanoid(),
        sender: user,
        receiverId: selectedChannelId,
        text,
        dateUtc: new Date().toString(),
      })
    );
  };

  useEffect(() => {
    console.log("selectedChannelId", selectedChannelId);
    dispatch(getMessages(selectedChannelId));
  }, [dispatch, selectedChannelId]);

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
