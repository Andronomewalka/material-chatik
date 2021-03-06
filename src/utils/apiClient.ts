
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { SignInResponseDTO } from "state/auth";
const axios = require('axios');

const apiClient = (() => {
    const defaultOptions: AxiosRequestConfig<any> = {
        baseURL: "http://127.0.0.1:4000",
        headers: {
            "Content-Type": "application/json"
        }
    };

    return axios.create(defaultOptions)
})()

export const attachTokenToRequest = (token: string | null = null) => {
    apiClient.defaults.headers['Authorization'] = token;
}

export const getTokenWithoutBearer = () => {
    const accessToken: string = apiClient.defaults.headers['Authorization'];
    return accessToken.substr('Bearer '.length);
}

apiClient.refreshToken = async () => {
    try {
        const response: AxiosResponse<SignInResponseDTO> = 
            await apiClient.post("/auth/refresh-token", {}, {
                withCredentials: true 
            });

        const token = response.data.accessToken;
        attachTokenToRequest(`Bearer ${token}`);
        return response;
    }
    catch (err: any) {
        attachTokenToRequest("");
        return { 
            data: {
                code: 9001,
                error: "Bad Response"
            } 
        };
    }
}

apiClient.withRefresh = async (request: Function) => {
    try { 
        const response = await request();
        return apiClient.wrapResponse(response);
    }
    catch (err: any) {
        if (err?.response?.status === 401) {
            if (await apiClient.refreshToken()) {
                return await request();
            }
        }
    }
}

apiClient.wrapResponse = (response: any) => {
    if (!response.data)
    response.data = {};

    if (response.data.code === undefined)
        response.data.code = 200;
    
    if (response.data.error === undefined)
        response.data.error = "";
        
    return response;
}

export default apiClient;