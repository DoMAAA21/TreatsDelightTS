import { useEffect } from "react";
import io from "socket.io-client";
import { dangerNotificationMsg, neutralNotificationMsg } from "../components/toast";
import NotificationPopSound from "../assets/sounds/notification-pop.mp3";
import { useAppSelector } from "../hooks";
const NotificationMiddleware = () => {
    const socket = io(import.meta.env.VITE_BASE_URL, { transports: ["websocket"] });
    const { user } = useAppSelector(state => state.auth);
    useEffect(() => {
        socket.on("connection", () => {
            console.log("Connected to Socket io");
        });


        socket.on("new_user_login", (data) => {
            neutralNotificationMsg(data.message);
            const audio = new Audio(NotificationPopSound);
            audio.play();
        });

        socket.on(`notification/${user?._id}`, (data) => {
            dangerNotificationMsg(data.message);
            const audio = new Audio(NotificationPopSound);
            audio.play();
        });

        socket.on(`danger/${user?._id}`, (data) => {
            neutralNotificationMsg(data.message);
            const audio = new Audio(NotificationPopSound);
            audio.play();
        });
    }, [socket]);

    return null;
}


export default NotificationMiddleware;