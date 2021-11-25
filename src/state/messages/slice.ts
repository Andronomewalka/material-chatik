import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "state/shared/requestStatus";
import { Message, MessagesState, SendMessageResponseDTO } from "./types";
import * as thunks from './thunks'
import { signOut } from "state/auth"

const initialState: MessagesState = {
    messages: [],
    status: RequestStatus.Idle,
    error: ""
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage(state, action: PayloadAction<Message>) {
            const message = action.payload;
            state.messages.push(message);
        }
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

        builder.addCase(signOut.pending, () => {
            return initialState;
        })
    }
})

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;