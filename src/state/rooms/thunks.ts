import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Room, ThunkRoomsResult } from "./types";
import { User } from "state/user";
import apiClient from "utils/apiClient";

const fakeRooms:Room[] = [
	{ 
		id: "333",
    name: "dev room 1",
    members: [
			{ 
				id: "111",
				name: "Vasiliy",
				description: "Java",
			},
			{ 
				id: "222",
				name: "Maksim",
				description: "Perl",
			}
    ]
  }
]

export const getRooms = createAsyncThunk<ThunkRoomsResult>
("rooms/getRooms", async (_, { rejectWithValue }) => {
  try {
		await new Promise(resolve => setTimeout(resolve, 2000));
		const response = apiClient.wrapResponse({ data: fakeRooms });
    return { rooms: response.data };

    // const response: AxiosResponse<ThunkRoomsResult> =
    //   apiClient.wrapResponse(await apiClient.get("/rooms"));

    // console.log(response);

    // if (response.status < 200 || response.status >= 300)
    //   throw new Error(response.statusText);
      
    // return response.data;
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "get channels fucked up");
  }
});