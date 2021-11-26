import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
  GetChannelsResponseDTO, 
  ConnectChannelResponseDTO, 
  Channel,
  GetChannelResponseDTO
} from "./types";
import apiClient from "utils/apiClient";
import { ResponseError } from "utils/ResponseError";
import { Room } from "state/room";
import { User } from "state/user";

export const getChannels = createAsyncThunk<Channel[]>
("channels/getChannels", async (_, { rejectWithValue }) => {
  try {

    const response: AxiosResponse<GetChannelsResponseDTO> = 
      await apiClient.withRefresh(async () => 
        await apiClient.get('http://127.0.0.1:4000/channels'));

    if (response.status < 200 || response.status >= 300)
      throw new Error(response.statusText);

      else if (response.data.code < 200 || response.data.code >= 300)
        throw new ResponseError(response.data.code, response.data.error);
      
    return response.data.channels;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "get channels fucked up");
  }
});

export const getChannel = createAsyncThunk<Room | User, number>
("channels/getChannel", async (channelId, { rejectWithValue }) => {
  try {
    
    const response: AxiosResponse<GetChannelResponseDTO> = 
      await apiClient.withRefresh(async () => 
        await apiClient.get(`http://127.0.0.1:4000/channels/${channelId}`));
    
    // console.log(response);

    if (response.status < 200 || response.status >= 300)
      throw new Error(response.statusText);

    else if (response.data.code < 200 || response.data.code >= 300)
      throw new ResponseError(response.data.code, response.data.error);

    return response.data.channelInfo;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "get channel info fucked up");
  }
});


export const connectChannel = createAsyncThunk<Channel, string>
("channels/connectChannel", async (channelName, { rejectWithValue }) => {
  try {

    const response: AxiosResponse<ConnectChannelResponseDTO> = 
     await apiClient.withRefresh(async () =>
        await apiClient.post('http://127.0.0.1:4000/channels/connect', channelName));

    console.log(response);
    if (response.status < 200 || response.status >= 300)
      throw new Error(response.statusText);

    else if (response.data.code < 200 || response.data.code >= 300)
      throw new ResponseError(response.data.code, response.data.error);
      
    return response.data.channel;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "get channels fucked up");
  }
});