
export interface ChatState {
    messages: Array<any>
    users: Array<any>
    selectedUser: any
    isUsersLoading: boolean
    isMessagesLoading: boolean
    getUsers : () => void,
    getMessages : (userId:string) => void,
    setSelectedUser : (selectedUser:any) => void,
    sendMessage : (messageData:any) => void,
    subscribeToMessages : () => void,
    unsubscribeFromMessage: () => void,
}