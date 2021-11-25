import { Room } from "state/rooms";
import { BaseState } from "state/shared/baseState";
import { RequestStatus } from "state/shared/requestStatus";
import { ResponseBaseDTO } from "state/shared/responseBaseDTO";
import { User } from "state/user";

export interface Channel extends User {
    channelType: "User" | "Room"
}
export interface ChannelState extends BaseState {
    channels: Channel[],
    selectedChannelId: number,
    isChannelsOpen: boolean,
    connectChannelStatus: RequestStatus,
    connectChannelError : string
}

export interface GetChannelsResponseDTO extends ResponseBaseDTO {
    channels: Channel[]
}

export interface ConnectChannelResponseDTO extends ResponseBaseDTO {
    channel: Channel
}

export interface ThunkGetChannelsResult {
    channels: Channel[]
}

export interface ThunkConnectChannelResult {
    connectedChannel: Channel
}