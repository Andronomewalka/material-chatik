import { Room } from "state/rooms";
import { User } from "state/user";

export interface ChannelState {
    selectedChannelId: string,
    isChannelsOpen: boolean
}

export interface ThunkChannelsResult {
    result: boolean
}

export interface ThunkConnectChannelResult {
    channel: User | Room
}