import {create} from "zustand"
import {axiosInstanace} from "@/lib/axios";
import { toast } from 'react-toastify';
import {AuthState} from "@/interface/Auth.interface";
import {io} from "socket.io-client";

const BASE_URL = "https://chatapi.lsapee.com/chat"

export const useAuthStore = create<AuthState>((set,get)=>({
    authUser:null,
    isSigningUp :false,
    isLoggingIn:false,
    isUpdatingIng:false,
    isCheckingAuth:true,
    isUpdatingProfile:false,
    onlineUsers:[],
    socket:null,

    checkAuth: async ():Promise<void>=>{
        try{
            const res = await axiosInstanace.get("/auth/check");
            set({authUser:res.data});
            get().connectSocket();
        }catch (error){
            set({authUser:null});
        }finally{
            set({isCheckingAuth:false}); 
        }
    },
    signup: async (data:any):Promise<void>=>{
        set({isSigningUp:true});
        try{
            const res = await axiosInstanace.post("/auth/signup",data);
            set({authUser:res.data});
            toast.success("축하드립니다. 회원가입에 성공하였습니다.");
            get().connectSocket();
        }catch (error:any){
            toast.error(`회원가입 실패: ${error.response.data.message}`);
        } finally{
            set({isSigningUp:false});
        }
    },
    login: async (data:any):Promise<void>=>{
        set({isLoggingIn:true});
        try{
            const res = await axiosInstanace.post("/auth/login",data);
            set({authUser:res.data});
            toast.success("로그인 완료");
            get().connectSocket();
        }catch (error:any){
            toast.error(`로그인 실패 : ${error.response.data.message}`);
        }finally{
            set({isLoggingIn:false});
        }

    },
    logout: async ():Promise<void>=>{
        try{
            await axiosInstanace.post("/auth/logout");
            set({authUser:null});
            toast.success("로그아웃 되었습니다.")
            get().disconnectSocket();
        }catch (error:any){
            toast.error("로그아웃 실패",error.response.data.message);
        }
    },
    updateProfile: async (data:any):Promise<void>=>{
        set({isUpdatingProfile:true});
        try{
            const res = await axiosInstanace.put("/auth/update-profile",data);
            set({authUser:res.data});
            toast.success("프로필이 업데이트 되었습니다.");
        }catch (error:any){
            toast.error("프로필 업데이트 실패 ",error.response.data.message);
        }finally {
            set({isUpdatingProfile:false});
        }
    },
    connectSocket: ():void =>{
        const {authUser} = get();
        if(!authUser || get().socket?.connected)return ;
        //소켓 백엔드 연결
        const socket = io(BASE_URL,{
            query:{
                userId: authUser._id
            }
        });
        socket.connect();
        set({socket:socket});
        socket.emit("allRoomConnected");
        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds});
        });
    },
    disconnectSocket:():void=>{
        if(get().socket?.connected) {
            get().socket.disconnect();

        }
    },
}));