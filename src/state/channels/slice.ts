import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Channel, ChannelState, ChannelType } from "./types"
import * as thunks from "./thunks"
import { RequestStatus } from "state/shared/requestStatus";
import { signOut } from "state/auth";
import { createRoom } from "state/room"
import { User } from "state/user";

const initialState: ChannelState = {
    channels: [],
    status: RequestStatus.Idle,
    error: "",
    selectedChannelId: -1,
    isChannelsOpen: true,
    dialogChannelStatus: RequestStatus.Idle,
    dialogChannelError: ""
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
        changeDialogChannelStatus(state, action: PayloadAction<RequestStatus>) {
            const status = action.payload;
            state.dialogChannelStatus = status;
        },
        changeDialogChannelError(state, action: PayloadAction<string>) {
            const error = action.payload;
            state.dialogChannelError = error;
        },
        addChannel(state, action: PayloadAction<Channel>) {
            const channel = action.payload;
            state.channels.push(channel);
            state.selectedChannelId = channel.id;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunks.getChannels.pending, (state, action) => {
            state.status = RequestStatus.Requesting;
            state.error = "";
        })
        builder.addCase(thunks.getChannels.fulfilled, (state, action) => {
            const channels = action.payload;
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
            state.dialogChannelStatus = RequestStatus.Requesting;
            state.dialogChannelError = "";
        })
        builder.addCase(thunks.connectChannel.fulfilled, (state, action) => {
            const channel = action.payload;
            state.dialogChannelStatus = RequestStatus.Succeeded;
            state.dialogChannelError = "";
            state.channels.push(channel);
            state.selectedChannelId = channel.id;
        })
        builder.addCase(thunks.connectChannel.rejected, (state, action) => {
            state.dialogChannelStatus = RequestStatus.Failed;
            state.dialogChannelError = action.payload as string;
        })

        builder.addCase(createRoom.fulfilled, (state, action) => {
            const channel = action.payload;
            state.dialogChannelStatus = RequestStatus.Succeeded;
            state.dialogChannelError = "";
            state.channels.push({...channel, type: ChannelType.Room})
            state.selectedChannelId = channel.id;
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
    changeDialogChannelStatus,
    changeDialogChannelError,
    addChannel
} = channelsSlice.actions;
export default channelsSlice.reducer;