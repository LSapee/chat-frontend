'use client'

import {useState} from "react";
import {useAuthStore} from "@/store/useAuthStore";
import {Eye, EyeOff, Loader, Loader2, Lock, Mail, MessageSquare, User} from "lucide-react";
import AuthImagePattern from "@/comporents/AuthImagePattern";
import Link from "next/link";
import {redirect} from "next/navigation";
import {useEffect} from "react";
import {useThemeStore} from "@/store/useThemeStore";

export default function LoginPage() {
    const {authUser,checkAuth,isCheckingAuth} = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    })
    const {login,isLoggingIn} = useAuthStore();
    const {theme,setLocalTheme} = useThemeStore();
    useEffect(() => {checkAuth()},[checkAuth]);
    useEffect(() => {
        setLocalTheme();
    }, []);

    const handleSubmit = async (e:any) =>{
        e.preventDefault();
        login(formData)
    }
    return (
        <div className="min-h-screen grid lg:grid-cols-2" data-theme={theme}>
            {authUser ? redirect("/"):null}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div
                                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <MessageSquare className="size-6 text-primary"/>
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Sign up</h1>
                            <p className="text-base-content/60">Get started with your free account</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="from-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="size-5 text-base-content/40"/>
                            </div>
                            <input
                                type="email"
                                className={`input input-bordered w-full pl-10`}
                                placeholder="abc@abc.com"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div className="from-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="size-5 text-base-content/40"/>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`input input-bordered w-full pl-10`}
                                placeholder="*******"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex itrems-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (<EyeOff className="size-5 text-base-content/40"/>) : (
                                    <Eye className="size-5 text-base-content/40"/>)}
                            </button>
                        </div>
                        <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
                            {isLoggingIn ? (
                                <>
                                    <Loader2 className="size-5 animate-spin"/>
                                    Loading...
                                </>
                            ) : ("Sign in")}
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link href="/signup" className="link link-primary">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/*    right side*/}
            <AuthImagePattern
                title="Join our community"
                subtitle="connect with friends, chare moments, and stay in touch with you"
            />
        </div>
    );
}