'use Client'
import {useChatStore} from "@/store/useChatStore";
import {useEffect} from "react";
import SidebarSkeleton from "@/comporents/skeletons/SidebarSkeleton";
import {MessageSquare,X} from "lucide-react";
import {useAuthStore} from "@/store/useAuthStore";

const ChatRooms = () =>{
    const {getRooms, rooms, selectedRoom,setSelectedRoom,isUsersLoading,deleteRoom} = useChatStore();
    // 소켓 할때 보는것
    const {onlineUsers} = useAuthStore();
    useEffect(() => {
        getRooms();
    },[getRooms])
    if(isUsersLoading) return <SidebarSkeleton/>
    return (
        <aside className="h-full flex-1  lg:w-72 border-r border-base-300 flex flex-col transition-all durtion-200">
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <MessageSquare className ="2-6 h-6"/>
                    <span className="font-medium hidden lg:block">Chats</span>
                </div>
            </div>
            <div className="overflow-y-auto w-full py-3">
                {rooms.map((room:any)=>(
                    <button
                        key={room.roomID}
                        onClick={()=>setSelectedRoom(room)}
                        className={`
                    w-full p-3 flex items-center gap-3 hover:hb-base-300 transition-colors relative border-b border-base-300
                    ${selectedRoom?.roomID === room.roomID ? "bg-base-300 ring-1 rong-base-300":""}`}>
                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={room.receiverId[0].profilePic || "avatar.png"}
                                alt={room.receiverId[0].fullName}
                                className="size-12 object-cover rounded-full"
                            />
                            {/*온라인 유저 표시 일단 보류*/}
                            {onlineUsers.includes(room.receiverId[0]._id) && (
                                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"/>
                            )}

                        </div>
                        <div className="hidden lg:block text-left min-w-0 relative" >

                            <div className="font-medium truncate">{room.receiverId[0].fullName}</div>
                            <div className="text-sm text-zinc-400">
                                {room.lastMessage ? room.lastMessage : "" }
                            </div>

                        </div>
                        <X className="text-sm text-zinc-400 hover:text-black absolute mt-auto right-5"
                            onClick={e => {
                                e.stopPropagation();
                                deleteRoom(room.roomID);
                                getRooms();
                            }}
                        />
                    </button>
                ))}
            </div>
        </aside>
    )
}
export default ChatRooms;