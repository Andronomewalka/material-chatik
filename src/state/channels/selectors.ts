import { RequestStatus } from "state/shared/requestStatus";
import { RootState } from "state/store";

export const selectChannels = (state: RootState) =>
 [...state.connectedUsers.connectedUsers, ...state.rooms.rooms];

 export const selectFetchStatus = (state: RootState) => {
   
    if (state.connectedUsers.status === RequestStatus.Requesting || 
      state.rooms.status === RequestStatus.Requesting)
      return RequestStatus.Requesting;

    else if (state.connectedUsers.status === RequestStatus.Failed || 
      state.rooms.status === RequestStatus.Failed)
      return RequestStatus.Failed;

    else if (state.connectedUsers.status === RequestStatus.Succeeded && 
      state.rooms.status === RequestStatus.Succeeded)
      return RequestStatus.Succeeded;

    else if (state.connectedUsers.status === RequestStatus.Idle && 
      state.rooms.status === RequestStatus.Idle)
      return RequestStatus.Idle;
 };

export const selectError = (state: RootState) =>
  state.connectedUsers.error || state.rooms.error;

export const selectIsChannelsOpen = (state: RootState) => 
  state.channels.isChannelsOpen;