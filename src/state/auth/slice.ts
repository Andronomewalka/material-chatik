import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "state/shared/requestStatus";
import { AuthState } from './types'
import * as thunks from "./thunks";

const initialState : AuthState = {
  email: "",
  isSignedIn: false,
  status: RequestStatus.Idle,
  layoutStatus: RequestStatus.Idle,
  error: "",
};

const auhtSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeError(state, action: PayloadAction<string>) {
      const error = action.payload;
      state.error = error;
    },
    changeEmail(state, action:PayloadAction<string>) {
      const email = action.payload;
      state.email = email;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(thunks.signIn.pending, (state, action) => {
      state.status = RequestStatus.Requesting;
      state.error = "";
    });
    builder.addCase(thunks.signIn.fulfilled, (state, action) => {
      state.status = RequestStatus.Succeeded;
      state.email = action.payload;
      state.error = "";
      state.isSignedIn = true;
    });
    builder.addCase(thunks.signIn.rejected, (state, action) => {
      state.status = RequestStatus.Failed;
      state.error = action.payload as string;
    });

    builder.addCase(thunks.refreshTokenSignIn.pending, (state, action) => {
      state.layoutStatus = RequestStatus.Requesting;
      state.error = "";
    });
    builder.addCase(thunks.refreshTokenSignIn.fulfilled, (state, action) => {
      state.layoutStatus = RequestStatus.Succeeded;
      state.email = action.payload;
      state.error = "";
      state.isSignedIn = true;
    });
    builder.addCase(thunks.refreshTokenSignIn.rejected, (state, action) => {
      state.layoutStatus = RequestStatus.Failed;
      state.error = action.payload as string;
    });

    builder.addCase(thunks.signUp.pending, (state, action) => {
      state.status = RequestStatus.Requesting;
      state.error = "";
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
      state.layoutStatus = RequestStatus.Requesting;
      state.error = "";
    })
    builder.addCase(thunks.signOut.fulfilled, (state, action) => {
      state.layoutStatus = RequestStatus.Succeeded;
      state.email = "";
      state.error = "";
      state.isSignedIn = false;
    });
    builder.addCase(thunks.signOut.rejected, (state, action) => {
      state.layoutStatus = RequestStatus.Failed;
      state.email = "";
      state.error = action.payload as string;
      state.isSignedIn = false;
    });
  }
});

export const { changeError, changeEmail } = auhtSlice.actions;
export default auhtSlice.reducer;
