
import { BaseState } from "state/shared/baseState";
import { ResponseBaseDTO } from "state/shared/responseBaseDTO";
import { User } from "state/user";
import { IdPropStrict } from "utils/idProp";

export enum MessageType {
    Send, Receive
}

export interface Message extends IdPropStrict {
    user: User,
    receiverId: number,
    type?: MessageType,
    dateUtc: string,
    timeUtc: string,
    text: string
}

export interface MessagesState extends BaseState {
    messages: Message[]
}

export interface GetMessagesResponseDTO extends ResponseBaseDTO {
    messages: Message[]
}

export interface SendMessageResponseDTO extends ResponseBaseDTO {
    message: Message
}

export interface SendMessageRequestDTO {
    channelId: number,
    message: string
}