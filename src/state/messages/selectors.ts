import { RootState } from "state/store";

export const selectMessages = (state: RootState) => state.messages.messages;
export const selectMessage = (id: number | string) => 
    (state: RootState) => state.messages.messages.find(cur => cur.id === id);
export const selectFetchStatus = (state: RootState) => state.messages.status;
export const selectError = (state: RootState) => state.messages.error;