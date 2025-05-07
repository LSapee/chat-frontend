import {create} from "zustand"
import { toast } from 'react-toastify';
import {axiosInstanace} from "@/lib/axios";
import {ChatState} from "@/interface/Chat.interface";
import {useAuthStore} from "@/store/useAuthStore";

export const useChatStore = create<ChatState>((set,get)=>({
    messages: [],
    users:[],
    rooms:[],
    selectedRoom:null,
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    //유저 목록 가져오기
    getUsers: async ()=>{
        set({isUsersLoading:true})
        try{
            const res = await axiosInstanace.get("/messages/users");
            set({users:res.data})
        }catch(err:any){
            toast.error(err.response.data.message)
        }finally {
            set({isUsersLoading:false})
        }
    },
    // 내가 참여중인 모든 방 가져오기
    getRooms: async () =>{
        try{
            const res = await axiosInstanace.get("/messages/rooms/all");
            set({rooms:res.data})
        }catch(e:any){
            toast.error(e.response.data.message)
        }
    },
    checkRoom: () =>{
        const room = localStorage.getItem("chat-room");
        if(room){
            const localRoom = JSON.parse(room);
            get().setSelectedRoom(localRoom);
        }
    },
    // 해당 방의 메시지 가져오기
    getMessages: async (roomId:string)=>{
        set({isMessagesLoading:true})
        try{
            const res = await axiosInstanace.get(`/messages/${roomId}`);
            set({messages:res.data})
        }catch(err:any){
            toast.error(err.response.data.message)
        }finally {
            set({isMessagesLoading:false})
        }
    },
    // 방 만들고 해당 방으로 참여하기
    createOrJoinRoom: async (userId:string) => {
        try{
            const res = await axiosInstanace.post(`/messages/create-or-join/${userId}`);
            const socket = useAuthStore.getState().socket;
            get().setSelectedRoom(res.data);
            socket.emit('joinRoom',res.data.roomID);
            // socket.on("joinRoom", (message: any) => {
            //     console.log("message : ",message);
            // })
        }catch(err:any){
            toast.error(err.response.data.message);
        }
    },
    // 메시지 보내기
    sendMessage: async (messageData:any)=>{
        const {selectedRoom, messages} = get();
        try{
            const roomId:string = selectedRoom.roomID;
            const res = await axiosInstanace.post(`/messages/send/${roomId}`,messageData);
            set({messages:[...messages,res.data]});
        }catch(err:any){
            toast.error(err.response.data.message)
        }
    },
    // 메시지 받는 함수
    subscribeToMessages : () =>{
        const {selectedRoom} = get();
        if(!selectedRoom) return ;
        const socket = useAuthStore.getState().socket;
        socket.on('newMessage', (newMessage:any) => {
            const isMessageSentFromSelectedRoom = newMessage.id === selectedRoom.roomId;
            if(!isMessageSentFromSelectedRoom)return;
            set({
                messages :[...get().messages,newMessage]
            })
        })
    },
    unsubscribeFromMessage : ()=>{
        const socket = useAuthStore.getState().socket;
        if(socket) socket.off('newMessage');
    },
    // 유저 선택시 이벤트
    setSelectedUser : (selectedUser:any)=> {
        set({selectedUser})
        if(typeof selectedUser._id === 'string'){
            if(get().selectedRoom===null)get().createOrJoinRoom(selectedUser._id);
        }
    },
    // 해당 채팅방 선택시 이벤트
    setSelectedRoom : (selectedRoom:any)=> {
        set({selectedRoom:selectedRoom})
        localStorage.setItem("chat-room",JSON.stringify(selectedRoom));
    },
    //유저 선택 취소
    unSetSelectedUser : (selectedUser:any) =>{
        set({selectedUser:null});
    },
    unSetSelectedRoom :(selectedRoom:any) =>{
        set({selectedRoom:null});
        localStorage.removeItem("chat-room");
    },
     deleteRoom: async(roomId:string)=>{
        try{
            const deletedRoom = await axiosInstanace.delete(`/messages/rooms/${roomId}`);
            if(deletedRoom.data.message === true) toast.success("Room deleted successfully");
        }catch (e:any){
            toast.error(e.response.data.message);
        }

    }
}))