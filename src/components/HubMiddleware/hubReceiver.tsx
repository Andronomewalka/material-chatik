import { hub } from "utils/chatikHub";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { addMessage } from "state/messages";
import {
  addChannel,
  changeTopChannel,
  selectChannelId,
  selectChannels,
} from "state/channels";
import { useCallback, useEffect } from "react";

const useHubReceiver = () => {
  const dispatch = useAppDispatch();
  const selectedChannelId = useAppSelector(selectChannelId);
  const channels = useAppSelector(selectChannels);

  const dispatchChangeTopChannel = useCallback(
    (channelId: number) => {
      console.log("dispatchChangeTopChannel", channelId);
      console.log("channels", channels);
      const newTopChannel = channels.find((cur) => cur.id === channelId);
      if (newTopChannel) {
        console.log("newTopChannel", newTopChannel);
        dispatch(changeTopChannel(newTopChannel.id));
      }
    },
    [channels, dispatch]
  );

  const sendMessageSuccessCallback = useCallback(
    (args: any) => {
      dispatch(addMessage(args.value));
      dispatchChangeTopChannel(args.value.receiverId);
    },
    [dispatch, dispatchChangeTopChannel]
  );

  const receiveMessageCallback = useCallback(
    (args: any) => {
      if (selectedChannelId === args.value.receiverId) {
        dispatch(addMessage(args.value));
      }
      dispatchChangeTopChannel(args.value.receiverId);
    },
    [dispatch, dispatchChangeTopChannel, selectedChannelId]
  );

  const channelConnectedCallback = useCallback(
    (args: any) => {
      dispatch(addChannel(args.value));
    },
    [dispatch]
  );

  useEffect(() => {
    hub.on("SendMessageSuccess", sendMessageSuccessCallback);
    hub.on("ReceiveMessage", receiveMessageCallback);
    hub.on("ChannelConnected", channelConnectedCallback);
    return () => {
      hub.off("SendMessageSuccess", sendMessageSuccessCallback);
      hub.off("ReceiveMessage", receiveMessageCallback);
      hub.off("ChannelConnected", channelConnectedCallback);
    };
  }, [
    channelConnectedCallback,
    receiveMessageCallback,
    sendMessageSuccessCallback,
  ]);
};

export default useHubReceiver;
