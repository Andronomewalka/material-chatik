import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "state/shared/requestStatus";
import { Room, RoomState } from "./types"
import * as thunks from './thunks'
import * as channelThunks from "state/channels"

const initialState: RoomState = {
    rooms: [],
    status: RequestStatus.Idle,
    error: ""
}

const roomsSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: { 
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
        builder.addCase(thunks.getRooms.rejected, (state, action) => {
            state.status = RequestStatus.Failed;
            state.error = action.payload as string;
        })

        builder.addCase(channelThunks.connectChannel.fulfilled, (state, action) => {
            const channel = action.payload.channel;
            const roomChannel = channel as Room;
            if (roomChannel !== undefined ) {
                state.rooms.push(roomChannel);
            }
        })
    }
})

//  export const { } = roomsSlice.actions;
export default roomsSlice.reducer;