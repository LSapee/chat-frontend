import {create} from "zustand"
import {ThemeState} from "@/interface/Theme.interface";

export const useThemeStore = create<ThemeState>((set,get)=>({
    theme: "coffee",
    setTheme:(theme:string)=>{
        localStorage.setItem("chat-theme",theme)
        set({theme})
    },
    initializeTheme: () => {
        const storedTheme = localStorage.getItem("chat-theme") || "coffee";
        set({ theme: storedTheme });
    },
    setLocalTheme:() =>{
        const myLocalTheme = localStorage.getItem("chat-theme");
        if(myLocalTheme !==null) get().setTheme(myLocalTheme)
    }
}));