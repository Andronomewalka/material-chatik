import { BaseState } from 'state/shared/baseState'
import { ResponseBaseDTO } from 'state/shared/responseBaseDTO';
import { IdPropStrict } from 'utils/idProp';

export interface User extends IdPropStrict {
    name: string,
    description?: string,
    imagePath?: string
}

export interface UserState extends BaseState {
    user: User
}

export interface GetUserResponseDTO extends ResponseBaseDTO {
    user: User
}