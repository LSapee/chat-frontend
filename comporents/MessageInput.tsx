import {useRef, useState} from "react";
import {useChatStore} from "@/store/useChatStore";
import {X, Image, Send, Video} from "lucide-react"
import { toast } from 'react-toastify';

export default function MessageInput(){
    const [text,setText] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {sendMessage} = useChatStore();
    const handleImageChange  = (e:any )=>{
        const file = e.target.files[0];
        if(!file.type.startsWith("image")){
            toast.error("Please select an image file");
            return ;
        }
        const reader = new FileReader();
        reader.onloadend = ()=>{
            const base64Image:string|any = reader.result;
            setImagePreview(base64Image);
        }
        reader.readAsDataURL(file);
    };
    const removeImage = () =>{
        setImagePreview(null);
        if(fileInputRef.current)fileInputRef.current.value = "";
    }
    const handleSendMessage = async (e:any)=>{
        e.preventDefault();
        if(!text.trim() && !imagePreview)return ;
        try{
            //메시지 전송
            await sendMessage({
                text:text.trim(),
                image:imagePreview,
            });
            // input 비우기
            setText("");
            setImagePreview(null);
            if(fileInputRef.current)fileInputRef.current.value = "";{}
        }catch(err){
            console.error("Failed to send message",err)
        }
    }
    const handleLiveVideo = (e:any)=>{
        alert("아직 준비중입니다.")
    }

    return (
        <div className="p-4 w-full">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e)=>setText(e.target.value)}
                    />
                    <input
                        type=""
                        className="hidden"
                        onChange={handleLiveVideo}
                    />
                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle ${imagePreview ?  "text-emerald-500" : "text-zinc-400"}`}
                        onClick={()=>alert("아직 준비중")}>
                        <Video size={20}/>
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle ${imagePreview ?  "text-emerald-500" : "text-zinc-400"}`}
                        onClick={()=>fileInputRef.current?.click()}>
                        <Image size={20}/>
                    </button>

                </div>
                <button
                    type="submit"
                    className="btn btn-sm btn-circle"
                    disabled={!text.trim() && !imagePreview}>
                    <Send size={22}/>
                </button>
            </form>
        </div>
    )
}