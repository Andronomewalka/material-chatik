import { BaseState } from "state/shared/baseState";
import { ResponseBaseDTO } from "state/shared/responseBaseDTO";
import { User } from 'state/user'

export interface Room extends User {
    owner: User,
    members: User[]
}

export interface RoomState extends BaseState {
    room: Room
}

export interface CreateRoomRequestDTO {
    name: string,
    description: string
}

export interface RoomResponseDTO extends ResponseBaseDTO {
    room: Room
}