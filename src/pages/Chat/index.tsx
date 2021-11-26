import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { selectChannelId } from "state/channels";
import { getMessages, selectMessages } from "state/messages";
import ChatInput from "components/Chat/ChatInput";
import ChatHistory from "components//Chat/ChatHistory";
import BoxContainer from "components/Common/BoxContainer";
import Channels from "components/Channels";
import { selectUser } from "state/user";
import { hub } from "utils/chatikHub";

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedChannelId = useAppSelector(selectChannelId);
  const user = useAppSelector(selectUser);
  const messages = useAppSelector(selectMessages);

  const onNewSendMessage = (text: string) => {
    hub.send("SendMessage", {
      channelId: selectedChannelId,
      message: text,
    });
  };

  useEffect(() => {
    if (selectedChannelId >= 0) {
      dispatch(getMessages(selectedChannelId));
    }
  }, [dispatch, selectedChannelId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        overflow: "hidden",
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
