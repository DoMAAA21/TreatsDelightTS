import React, { useEffect } from 'react';
import './notification.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { fetchAllNotification } from '../../store/reducers/notification/allNotificationsSlice';
import { updateNotification } from '../../store/reducers/notification/notificationSlice';
import NotificationLoader from './loader';
import Burger from '../../assets/svg/burger.svg';

const NotificationPopup: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { notifications, loading } = useAppSelector(state => state.allNotifications);
    const { user } = useAppSelector(state => state.auth);

    useEffect(() => {
        if (notifications.length === 0 && !loading) {
            dispatch(fetchAllNotification({ page: 1 }));
        }
    }, [dispatch, user]);

    const handleNotificationClick = (notificationId: string | number, webLink: string) => {
        dispatch(updateNotification(notificationId));
        navigate(webLink);
    };


    if (loading) {
        return (
            <div className="fixed top-16 right-4 w-72 bg-white border border-gray-300 shadow-md overflow-y-auto max-h-[35rem] rounded-lg notification-scrollbar">
                {[...Array(4)].map((_, index) => (
                    <NotificationLoader key={index} />
                ))}
            </div>
        );
    }


    if (notifications.length === 0 && !loading) {
        return (
            <div className="fixed top-16 right-4 w-72 bg-white border border-gray-300 shadow-md overflow-y-auto max-h-[35rem] rounded-lg notification-scrollbar">
                <h2 className="pl-2 pt-2 text-lg font-semibold">Notifications</h2>
                <div className="text-center flex-col justify-center">
                    <img src={Burger} className="w-full h-48" alt="burger alt" />
                    <h2 className="text-lg font-semibold">No notifications yet.</h2>
                </div>
            </div>
        )
    }
    return (

        <div className="fixed top-16 right-4 w-72 bg-white border border-gray-300 shadow-md overflow-y-auto max-h-[35rem] rounded-lg notification-scrollbar">
            <h2 className="pl-2 pt-2 text-lg font-semibold">Notifications</h2>
            {notifications.map(notification => (
                <div key={notification._id} className={`p-4 border-b border-gray-200 cursor-pointer flex items-center ${notification.read ? 'bg-white' : 'bg-gray-200'}`} onClick={() => handleNotificationClick(notification._id, notification.webLink)}>
                    <img src={notification.image} alt="User" className="w-12 h-12 rounded-full mr-2" />
                    <p className="flex-grow truncate text-sm ">{notification.message}</p>
                </div>
            ))}
        </div>

    );
};

export default NotificationPopup;
