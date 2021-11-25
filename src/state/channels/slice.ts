import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Channel, ChannelState } from "./types"
import * as thunks from "./thunks"
import { RequestStatus } from "state/shared/requestStatus";
import { signOut } from "state/auth";

const initialState: ChannelState = {
    channels: [],
    status: RequestStatus.Idle,
    error: "",
    selectedChannelId: -1,
    isChannelsOpen: true,
    connectChannelStatus: RequestStatus.Idle,
    connectChannelError: ""
}

const channelsSlice = createSlice({
    name: "channels",
    initialState,
    reducers: { 
        changeSelectedChannel(state, action: PayloadAction<number>) {
            const newSelectedChannelId = action.payload;
            state.selectedChannelId = newSelectedChannelId;
        },
        toggleIsChannelsOpen(state) {
            state.isChannelsOpen = !state.isChannelsOpen;
        },
        openChannels(state) {
            state.isChannelsOpen = true;
        },
        closeChannels(state) {
            state.isChannelsOpen = false;
        },
        changeConnectChannelError(state, action: PayloadAction<string>) {
            const error = action.payload;
            state.connectChannelError = error;
        },
        changeConnectChannelStatus(state, action: PayloadAction<RequestStatus>) {
            const status = action.payload;
            state.connectChannelStatus = status;
        },
        addChannel(state, action: PayloadAction<Channel>) {
            const channel = action.payload;
            state.channels.push(channel);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunks.getChannels.pending, (state, action) => {
            state.status = RequestStatus.Requesting;
            state.error = "";
        })
        builder.addCase(thunks.getChannels.fulfilled, (state, action) => {
            const channels = action.payload.channels;
            state.status = RequestStatus.Succeeded;
            state.error = "";
            state.channels = channels;
            if (channels.length > 0)
                state.selectedChannelId = channels[0].id;
        })
        builder.addCase(thunks.getChannels.rejected, (state, action) => {
            state.status = RequestStatus.Failed;
            state.error = action.payload as string;
        })

        builder.addCase(thunks.connectChannel.pending, (state, action) => {
            state.connectChannelStatus = RequestStatus.Requesting;
            state.connectChannelError = "";
        })
        builder.addCase(thunks.connectChannel.fulfilled, (state, action) => {
            const channel = action.payload.connectedChannel;
            state.connectChannelStatus = RequestStatus.Succeeded;
            state.connectChannelError = "";
            state.channels.push(channel)
        })
        builder.addCase(thunks.connectChannel.rejected, (state, action) => {
            state.connectChannelStatus = RequestStatus.Failed;
            state.connectChannelError = action.payload as string;
        })

        builder.addCase(signOut.pending, () => {
            return initialState;
        })
    }
})

export const { 
    changeSelectedChannel, 
    toggleIsChannelsOpen, 
    openChannels, 
    closeChannels, 
    changeConnectChannelError,
    changeConnectChannelStatus,
    addChannel
} = channelsSlice.actions;
export default channelsSlice.reducer;