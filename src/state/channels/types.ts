import { BaseState } from "state/shared/baseState";
import { User } from 'state/user'
import { IdProp } from "utils/idProp";

export interface Channel extends User, IdProp {
    members: User[],
}

export interface ChannelState extends BaseState {
    channels: Channel[]
}

export interface ThunkChannelsResult {
    channels: Channel[]
}