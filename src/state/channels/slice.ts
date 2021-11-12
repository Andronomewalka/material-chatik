import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "state/shared/requestStatus";
import { ChannelState } from "./types"
import * as thunks from './thunks'

const initialState: ChannelState = {
    channels: [],
    status: RequestStatus.Idle,
    error: ""
}

const channelsSlice = createSlice({
    name: "channels",
    initialState,
    reducers: { 
        
    },
    extraReducers: (builder) => {
        builder.addCase(thunks.getChannels.pending, (state, action) => {
            state.status = RequestStatus.Requesting;
        })
        builder.addCase(thunks.getChannels.fulfilled, (state, action) => {
            const result = action.payload;
            state.channels = result.channels;
            state.status = RequestStatus.Succeeded;
        })
        builder.addCase(thunks.getChannels.rejected, (state, action) => {
            state.status = RequestStatus.Failed;
            state.error = action.payload as string;
        })
    }
})

// export const { } = channelsSlice.actions;
export default channelsSlice.reducer;