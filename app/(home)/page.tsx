'use client'

import {useAuthStore} from "@/store/useAuthStore";
import {useEffect} from "react";
import {Loader} from "lucide-react";
import {redirect} from "next/navigation";
import {useThemeStore} from "@/store/useThemeStore";
import {useChatStore} from "@/store/useChatStore";
import Sidebar from "@/comporents/Sidebar";
import NoChatSelected from "@/comporents/NoChatSelected";
import ChatContainer from "@/comporents/ChatContainer";

export default function HomePage() {
    const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore();
    const {theme} = useThemeStore();
    const {selectedUser} = useChatStore();

    useEffect(() => {
        checkAuth()
    },[checkAuth]);
    if(isCheckingAuth && !authUser) return (
        <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin"/>
        </div>
    )
  return (
      <div data-theme={theme}>
          {!authUser ? redirect("/login") : null}
          <div className="flex items-center justify-center pt-20 px-4">
              <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                  <div className="flex h-full rouned-lg oveflow-hidden">
                      <Sidebar />
                      {!selectedUser  ? <NoChatSelected/> : <ChatContainer/>}
                  </div>
              </div>
          </div>
      </div>

  );
}
