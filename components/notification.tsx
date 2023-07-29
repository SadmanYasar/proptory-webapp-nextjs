import { removeNotification, useStateValue } from "@/state";
import { useEffect } from "react";

export default function Notification() {
    const [{ notification }, dispatch] = useStateValue();

    const clearNotification = () => {
        dispatch(removeNotification());
    }

    return (
        <>
            {notification.message && <div onClick={clearNotification} className={`w-full py-4 px-4 text-xl text-center break-words ${notification.type === 'success' ? 'bg-green-400' : 'bg-red-400'}`}>
                {notification.message}
            </div>}
        </>
    )
}