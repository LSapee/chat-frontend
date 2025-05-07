
export interface ChatState {
    messages: Array<any>
    users: Array<any>
    rooms: Array<any>
    selectedUser: any
    selectedRoom: any
    isUsersLoading: boolean
    isMessagesLoading: boolean
    getUsers : () => void,
    getRooms : () => void,
    checkRoom : () => void,
    getMessages : (userId:string) => void,
    createOrJoinRoom:(userId:string)=>void,
    setSelectedUser : (selectedUser:any) => void,
    setSelectedRoom : (selectedRoom:any) => void,
    sendMessage : (messageData:any) => void,
    subscribeToMessages : () => void,
    unsubscribeFromMessage: () => void,
    unSetSelectedUser : (selectedUser:any) => void,
    unSetSelectedRoom : (selectedRoom:any) => void,
    deleteRoom : (selectedRoom:string) => void,
}