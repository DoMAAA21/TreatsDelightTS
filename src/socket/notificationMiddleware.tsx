import { useEffect } from "react";
import io from "socket.io-client";
import { neutralNotificationMsg } from "../components/toast";
import { useAppSelector } from "../hooks";
import NotificationPopSound from "../assets/sounds/notification-pop.mp3";
// import BellSound from "../assets/sounds/bell.mp3";

const NotificationMiddleware = () => {
    const socket = io(import.meta.env.VITE_BASE_URL,{
        transports: ["websocket"] ,
        withCredentials: true,
      });
    const { user } = useAppSelector(state => state.auth);
    
    socket.connect();
    socket.on("connection", () => {
        console.log("Connected to Socket io");
    });



    useEffect(() => {


        socket.on("new_user_login", (data) => {
            console.log("test");
            neutralNotificationMsg(data.message);
            const audio = new Audio(NotificationPopSound);
            audio.play();
        });

        socket.on(`notification/${user?._id}`, (callback, data) => {
            callback();
            neutralNotificationMsg(data.message);
            const audio = new Audio(NotificationPopSound);
            audio.play();
        });

        socket.on(`notification`, (data) => {
            neutralNotificationMsg(data.message);
            const audio = new Audio(NotificationPopSound);
            audio.play();
        });

    }, [socket]);

    return null;
}


export default NotificationMiddleware;