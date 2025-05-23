'use client'
import {useAuthStore} from "@/store/useAuthStore";
import {useEffect,useState} from "react";
import {Loader,Camera,User,Mail} from "lucide-react";
import {redirect} from "next/navigation";
import {useThemeStore} from "@/store/useThemeStore"


export default function ProfilePage() {
    const {authUser,checkAuth,isCheckingAuth,isUpdatingProfile,updateProfile} = useAuthStore();
    const [selectedImg, setSelectedImg] =  useState(null);
    const {theme,setLocalTheme} = useThemeStore();
    const hanleImageUpload = (e:any) => {
        const file = e.target.files[0];
        if(!file) return;
        const fileName:string = file.name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async() => {
            const base64Image:string|any = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({profilePic:base64Image,fileName:fileName});
        }
    }

    useEffect(() => {checkAuth()},[checkAuth]);
    useEffect(() => {setLocalTheme();}, []);
    if(isCheckingAuth && !authUser) return (
        <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin"/>
        </div>
    )
    return (
        <div className="h-screen pt-20" data-theme={theme}>
            {!authUser ? redirect("/login") : null}
            <div className="max-w-2xl mx-auto p-4 py-8">
                <div className="bg-base-300 rounded-xl p-2 space-y-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold">프로필</h1>
                    </div>
                    {/* */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img
                                src ={selectedImg||authUser?.profilePic ||"/avatar.png"}
                                alt="Profile"
                                className="size-32 rounded-full object-cover border-4"
                            />
                            <label
                                htmlFor="avatar-upload"
                                className={`
                                absolute bottom-0 right-0
                                bg-base-content hover:scale-105
                                p-2 rounded-full cursor-poiner
                                transition-all duration-200
                                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}>
                                <Camera className="w-5 h-5 text-base-200"/>
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={hanleImageUpload}
                                    disabled={isUpdatingProfile}
                                    />
                            </label>
                        </div>
                        <p className="text-sm text-zinc-400">
                            {isUpdatingProfile ? "Uploading..." : "카메라 아이콘을 클릭하시면 프로필 사진을 변경하실 수 있습니다."}
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-xl font-medium mb-4">회원 정보</h2>
                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <User className="size-4"/>
                                이름
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
                        </div>
                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <Mail className="size-4"/>
                                Email
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
                        </div>
                    </div>
                    <div className="mt-6 bg-base-300 rounded-xl p-6">

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                                <span>회원 가입일 </span>
                                <span>{authUser?.createdAt?.split("T")[0]}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span>계정상태</span>
                                <span className="text-green-500">정상</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
