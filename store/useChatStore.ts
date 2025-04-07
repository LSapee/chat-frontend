import {create} from "zustand"
import { toast } from 'react-toastify';
import {axiosInstanace} from "@/lib/axios";
import {ChatState} from "@/interface/Chat.interface";
import {useAuthStore} from "@/store/useAuthStore";

export const useChatStore = create<ChatState>((set,get)=>({
    messages: [],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,

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

    getMessages:async (userId:string)=>{
        set({isMessagesLoading:true})
        try{
            const res = await axiosInstanace.get(`/messages/${userId}`);
            set({messages:res.data})
        }catch(err:any){
            toast.error(err.response.data.message)
        }finally {
            set({isMessagesLoading:false})
        }
    },
    sendMessage: async (messageData:any)=>{
        const {selectedUser, messages} = get();
        try{
            const res = await axiosInstanace.post(`/messages/send/${selectedUser._id}`,messageData);
            set({messages:[...messages,res.data]});
        }catch(err:any){
            toast.error(err.response.data.message)
        }
    },
    subscribeToMessages : () =>{
        const {selectedUser} = get();
        if(!selectedUser) return ;
        const socket = useAuthStore.getState().socket;
        socket.on('newMessage', (newMessage:any) => {
            const isMessageSentFromSelectedUser = newMessage.id === selectedUser.id;
            if(!isMessageSentFromSelectedUser)return;
            set({
                messages :[...get().messages,newMessage]
            })
        })
    },
    unsubscribeFromMessage : ()=>{
        const socket = useAuthStore.getState().socket;
        if(socket) socket.off('newMessage');
    },
    setSelectedUser : (selectedUser:any)=>set({selectedUser})

}))