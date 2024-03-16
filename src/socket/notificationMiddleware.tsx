import { useEffect } from "react";
import io from "socket.io-client";
import { neutralNotificationMsg } from "../components/toast";
import { useAppDispatch, useAppSelector } from "../hooks";
import Bell from "../assets/sounds/bell.mp3";
import { fetchAllUnreadNotification, fetchAllNotification } from "../store/reducers/notification/allNotificationsSlice";


const NotificationMiddleware = () => {
    const dispatch = useAppDispatch();
    const socket = io(import.meta.env.VITE_BASE_URL,{
        transports: ["websocket"] ,
        withCredentials: true,
      });
    const { user } = useAppSelector(state => state.auth);
    
    useEffect(()=>{
        dispatch(fetchAllUnreadNotification());
    },[dispatch])
   
    useEffect(() => {
        socket.on("connection", () => {
            console.log("Connected to Socket io");
        });


        socket.on("new_user_login", (data) => {
            console.log("test");
            neutralNotificationMsg(data.message);
            const audio = new Audio(Bell);
            audio.play();
        });

        socket.on(`notification/${user?._id}`, (data) => {
            neutralNotificationMsg(data.message);
            const audio = new Audio(Bell);
            audio.play();
            dispatch(fetchAllUnreadNotification());
            dispatch(fetchAllNotification({ page: 1}));
        });

        socket.on(`notification`, (data) => {
            neutralNotificationMsg(data.message);
            const audio = new Audio(Bell);
            audio.play();
        });

    }, [socket]);

    return null;
}


export default NotificationMiddleware;