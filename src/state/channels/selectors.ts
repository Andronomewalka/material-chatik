import { RootState } from "state/store";

export const selectChannels = (state: RootState) => state.channels.channels;
export const selectChannel = (id: number | string) => 
    (state: RootState) => state.channels.channels.find(cur => cur.id === id);
export const selectFetchStatus = (state: RootState) => state.channels.status;
export const selectError = (state: RootState) => state.channels.error;