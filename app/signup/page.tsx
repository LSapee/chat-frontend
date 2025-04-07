'use client'
import {useEffect, useState} from "react";
import {Eye, EyeOff, Loader, Loader2, Lock, Mail, MessageSquare, User} from "lucide-react";
import {redirect} from "next/navigation";
import Link from "next/link";
import AuthImagePattern from "@/comporents/AuthImagePattern";
import { toast } from 'react-toastify';
import {useAuthStore} from "@/store/useAuthStore";
import {useThemeStore} from "@/store/useThemeStore";

export default function SignupPage() {
    const {authUser,checkAuth,isCheckingAuth} = useAuthStore();
    const [showPassword,setShowPassword] = useState(false);
    const [formData,setFormData] = useState({
        fullName:"",
        email:"",
        password:"",
    });
    useEffect(() => {checkAuth()},[checkAuth]);
    const {signup,isSigningUp}= useAuthStore();
    const {theme} = useThemeStore();
    const validateForm = ()=>{
        if(!formData.fullName.trim()) return toast.error("Please enter your full name");
        if(!formData.email.trim()) return toast.error("Email is required");
        if(!/\S+@\S+\.\S+/.test(formData.email))return toast.error("Invalid valid email");
        if(!formData.password) return toast.error("Password is required");
        if(formData.password.length<8) return toast.error("Password must be at least 8 characters");
        return true;
    }
    const handleSubmit = (e:any)=>{
        e.preventDefault();
        const success = validateForm();
        if(success===true) signup(formData);

    }
    if(isCheckingAuth && !authUser) return (
        <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin"/>
        </div>
    )
    return (
        <div className="min-h-screen grid lg:grid-cols-2" data-theme={theme}>
            {authUser ? redirect("/"):null}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <MessageSquare className="size-6 text-primary"/>
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Sign up</h1>
                            <p className="text-base-content/60">Get started with your free account</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="from-control">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40"/>
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="full name"
                                    value={formData.fullName}
                                    onChange={(e)=>setFormData({...formData, fullName:e.target.value})}
                                    />
                            </div>
                        </div>
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
                                onChange={(e)=>setFormData({...formData, email:e.target.value})}
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
                                onChange={(e)=>setFormData({...formData, password:e.target.value})}
                                />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex itrems-center"
                                onClick={()=>setShowPassword(!showPassword)}
                                >
                                {showPassword ? (<EyeOff className="size-5 text-base-content/40"/>) :( <Eye className="size-5 text-base-content/40"/>)}
                            </button>
                        </div>
                        <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
                            {isSigningUp ? (
                                <>
                                    <Loader2 className="size-5 animate-spin"/>
                                    Loading...
                                </>
                                ):("Create Account")}
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link href="/login" className="link link-primary">
                                Sign in
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