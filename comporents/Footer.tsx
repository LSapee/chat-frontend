'use client'

import {LogOut, MessageCircle, MessageSquare, Settings, User, Users} from "lucide-react";
import Link from "next/link";
import {useThemeStore} from "@/store/useThemeStore";
import {useChatStore} from "@/store/useChatStore";

const Footer = () =>{
    const {theme} = useThemeStore();
    const {unSetSelectedRoom,unSetSelectedUser} = useChatStore();
    return (
        <footer className="bg-base-100 border-b border-base-300 fixed w-full bottom-0 z-40 backdrop-blur-lg" data-theme={theme}>
            <div className="container mx-auto items-center justify-center px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <Link
                        href={"/"}
                        className={`
                           btn btn-lg gap-4 transition-colors w-1/4 mr-1
                        `}
                        onClick={() => unSetSelectedUser(null)}
                    >
                        <Users/>
                        <p>유저들</p>
                    </Link>
                    <Link
                        href={"/chats"}
                        className={`
                            btn btn-lg gap-4 transition-colors w-1/4 mr-1
                        `}
                        onClick={() => unSetSelectedRoom(null)}
                    >
                        <MessageCircle/>
                        <p>채팅</p>
                    </Link>
                    <Link
                        href={"/profile"}
                        className={`
                            btn btn-lg gap-4 transition-colors w-1/4 mr-1
                        `}
                    >
                            <User/>
                            <p>프로필</p>
                    </Link>
                    <Link
                        href={"/settings"}
                        className={`
                            btn btn-lg gap-4 transition-colors w-1/4
                            `}
                    >
                        <Settings/>
                        <p>설정</p>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
export default Footer;