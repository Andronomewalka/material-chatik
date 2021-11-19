import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChannelState } from "./types"
import * as thunks from "./thunks"

const initialState: ChannelState = {
    selectedChannelId: "-1",
    isChannelsOpen: true,
}

const channelsSlice = createSlice({
    name: "channels",
    initialState,
    reducers: { 
        changeSelectedChannel(state, action: PayloadAction<string>) {
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunks.getChannels.fulfilled, (state, action) => {
            state.selectedChannelId = "0";
        })
    }
})

export const { toggleIsChannelsOpen, openChannels, closeChannels, changeSelectedChannel } = channelsSlice.actions;
export default channelsSlice.reducer;