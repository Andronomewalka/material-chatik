import { BaseState } from 'state/shared/baseState'
import { IdProp } from 'utils/idProp';

export interface User extends IdProp {
    name: string,
    description?: string,
    imagePath?: string
}

export interface UserState extends BaseState {
    user: User
}

export interface ThunkUserResult {
    user: User
}