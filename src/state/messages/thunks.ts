import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Message, ThunkMessagesResult } from "./types";
import apiClient from "utils/apiClient";


const fakeBorisMessages:Message[] = [
	{ 
    id: "message-1", 
    sender:{
      id: "000",
      name: "Boris",
      description: "some"
    },
    receiverId: "000",
    text: "Hello from Boris",
    dateUtc: new Date().toString()
  }];

  const fakeAndrewMessages:Message[] = [
    { 
      id: "message-2", 
      sender: { 
        id: "000",
        name: "Current user",
        description: "awesome"
      },
      receiverId: "222",
      text: "Hello Andrew",
      dateUtc: new Date().toString()
    }, 
    { 
      id: "message-3", 
      sender: { 
        id: "222",
        name: "Andrew",
        description: "another"
      },
      receiverId: "000",
      text: "Hi",
      dateUtc: new Date().toString()
    }, 
  ];

export const getMessages = createAsyncThunk<ThunkMessagesResult, string | number>
("messages/getMessages", async (channelId, { rejectWithValue }) => {
  try {

    if (channelId === "111")
      return { messages: fakeBorisMessages };

      else if (channelId === "222")
        return { messages: fakeAndrewMessages };
      
      else 
        return { messages: [] };

    // const response: AxiosResponse<ThunkMessagesResult> =
    //   await apiClient.withRefresh((async () => 
    //     await axios.get(`http://127.0.0.1:4000/messages?channel_id=${channelId}`)))
    
    // console.log(response);

    // if (response.status < 200 || response.status >= 300)
    //   throw new Error(response.statusText);

    // return response.data;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "get messages fucked up");
  }
});

export const sendMessage =  createAsyncThunk<Message, Message>
("messages/sendMessage", async (message, { rejectWithValue }) => {
  try {
    
    // const response: AxiosResponse<boolean> =
    //   await apiClient.withRefresh((async () => 
    //     await axios.post(`http://127.0.0.1:4000/messages/send`, message)))

    // console.log(response);

    // if (response.status < 200 || response.status >= 300)
    //   throw new Error(response.statusText);

    return message;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "get messages fucked up");
  }
});