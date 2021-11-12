import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Message, ThunkMessagesResult } from "./types";
import { Channel } from "state/channels";

export const getMessages = createAsyncThunk<ThunkMessagesResult, Channel>
("messages/getMessages", async (forChannel, { rejectWithValue }) => {
  try {
    
    const response: AxiosResponse<ThunkMessagesResult> = 
      await axios.get('http://127.0.0.1:4000/channel/messages');
    console.log(response);

    if (response.status < 200 || response.status >= 300)
      throw new Error(response.statusText);

    return response.data;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "get messages fucked up");
  }
});