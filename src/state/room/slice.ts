import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "state/shared/requestStatus";
import { RoomState } from "./types"
import * as thunks from './thunks'
import { signOut } from "state/auth";
import { getChannel } from "state/channels"

const initialState: RoomState = {
    room: {
        id: 0,
        name: "",
        description: "",
        owner: {
            id: 0,
            name: "",
            description: ""
        },
        members: []
    },
    status: RequestStatus.Idle,
    error: ""
}

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // builder.addCase(getChannel.pending, (state) => {
        //     state.status = RequestStatus.Requesting;
        // })
        // builder.addCase(getChannel.fulfilled, (state, action) => {
        //     const room = action.payload as Room;
        //     if (room !== undefined) {
        //         state.room = room;
        //     }
        //     state.status = RequestStatus.Succeeded;
        // })
        // builder.addCase(getChannel.rejected, (state, action) => {
        //     state.status = RequestStatus.Failed;
        //     state.error = action.payload as string;
        // })

        builder.addCase(thunks.createRoom.pending, (state, action) => {
            state.status = RequestStatus.Requesting;
        })
        builder.addCase(thunks.createRoom.fulfilled, (state, action) => {
            const room = action.payload;
            state.room = room;
            state.status = RequestStatus.Succeeded;
        })
        builder.addCase(thunks.createRoom.rejected, (state, action) => {
            state.status = RequestStatus.Failed;
            state.error = action.payload as string;
        })
        
        builder.addCase(signOut.pending, () => {
            return initialState;
        })
    }
})

// export const {  } = roomsSlice.actions;
export default roomSlice.reducer;