import * as signalR from "@microsoft/signalr";
import { getTokenWithoutBearer } from "./apiClient";

export const hub = new signalR.HubConnectionBuilder()
    .withUrl("http://127.0.0.1:4000/chatik", { 
        accessTokenFactory: () => getTokenWithoutBearer(),
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
     })
    .build();