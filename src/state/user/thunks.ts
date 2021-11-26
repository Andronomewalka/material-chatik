import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetUserResponseDTO, User } from "./types";
import apiClient from "utils/apiClient";
import { ResponseError } from "utils/ResponseError";

export const getUser= createAsyncThunk<User, string>
("user/getUser", async (email, { rejectWithValue }) => {
  try {

    const response: AxiosResponse<GetUserResponseDTO> = 
    await apiClient.withRefresh(async () => 
      await apiClient.get('http://127.0.0.1:4000/user'));

  if (response.status < 200 || response.status >= 300)
    throw new Error(response.statusText);

    else if (response.data.code < 200 || response.data.code >= 300)
      throw new ResponseError(response.data.code, response.data.error);

    return response.data.user;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "get users fucked up");
  }
});