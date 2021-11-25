import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
  GetMessagesResponseDTO, 
  SendMessageRequestDTO, 
  SendMessageResponseDTO, 
  ThunkGetMessagesResult, 
  ThunkSendMessageResult 
} from "./types";
import apiClient from "utils/apiClient";
import { ResponseError } from "utils/ResponseError";
import { hub } from "utils/chatikHub";

export const getMessages = createAsyncThunk<ThunkGetMessagesResult, number>
("messages/getMessages", async (channelId, { rejectWithValue }) => {
  try {
    
    const response: AxiosResponse<GetMessagesResponseDTO> = 
      await apiClient.withRefresh(async () => 
        await apiClient.get(`http://127.0.0.1:4000/messages?channelId=${channelId}`));
    
    // console.log(response);

    if (response.status < 200 || response.status >= 300)
      throw new Error(response.statusText);

    else if (response.data.code < 200 || response.data.code >= 300)
      throw new ResponseError(response.data.code, response.data.error);

    return { messages: response.data.messages }
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "get messages fucked up");
  }
});