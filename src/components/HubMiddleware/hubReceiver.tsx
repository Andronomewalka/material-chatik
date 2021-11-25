import { HubConnectionState } from "@microsoft/signalr";
import { useAppDispatch } from "hooks/useAppDispatch";
import { addMessage } from "state/messages";
import { addChannel } from "state/channels";
import { hub } from "utils/chatikHub";
import { useSubscribe } from "utils/reMess";

const useHubReceiver = () => {
  const dispatch = useAppDispatch();

  const sendMessageSuccessCallback = (args: any) => {
    dispatch(addMessage(args.value));
  };

  const receiveMessageCallback = (args: any) => {
    dispatch(addMessage(args.value));
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
