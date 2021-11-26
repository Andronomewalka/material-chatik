import { RootState } from "state/store";

export const selectChannels = (state: RootState) => state.channels.channels;
export const selectChannelId = (state: RootState) => 
  state.channels.selectedChannelId;
export const selectFetchStatus = (state: RootState) =>  state.channels.status; 
export const selectError = (state: RootState) => state.channels.error;
export const selectDialogChannelStatus = (state: RootState) => 
 state.channels.dialogChannelStatus;
export const selectDialogChannelError = (state: RootState) => 
 state.channels.dialogChannelError;
export const selectIsChannelsOpen = (state: RootState) => 
  state.channels.isChannelsOpen;