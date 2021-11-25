import { createAsyncThunk } from "@reduxjs/toolkit";
import { sha256 } from 'js-sha256'
import { 
  AuthRequest, 
  AuthRequestDTO, 
  SignInResponseDTO, 
  SignUpResponseDTO, 
  ThunkSignInResult, 
  ThunkSignUpResult 
} from "./types";
import apiClient, { attachTokenToRequest } from "utils/apiClient";
import { AxiosResponse } from "axios";
import { parseJwt } from "utils/parseJwt";
import { ResponseError } from "utils/ResponseError";
import { hub } from "utils/chatikHub";
import { sendMessage } from "utils/reMess";

export const signIn = createAsyncThunk<ThunkSignInResult, AuthRequest>
("auth/signIn", async (authRequest, { rejectWithValue }) => {
  try {

    const requestDTO: AuthRequestDTO = {
      email: authRequest.email,
      hash: sha256(authRequest.password)
    }

    const response: AxiosResponse<SignInResponseDTO> =
      apiClient.wrapResponse(await apiClient.post("/auth/sign-in", requestDTO, {
         withCredentials: true 
        }));

    if (response.status < 200 || response.status >= 300)
      throw new Error(response.statusText);

    else if (response.data.code < 200 || response.data.code >= 300)
      throw new ResponseError(response.data.code, response.data.error);

    if (response.data.accessToken) {
      const token = response.data.accessToken;
      attachTokenToRequest(`Bearer ${token}`);
    }

    await hub.start();
    sendMessage('HubConnectionStateChanged', hub.state);
    return { email: authRequest.email }
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "signing in fucked up");
  }
});

export const refreshTokenSignIn = createAsyncThunk<ThunkSignInResult>
("auth/refreshTokenSignIn", async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<SignUpResponseDTO> = 
      apiClient.wrapResponse(await apiClient.refreshToken());
      
    if (response.status < 200 || response.status >= 300)
      throw new Error(response.statusText);

    else if (response.data.code < 200 || response.data.code >= 300)
      throw new ResponseError(response.data.code, response.data.error);
    
    const email = parseJwt(response.data.accessToken)['email']
    
    await hub.start();
    sendMessage('HubConnectionStateChanged', hub.state);
    return { email }
  } catch (err: any) {
    if (err instanceof ResponseError && err.code !== 9001) // refresh expired
        return rejectWithValue(err.message ?? "signing in through refresh fucked up");
    
    else 
      return rejectWithValue("");
  }
}); 

export const signUp = createAsyncThunk<ThunkSignUpResult, AuthRequest>
("auth/SignUp", async (authRequest, { rejectWithValue }) => {
  try {

    const requestDTO: AuthRequestDTO = {
      email: authRequest.email,
      hash: sha256(authRequest.password)
    }

    const response: AxiosResponse<SignUpResponseDTO> =
      apiClient.wrapResponse(await apiClient.post("/auth/sign-up", requestDTO, {
        withCredentials: true 
      }));

      console.log(response);

    if (response.status < 200 || response.status >= 300)
      throw new Error(response.statusText);

    else if (response.data.code < 200 || response.data.code >= 300)
      throw new ResponseError(response.data.code, response.data.error);

    if (!response.data.serverValidationError) {
      const token = response.data.accessToken;
      attachTokenToRequest(`Bearer ${token}`);
    }

    await hub.start();
    sendMessage('HubConnectionStateChanged', hub.state);
    return { 
      success: !response.data.serverValidationError,
      email: authRequest.email,
      serverValidationError: response.data.serverValidationError
    }
  } catch (err: any) {
    return rejectWithValue(err.message ?? "signing up fucked up");
  }
});


export const signOut = createAsyncThunk<ThunkSignInResult>
("auth/signOut", async (_, { rejectWithValue }) => {
  try {
    await apiClient.post("/auth/sign-out", { }, {
         withCredentials: true 
        });  

    await hub.stop();
    sendMessage('HubConnectionStateChanged', hub.state);
    attachTokenToRequest("");
    return { email: "" }
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "signing out fucked up");
  }
  finally {
    attachTokenToRequest("");
  }
});