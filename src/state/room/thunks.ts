import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateRoomRequestDTO, RoomResponseDTO, Room} from "./types";
import apiClient from "utils/apiClient";
import { ResponseError } from "utils/ResponseError";

export const createRoom = createAsyncThunk<Room, CreateRoomRequestDTO>
("room/createRoom", async (roomDTO, { rejectWithValue }) => {
  try {

    const response: AxiosResponse<RoomResponseDTO> = 
     await apiClient.withRefresh(async () =>
        await apiClient.post('http://127.0.0.1:4000/rooms', roomDTO));

    console.log(response);

    if (response.status < 200 || response.status >= 300)
      throw new Error(response.statusText);

    else if (response.data.code < 200 || response.data.code >= 300)
      throw new ResponseError(response.data.code, response.data.error);

    return response.data.room;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "get channels fucked up");
  }
});