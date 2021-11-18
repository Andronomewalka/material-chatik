import { RootState } from "state/store";

export const selectRooms = (state: RootState) => state.rooms.rooms;
export const selectRoom = (id: number | string) => 
    (state: RootState) => state.rooms.rooms.find(cur => cur.id === id);
export const selectFetchStatus = (state: RootState) => state.rooms.status;
export const selectError = (state: RootState) => state.rooms.error;