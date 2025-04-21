'use client'

import {useChatStore} from "@/store/useChatStore";
import {useEffect, useRef} from "react";
import ChatHeader from "@/comporents/ChatHeader";
import MessageInput from "@/comporents/MessageInput";
import MessageSkeleton from "@/comporents/skeletons/MessageSkeleton";
import {useAuthStore} from "@/store/useAuthStore";
import {formatMessageTime} from "@/lib/utils";

const ChatContainer = () =>{
    const {messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessage } = useChatStore();
    const {authUser} = useAuthStore();
    const messageEndRef:any = useRef(null);

    const LinkinMessage = (message:string) => {
        let messageArr:string[] = message.split(" ");
        // 링크가 http:// 시작하는 경우 또느 https:// 시작하는경우.
        // 카카오톡 확인 해보니 링크 전 문장 + 링크 + 링크 후의 문장을 띄어쓰기로 구분하고 있기에 띄어쓰기로 링크 구분
        let urlStartIndex:number = message.indexOf("http://") == -1 ? message.indexOf("https://") : message.indexOf("http://");
        const firstMessage:string = message.substring(0,urlStartIndex );
        let urlNxt:number = message.length;
        messageArr.forEach((index) => {
            if(message.indexOf(index)>urlStartIndex) urlNxt=message.indexOf(index);
        })
        let url:string = message.substring(urlStartIndex,urlNxt);
        let lastMessage:string = message.substring(urlNxt,message.length);
        return (
            <>
                <span>{firstMessage}</span>
                <a href={url} target=" _blank" className="link-primary">{url}</a>
                <span>{lastMessage}</span>
            </>
        )
    }

    useEffect(()=>{
       getMessages(selectedUser._id);
       subscribeToMessages();
       return () => unsubscribeFromMessage();
    },[selectedUser._id,getMessages,subscribeToMessages,unsubscribeFromMessage]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if(isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader/>
                <MessageSkeleton/>
                <MessageInput/>
            </div>
        )
    }
    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader/>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div key={message._id}
                    className={`chat ${message.senderId ===authUser._id ? "chat-end" : "chat-start"}`}
                    ref={messageEndRef}
                    >
                        <div className="chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img
                                    src={message.senderId === authUser._id ? authUser.profilePic ||"/avatar.png" : selectedUser.profilePic||"/avatar.png"}
                                    alt="profilePic"
                                />
                            </div>
                        </div>
                        <div className="chat-header mb-1">
                            <time className="text-xs opacity-50 ml-1">
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>
                        <div className="chat-bubble flex flex-col">
                            {message.imageUrl &&(
                                <img src={message.imageUrl}
                                alt="Attachment"
                             className="sm:max-w-[200px] rounded-md mb-2"
                                />
                            )}
                            {message.text &&
                                <p>
                                    {message.text.includes("http") || message.text.includes("https") ?
                                        LinkinMessage(message.text)
                                        :
                                        message.text}
                                </p>
                            }
                        </div>
                    </div>
                ))}
            </div>
            <MessageInput/>
        </div>
    )
}
export default ChatContainer;