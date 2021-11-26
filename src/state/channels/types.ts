import { BaseState } from "state/shared/baseState";
import { RequestStatus } from "state/shared/requestStatus";
import { ResponseBaseDTO } from "state/shared/responseBaseDTO";
import { User } from "state/user";
import { Room } from "state/room";

export enum ChannelType {
    User = 0, Room = 1
}

export interface Channel extends User {
    type: ChannelType
}
export interface ChannelState extends BaseState {
    channels: Channel[],
    selectedChannelId: number,
    isChannelsOpen: boolean,
    dialogChannelStatus: RequestStatus,
    dialogChannelError : string
}

export interface GetChannelsResponseDTO extends ResponseBaseDTO {
    channels: Channel[]
}

export interface ConnectChannelResponseDTO extends ResponseBaseDTO {
    channel: Channel
}

export interface GetChannelResponseDTO extends ResponseBaseDTO {
    channelInfo: Room | User
}