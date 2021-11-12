import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkUserResult } from "./types";

export const getUser= createAsyncThunk<ThunkUserResult, string>
("user/getUser", async (email, { rejectWithValue }) => {
  try {

    const response: AxiosResponse<ThunkUserResult> = 
      await axios.get('http://127.0.0.1:4000/user');
    console.log(response);

    if (response.status < 200 || response.status >= 300)
      throw new Error(response.statusText);

    return response.data;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "get users fucked up");
  }
});