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
    const {signup,isSigningUp}= useAuthStore();
    const {theme,setLocalTheme} = useThemeStore();
    const [formData,setFormData] = useState({
        fullName:"",
        email:"",
        password:"",
    });
    useEffect(() => {checkAuth()},[checkAuth]);
    useEffect(() => {setLocalTheme();}, []);
    const validateForm = ()=>{
        if(!formData.fullName.trim()) return toast.error("이름을 입력해주세요.");
        if(!formData.email.trim()) return toast.error("이메일을 정확하게 입력하여주세요.");
        if(!/\S+@\S+\.\S+/.test(formData.email))return toast.error("이메일 형식이 아닙니다.");
        if(!formData.password) return toast.error("패스워드를 입력해주세요.");
        if(formData.password.length<8) return toast.error("패스워드를 8자리 이상 입력해주세요.");
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
                            <h1 className="text-2xl font-bold mt-2">회원가입</h1>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="from-control">
                            <label className="label">
                                <span className="label-text font-medium">이름</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40"/>
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="이름"
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
                                placeholder="asd@asd.com"
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
                                placeholder="비밀번호는 8자리 이상을 사용해주세요."
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
                                ):("회원가입")}
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="text-base-content/60">
                            이미 회원이신가요?{" "}
                            <Link href="/login" className="link link-primary">
                                로그인하러 가기
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

        {/*    right side*/}
            <AuthImagePattern
                title="회원가입을 환영합니다."
                subtitle="connect with friends, chare moments, and stay in touch with you"
            />
        </div>

    );
}