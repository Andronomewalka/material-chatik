import { MessageProp } from "components/Message";

export interface ChatHistoryProp {
    messages: MessageProp[]
}

export interface ChatInputProp {
    onSubmit(text: string): void
}
