import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "state/shared/requestStatus";
import { ConnectedUserstate } from "./types"
import * as thunks from './thunks'
import * as channelThunks from "state/channels"
import { User } from "state/user";

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

        builder.addCase(channelThunks.connectChannel.fulfilled, (state, action) => {
            const channel = action.payload.channel;
            const userChannel = channel as User;
            if (userChannel !== undefined ) {
                state.connectedUsers.push(userChannel);
            }
        })
    }
})

//  export const { } = roomsSlice.actions;
export default roomsSlice.reducer;