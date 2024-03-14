import { useEffect } from "react";
import io from "socket.io-client";
import { neutralNotificationMsg } from "../components/toast";


const NotificationMiddleware = () => {
    const socket = io(import.meta.env.VITE_BASE_URL, { transports: ["websocket"] });
    useEffect(() => {
        socket.on("connection", () => {
            console.log("Connected to Socket io");
        });


        socket.on("new_user_login", (data) => {
            //   toast.info(data.message, {
            //     position: toast.POSITION.TOP_CENTER,
            //   });
            neutralNotificationMsg(data.message)

        });
    }, [socket]);

    return null;
}


export default NotificationMiddleware;