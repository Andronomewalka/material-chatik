import { BaseState } from "state/shared/baseState";
import { RequestStatus } from "state/shared/requestStatus"
import { ResponseBaseDTO } from "state/shared/responseBaseDTO";

export interface AuthState extends BaseState {
    email: string,
    isSignedIn: boolean,
    layoutStatus: RequestStatus,
}

export interface AuthRequest {
    email: string,
    password: string,
}

export interface AuthRequestDTO {
    email: string,
    hash: string,
}

export interface SignInResponseDTO extends ResponseBaseDTO {
    accessToken: string,
}

export interface SignUpResponseDTO extends SignInResponseDTO {
    serverValidationError?: string
}

export interface ThunkSignUpResult {
    success: boolean,
    email: string,
    serverValidationError?: string
}