import { HubConnectionState } from "@microsoft/signalr";
import { hub } from "utils/chatikHub";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { useSubscribe } from "utils/reMess";
import { addMessage } from "state/messages";
import { addChannel, selectChannelId } from "state/channels";

const useHubReceiver = () => {
  const dispatch = useAppDispatch();
  const selectedChannelId = useAppSelector(selectChannelId);

  const sendMessageSuccessCallback = (args: any) => {
    dispatch(addMessage(args.value));
  };

  const receiveMessageCallback = (args: any) => {
    if (selectedChannelId === args.value.receiverId) {
      dispatch(addMessage(args.value));
    }
  };

  const channelConnectedCallback = (args: any) => {
    dispatch(addChannel(args.value));
  };

  useSubscribe("HubConnectionStateChanged", (state: HubConnectionState) => {
    if (state === HubConnectionState.Connected) {
      hub.on("SendMessageSuccess", sendMessageSuccessCallback);
      hub.on("ReceiveMessage", receiveMessageCallback);
      hub.on("ChannelConnected", channelConnectedCallback);
    } else if (state === HubConnectionState.Disconnected) {
      hub.off("SendMessageSuccess", sendMessageSuccessCallback);
      hub.off("ReceiveMessage", receiveMessageCallback);
      hub.off("ChannelConnected", channelConnectedCallback);
    }
  });
};

export default useHubReceiver;
