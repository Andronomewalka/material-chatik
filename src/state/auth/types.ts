import { RequestStatus } from "state/shared/requestStatus"
import { ResponseBaseDTO } from "state/shared/responseBaseDTO";

export interface AuthState {
    email: string,
    isSignedIn: boolean,
    status: RequestStatus,
    error: string,
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

export interface ThunkSignInResult {
    email: string,
}

export interface ThunkSignUpResult extends ThunkSignInResult {
    success: boolean,
    serverValidationError?: string
}