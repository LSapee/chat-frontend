'use Client'
import {useChatStore} from "@/store/useChatStore";
import {useEffect, useState} from "react";
import SidebarSkeleton from "@/comporents/skeletons/SidebarSkeleton";
import {Users} from "lucide-react";
import {useAuthStore} from "@/store/useAuthStore";

const UsersList = () =>{
    const {getUsers, users, selectedUser,setSelectedUser,isUsersLoading} = useChatStore();
    // 소켓 할때 보는것
    const {onlineUsers} = useAuthStore();
    const [showOnline, setShowOnline] = useState<boolean>(false);
    useEffect(() => {
        getUsers();
    },[getUsers])
    const filteredUsers = showOnline ? users.filter((user) => onlineUsers.includes(user._id)) :users;
    if(isUsersLoading) return <SidebarSkeleton/>
    return (
        <aside className="h-full flex-1  lg:w-72 border-r border-base-300 flex flex-col transition-all durtion-200">
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                <Users className ="2-6 h-6"/>
                <span className="font-medium hidden lg:block">유저</span>
            </div>
                 {/*fillter*/}
                <div className="mt-3 hidden lg:flex items-center gap-2">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOnline}
                            onChange={(e)=>setShowOnline(e.target.checked)}
                            className="checkbox checkbox-sm"
                        />
                        <span className="text-sm">현재 접속중인 유저 보기</span>
                    </label>
                    <span className="text-xs text-zinc-500">({onlineUsers.length-1 } 접속중)</span>
                </div>
            </div>
            <div className="overflow-y-auto w-full py-3">
                {filteredUsers.map((user:any)=>(
                    <button
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className={`
                    w-full p-3 flex items-center gap-3 hover:hb-base-300 transition-colors
                    ${selectedUser?._id ===user._id ? "bg-base-300 ring-1 rong-base-300":""}`}>
                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={user.profilePic || "avatar.png"}
                                alt={user.name}
                                className="size-12 object-cover rounded-full"
                            />
                            {onlineUsers.includes(user._id) && (
                                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"/>
                            )}
                        </div>
                        <div className="hidden lg:block text-left min-w-0">
                            <div className="font-medium truncate">{user.fullName}</div>
                            <div className="text-sm text-zinc-400">
                                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                            </div>
                        </div>
                    </button>
                ))}
                {filteredUsers.length === 0 &&(
                    <div className="text-center text-zinc-500 py-4">현재 접속중인 유저가 없습니다.</div>
                )}
            </div>
        </aside>
    )
}
export default UsersList;