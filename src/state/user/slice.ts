import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "state/shared/requestStatus";
import { UserState } from "./types";
import * as thunks from './thunks'

const initialState: UserState = {
    user: {
        name: "",
        imagePath: ""
    },
    status: RequestStatus.Idle,
    error: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(thunks.getUser.pending, (state, action) => {
            state.status = RequestStatus.Requesting;
        })
        builder.addCase(thunks.getUser.fulfilled, (state, action) => {
            state.status = RequestStatus.Succeeded;
            const result = action.payload;
            state.user = result.user;
        })
        builder.addCase(thunks.getUser.rejected, (state, action) => {
            state.status = RequestStatus.Failed;
            state.error = action.payload as string;
        })
    }
})

// export const { } = userSlice.actions;
export default userSlice.reducer;