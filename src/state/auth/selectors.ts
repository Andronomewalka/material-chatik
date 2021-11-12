import { RootState } from "state/store";

export const selectEmail = (state: RootState) => state.auth.email;
export const selectIsSignedIn = (state: RootState) => state.auth.isSignedIn;
export const selectFetchStatus = (state: RootState) => state.auth.status;
export const selectError = (state: RootState) => state.auth.error;