import { RootState } from "state/store";

export const selectEmail = (state: RootState) => state.auth.email;
export const selectIsSignedIn = (state: RootState) => state.auth.isSignedIn;
export const selectFetchStatus = (state: RootState) => state.auth.status;
export const selectLayoutFetchStatus = (state: RootState) => state.auth.layoutStatus;
export const selectError = (state: RootState) => state.auth.error;