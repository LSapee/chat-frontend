import {useChatStore} from "@/store/useChatStore";
import {useAuthStore} from "@/store/useAuthStore";
import {X} from "lucide-react"
// 채팅시 위에 나오는 헤더
export default function ChatHeader(){
    const {selectedRoom,unSetSelectedRoom} = useChatStore();

    const {onlineUsers} = useAuthStore();

    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="avatar relative">
                        <div className="size-10 rounded-full relative">
                            <img src={selectedRoom.receiverId[0].profilePic  ||"avatar.png"} alt={selectedRoom.receiverId[0].fullName}/>
                        </div>
                        {onlineUsers.includes(selectedRoom.receiverId[0]._id) ?
                            <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full "/>
                            : ""}
                    </div>
                    <div>
                        <h3 className="font-medium">{selectedRoom.receiverId[0].fullName}</h3>
                        <p className="text-sm text-base-content/70">

                        </p>
                    </div>
                </div>
                <button onClick={() => unSetSelectedRoom(null)}>
                    <X />
                </button>
            </div>
        </div>
    )
}