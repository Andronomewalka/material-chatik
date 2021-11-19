import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConnectedUsersResult } from "./types";
import { User } from "state/user";
import apiClient from "utils/apiClient";

const fakeUsers:User[] = [
	{ 
		id: "111",
    name: "Boris",
    description: "some"
  },
  { 
		id: "222",
    name: "Andrew",
    description: "another"
  },
]

export const getConnectedUsers = createAsyncThunk<ThunkConnectedUsersResult>
("connectedUsers/getConnectedUsers", async (_, { rejectWithValue }) => {
  try {
		await new Promise(resolve => setTimeout(resolve, 2000));
		const response = apiClient.wrapResponse({ data: fakeUsers });
    return { connectedUsers: response.data };

    // const response: AxiosResponse<ThunkRoomsResult> =
    //   apiClient.wrapResponse(await apiClient.get("/users"));

    // console.log(response);

    // if (response.status < 200 || response.status >= 300)
    //   throw new Error(response.statusText);
      
    // return response.data;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "get connected users fucked up");
  }
});