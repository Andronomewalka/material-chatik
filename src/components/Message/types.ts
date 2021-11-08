export enum MessageType {
    Send, Receive
}

export interface MessageProp {
    text: string,
    user: string,
    type: MessageType
}