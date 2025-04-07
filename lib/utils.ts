export function formatMessageTime(data:string) {
    return new Date(data).toLocaleTimeString("en-US",{
        hour12: false,
        minute:"2-digit",
        hour :"2-digit"
    });
}