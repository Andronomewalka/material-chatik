import { AxiosResponse } from "axios";
import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { ThunkChannelsResult, ThunkConnectChannelResult } from "./types";
import { User } from "state/user";
import apiClient from "utils/apiClient";
import { getConnectedUsers } from "state/connectedUsers";
import { getRooms } from "state/rooms";

export const getChannels = createAsyncThunk<ThunkChannelsResult>
("channels/getChannels", async (_, { dispatch, rejectWithValue }) => {
  try {

    await dispatch(getConnectedUsers());
    await dispatch(getRooms());
    return { result : true };

    // const response: AxiosResponse<ThunkChannelsResult> = 
    //   await apiClient.get('http://127.0.0.1:4000/channels');
    // console.log(response);

    // if (response.status < 200 || response.status >= 300)
    //   throw new Error(response.statusText);
      
    // return response.data;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "get channels fucked up");
  }
});


export const connectChannel = createAsyncThunk<ThunkConnectChannelResult, string>
("channels/connectChannel", async (channelName, { dispatch, rejectWithValue }) => {
  try {

    await dispatch(getConnectedUsers());
    
    return { channel : { 
      id: nanoid(),
      name: channelName,
      description: "some description", 
    } };

    // const response: AxiosResponse<ThunkChannelsResult> = 
    //   await apiClient.get('http://127.0.0.1:4000/channels');
    // console.log(response);

    // if (response.status < 200 || response.status >= 300)
    //   throw new Error(response.statusText);
      
    // return response.data;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "get channels fucked up");
  }
});