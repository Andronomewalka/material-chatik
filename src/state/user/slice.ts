import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "state/shared/requestStatus";
import { UserState } from "./types";
import * as thunks from './thunks'
import { signOut } from "state/auth";

const initialState: UserState = {
  user: {
		id: 0,
    name: "",
    description: "",
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
        const user = action.payload;
        state.user = user;
      })
      builder.addCase(thunks.getUser.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.payload as string;
      })

      builder.addCase(signOut.pending, () => {
        return initialState;
      })
  }
})

// export const { } = userSlice.actions;
export default userSlice.reducer;