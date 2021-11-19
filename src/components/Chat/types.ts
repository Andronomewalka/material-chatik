import { Message } from "state/messages"

export interface ChatHistoryProp {
    messages: Message[]
}

export interface ChatInputProp {
    onSubmit(text: string): void
}
