import { BaseState } from "state/shared/baseState";
import { User } from 'state/user'

export interface Room extends User {
    members: User[]
}

export interface RoomState extends BaseState {
    rooms: Room[]
}

export interface ThunkRoomsResult {
    rooms: Room[]
}

export interface ThunkConnectRoomResult {
    room: Room
}