export enum MessageType {
    Send, Receive
}

export interface MessageProp {
    id: number | string,
    text: string,
    user: string,
    type: MessageType
}