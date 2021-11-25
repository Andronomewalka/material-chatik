import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "state/shared/requestStatus";
import { ConnectedUserstate } from "./types"
import { User } from "state/user";
import * as thunks from './thunks'
import * as authThunks from "state/auth/thunks"

const initialState: ConnectedUserstate = {
    connectedUsers: [],
    status: RequestStatus.Idle,
    error: ""
}

const roomsSlice = createSlice({
    name: "connectedUsers",
    initialState,
    reducers: { 
        connectUser(state, action: PayloadAction<User>) {
            const user = action.payload;
            state.connectedUsers.push(user)
        }
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

        builder.addCase(authThunks.signOut.pending, () => {
            return initialState;
        })
    }
})

export const { connectUser } = roomsSlice.actions;
export default roomsSlice.reducer;