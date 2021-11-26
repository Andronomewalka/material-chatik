import { RootState } from "state/store";

export const selectRoom = (state: RootState) => state.room.room;
export const selectRoomOwner = (state: RootState) => state.room.room.owner;
export const selectRoomMembers = (state: RootState) => state.room.room.members;
export const selectFetchStatus = (state: RootState) => state.room.status;
export const selectError = (state: RootState) => state.room.error;