import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
  GetMessagesResponseDTO, 
  Message
} from "./types";
import apiClient from "utils/apiClient";
import { ResponseError } from "utils/ResponseError";

export const getMessages = createAsyncThunk<Message[], number>
("messages/getMessages", async (channelId, { dispatch, rejectWithValue }) => {
  try {
    
    const response: AxiosResponse<GetMessagesResponseDTO> = 
      await apiClient.withRefresh(async () => 
        await apiClient.get(`http://127.0.0.1:4000/messages?channelId=${channelId}`));
    
    // console.log(response);

    if (response.status < 200 || response.status >= 300)
      throw new Error(response.statusText);

    else if (response.data.code < 200 || response.data.code >= 300)
      throw new ResponseError(response.data.code, response.data.error);

      if (response.data.messages.length > 0) {
        response.data.messages.forEach(message => {
          const messageDate = new Date(message.dateUtc);
          message.timeUtc = 
          messageDate.getHours().toString().padStart(2, '0')  + 
          ":" + 
          messageDate.getMinutes().toString().padStart(2, '0')
        });
      }

    return response.data.messages;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "get messages fucked up");
  }
});