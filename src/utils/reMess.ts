import { useEffect } from "react";

interface Message { 
    appMessage: string,
    callback: Function,
    priority: number
}

const messages: any = []

function internalSubscribe(appMessage: string, callback: Function, priority = -1) {
    // console.log('Messenger:: subscribe', appMessage)
    const newMessage: Message = { appMessage, callback, priority }
    if (priority !== -1) {
        const sameMessages = messages.filter((cur: Message) => cur.appMessage === appMessage && cur.priority !== -1)
        if (sameMessages?.length > 0) {
            const closestHigherPriority =
                    sameMessages.reduce((prev: Message, cur: Message) => {
                        const curDif = cur.priority - priority
                        const prevDif = prev.priority - priority
                        return curDif < prevDif && curDif >= 0 ? cur : prev
                    })

            messages.splice(messages.indexOf(closestHigherPriority) + 1, 0, newMessage)
        }
        else {
            messages.push(newMessage)
        }
    }
    else {
        messages.push(newMessage)
    }
}

function internalUnsubscribe(appMessage: string, callback: Function, priority = -1) {
    // console.log('Messenger:: unsubscribe', appMessage)
    const message = messages.find((cur: Message) => cur.appMessage === appMessage &&
        cur.callback === callback &&
        (priority === -1 || cur.priority === priority))

    if (message) {
        messages.splice(messages.indexOf(message), 1)
    }
}

export function sendMessage(appMessage: string, ...args: any[]) {
    // console.log('Messenger:: send', appMessage, args)
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].appMessage === appMessage &&
            typeof messages[i].callback === 'function') {
            messages[i].callback(...args)
        }
    }
}

export function useSubscribe(appMessage: string, callback: Function, priority = -1) {
    useEffect(() => {
        internalSubscribe(appMessage, callback, priority)
        return () => {
            internalUnsubscribe(appMessage, callback, priority)
        }
    }, [appMessage, callback, priority])
}