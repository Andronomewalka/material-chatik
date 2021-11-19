import { BaseState } from "state/shared/baseState";
import { User } from "state/user";
import { IdPropStrict } from "utils/idProp";

export interface Message extends IdPropStrict {
    sender: User,
    receiverId: string,
    dateUtc: string,
    text: string
}

export interface MessagesState extends BaseState {
    messages: Message[]
}

export interface ThunkMessagesResult {
    messages: Message[]
}