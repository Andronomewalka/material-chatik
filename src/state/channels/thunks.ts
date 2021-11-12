import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkChannelsResult } from "./types";
import { User } from "state/user";
import apiClient from "utils/apiClient";

export const getChannels = createAsyncThunk<ThunkChannelsResult, User>
("channels/getChannels", async (forUser, { rejectWithValue }) => {
  try {

    const response: AxiosResponse<ThunkChannelsResult> = 
      await apiClient.get('http://127.0.0.1:4000/channels');
    console.log(response);

    if (response.status < 200 || response.status >= 300)
      throw new Error(response.statusText);
      
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "get channels fucked up");
  }
});