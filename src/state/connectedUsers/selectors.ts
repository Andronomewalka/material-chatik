import { RootState } from "state/store";

export const selectConnectedUsers = (state: RootState) => state.connectedUsers.connectedUsers;
export const selectConnectedUser = (id: number | string) => 
    (state: RootState) => state.connectedUsers.connectedUsers.find(cur => cur.id === id);
export const selectFetchStatus = (state: RootState) => state.connectedUsers.status;
export const selectError = (state: RootState) => state.connectedUsers.error;