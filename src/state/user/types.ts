import { BaseState } from 'state/shared/baseState'
import { IdPropStrict } from 'utils/idProp';

export interface User extends IdPropStrict {
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