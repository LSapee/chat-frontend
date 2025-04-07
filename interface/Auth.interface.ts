export interface AuthState {
    authUser:any,
    isSigningUp :boolean,
    isLoggingIn:boolean,
    isUpdatingIng:boolean,
    isCheckingAuth:boolean,
    isUpdatingProfile:boolean,
    socket:any,
    checkAuth : ()=> Promise<void>,
    signup: (data:any)=>Promise<void>,
    login: (data:any)=>Promise<void>,
    logout:()=>Promise<void>,
    updateProfile:(data:any)=>Promise<void>,
    onlineUsers:Array<any>
    connectSocket:()=>void,
    disconnectSocket:()=>void,
}