import { RequestStatus } from "./requestStatus";

export interface BaseState {
    status: RequestStatus,
    error: string
}