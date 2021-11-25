import { MessageType } from "state/messages";

export interface MessageProp {
    id: number | string,
    text: string,
    user: string,
    type: MessageType
}