import { RootState } from "state/store";

export const selectChannels = (state: RootState) => state.channels.channels;
export const selectChannelId = (state: RootState) => 
  state.channels.selectedChannelId;
export const selectFetchStatus = (state: RootState) =>  state.channels.status; 
export const selectError = (state: RootState) => state.channels.error;
export const selectConnectChannelStatus = (state: RootState) => 
 state.channels.connectChannelStatus;
export const selectConnectChannelError = (state: RootState) => 
 state.channels.connectChannelError;
export const selectIsChannelsOpen = (state: RootState) => 
  state.channels.isChannelsOpen;