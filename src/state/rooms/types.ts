import { BaseState } from "state/shared/baseState";
import { User } from 'state/user'
import { IdProp } from "utils/idProp";

export interface Room extends User, IdProp {
    members: User[]
}

export interface RoomState extends BaseState {
    rooms: Room[]
}

export interface ThunkRoomsResult {
    rooms: Room[]
}