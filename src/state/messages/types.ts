import { BaseState } from "state/shared/baseState";
import { User } from "state/user";
import { IdProp } from "utils/idProp";

export interface Message extends IdProp {
    sender: User,
    receiver: User,
    dateUtc: string,
    text: string
}

export interface MessagesState extends BaseState {
    messages: Message[]
}

export interface ThunkMessagesResult {
    messages: Message[]
}