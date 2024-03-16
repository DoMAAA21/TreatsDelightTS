import React, { useEffect } from 'react';
import './notification.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchAllNotification } from '../../store/reducers/notification/allNotificationsSlice';
import NotificationLoader from './loader';



const NotificationPopup: React.FC = () => {
    const dispatch = useAppDispatch();
    const { notifications, loading } = useAppSelector(state => state.allNotifications);

    useEffect(() => {

        if (notifications.length === 0 && !loading) {
            dispatch(fetchAllNotification({ page: 1 }));
        }

    }, [dispatch, loading, notifications]);


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

            </div>
        )
    }
    return (
        
        <div className="fixed top-16 right-4 w-72 bg-white border border-gray-300 shadow-md overflow-y-auto max-h-[35rem] rounded-lg notification-scrollbar">
            {notifications.map(notification => (
                <div key={notification._id} className={`p-4 border-b border-gray-200 cursor-pointer flex items-center`}>
                    <img src={notification.image} alt="User" className="w-12 h-12 rounded-full mr-2" />
                    <p className="flex-grow truncate">{notification.message}</p>
                </div>
            ))}
        </div>

    );
};

export default NotificationPopup;
