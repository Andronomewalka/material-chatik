import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "state/shared/requestStatus";
import { RoomState } from "./types"
import * as thunks from './thunks'

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
    }
})

//  export const { } = roomsSlice.actions;
export default roomsSlice.reducer;