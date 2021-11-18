import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "state/shared/requestStatus";
import { ConnectedUserstate } from "./types"
import * as thunks from './thunks'

const initialState: ConnectedUserstate = {
    connectedUsers: [],
    status: RequestStatus.Idle,
    error: ""
}

const roomsSlice = createSlice({
    name: "connectedUsers",
    initialState,
    reducers: { 
    },
    extraReducers: (builder) => {
        builder.addCase(thunks.getConnectedUsers.pending, (state, action) => {
            state.status = RequestStatus.Requesting;
        })
        builder.addCase(thunks.getConnectedUsers.fulfilled, (state, action) => {
            const result = action.payload;
            state.connectedUsers = result.connectedUsers;
            state.status = RequestStatus.Succeeded;
        })
        builder.addCase(thunks.getConnectedUsers.rejected, (state, action) => {
            state.status = RequestStatus.Failed;
            state.error = action.payload as string;
        })
    }
})

//  export const { } = roomsSlice.actions;
export default roomsSlice.reducer;