import { BaseState } from "state/shared/baseState";
import { User } from 'state/user'

export interface ConnectedUserstate extends BaseState {
    connectedUsers: User[]
}

export interface ThunkConnectedUsersResult {
    connectedUsers: User[]
}