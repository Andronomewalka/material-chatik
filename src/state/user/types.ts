import { BaseState } from 'state/shared/baseState'

export interface User {
    name: string,
    imagePath: string
}

export interface UserState extends BaseState {
    user: User
}

export interface ThunkUserResult {
    user: User
}