import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "state/shared/requestStatus";
import { Room, RoomState } from "./types"
import * as thunks from './thunks'
import { signOut } from "state/auth";

const initialState: RoomState = {
    rooms: [],
    status: RequestStatus.Idle,
    error: ""
}

const roomsSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        connectRoom(state, action: PayloadAction<Room>) {
            const room = action.payload;
            state.rooms.push(room)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunks.getRooms.pending, (state, action) => {
            state.status = RequestStatus.Requesting;
        })
        builder.addCase(thunks.getRooms.fulfilled, (state, action) => {
            const result = action.payload;
            state.rooms = result.rooms;
            state.status = RequestStatus.Succeeded;
        })
        
        builder.addCase(signOut.pending, () => {
            return initialState;
        })
    }
})

export const { connectRoom } = roomsSlice.actions;
export default roomsSlice.reducer;