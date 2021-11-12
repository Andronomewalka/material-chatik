import { RootState } from "state/store";

export const selectUser = (state: RootState) => state.user.user;
export const selectFetchStatus = (state: RootState) => state.user.status;
export const selectError = (state: RootState) => state.user.error;