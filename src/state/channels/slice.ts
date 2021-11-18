import { createSlice } from "@reduxjs/toolkit";
import { ChannelState } from "./types"

const initialState: ChannelState = {
    isChannelsOpen: true,
}

const channelsSlice = createSlice({
    name: "channels",
    initialState,
    reducers: { 
        toggleIsChannelsOpen(state) {
            state.isChannelsOpen = !state.isChannelsOpen;
        },
        openChannels(state) {
            state.isChannelsOpen = true;
        },
        closeChannels(state) {
            state.isChannelsOpen = false;
        }
    }
})

export const { toggleIsChannelsOpen, openChannels, closeChannels } = channelsSlice.actions;
export default channelsSlice.reducer;