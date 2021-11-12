import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "state/shared/requestStatus";
import { AuthState } from './types'
import * as thunks from "./thunks";

const initialState : AuthState = {
  email: "",
  isSignedIn: false,
  status: RequestStatus.Idle,
  error: "",
};

const auhtSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(thunks.signIn.pending, (state, action) => {
      state.status = RequestStatus.Requesting;
    });
    builder.addCase(thunks.signIn.fulfilled, (state, action) => {
      state.status = RequestStatus.Succeeded;
      state.email = action.payload.email;
      state.error = "";
      state.isSignedIn = true;
    });
    builder.addCase(thunks.signIn.rejected, (state, action) => {
      state.status = RequestStatus.Failed;
      state.error = action.payload as string;
    });

    builder.addCase(thunks.signUp.pending, (state, action) => {
      state.status = RequestStatus.Requesting;
    });
    builder.addCase(thunks.signUp.fulfilled, (state, action) => {
      state.status = RequestStatus.Succeeded;
      const result = action.payload;
      state.email = result.email;
      if (result.success) {
        state.error = "";
        state.isSignedIn = true;
      } else {
        state.error = result.serverValidationError ?? "";
      }
    });
    builder.addCase(thunks.signUp.rejected, (state, action) => {
      state.status = RequestStatus.Failed;
      state.error = action.payload as string;
    });

    builder.addCase(thunks.signOut.pending, (state, action) => {
      state.status = RequestStatus.Requesting;
    })
    builder.addCase(thunks.signOut.fulfilled, (state, action) => {
      state.status = RequestStatus.Succeeded;
      state.email = "";
      state.isSignedIn = false;
    });
    builder.addCase(thunks.signOut.rejected, (state, action) => {
      state.status = RequestStatus.Failed;
      state.email = "";
      state.isSignedIn = false;
      state.error = action.payload as string;
    });
  }
});

// export const { errorChanged, signOut } = auhtSlice.actions;

export default auhtSlice.reducer;
