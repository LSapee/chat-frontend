'use client'

import Link from "next/link";
import {useAuthStore} from "@/store/useAuthStore"
import {LogOut,MessageSquare,Settings,User} from "lucide-react";
import {useThemeStore} from "@/store/useThemeStore";
import {useChatStore} from "@/store/useChatStore";

export default function Navbar() {
    const {logout,authUser} = useAuthStore();
    const {theme} = useThemeStore();
    const {unSetSelectedUser} = useChatStore();
    return (
        <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80" data-theme={theme}>
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <Link href="/"
                              className="flex items-center gep-2.5 hover:opacity-80 translate-all"
                            onClick={() => unSetSelectedUser(null)}
                        >
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <MessageSquare className="h-5 w-5 text-primary" />
                            </div>
                            <h1 className="text-lg font-bold">Chatty</h1>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        {authUser && (
                            <>
                                <button className="flex gap-2 items-center" onClick={logout}>
                                    <LogOut className="size-5"/>
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                            )}
                    </div>
                </div>
            </div>
        </header>
    )
}