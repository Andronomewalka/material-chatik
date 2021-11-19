import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "state/shared/requestStatus";
import { MessagesState } from "./types";
import * as thunks from './thunks'

const initialState: MessagesState = {
    messages: [],
    status: RequestStatus.Idle,
    error: ""
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(thunks.getMessages.pending, (state, action) => {
            state.status = RequestStatus.Requesting;
        })
        builder.addCase(thunks.getMessages.fulfilled, (state, action) => {
            state.status = RequestStatus.Succeeded;
            const result = action.payload;
            state.messages = result.messages;
        })
        builder.addCase(thunks.getMessages.rejected, (state, action) => {
            state.status = RequestStatus.Failed;
            state.error = action.payload as string;
        })

        builder.addCase(thunks.sendMessage.fulfilled, (state, action) => {
            const message = action.payload;
            state.messages.push(message);
        })
    }
})

// export const { } = messagesSlice.actions;
export default messagesSlice.reducer;