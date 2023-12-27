export interface MessageInterface {
    type: "join" | "message",
    payload: {
        message: string,
        room: string
    }
}

