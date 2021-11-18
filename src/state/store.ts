import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from 'state/auth'
import { userReducer } from 'state/user'
import { channelsReducer } from "state/channels";
import { roomsReducer } from "state/rooms";
import { connectedUsersReducer } from "state/connectedUsers";
import { messagesReducer } from 'state/messages';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    channels: channelsReducer,
    rooms: roomsReducer,
    connectedUsers: connectedUsersReducer,
    messages: messagesReducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;