import React, { useEffect } from 'react';
import './notification.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { fetchAllNotification } from '../../store/reducers/notification/allNotificationsSlice';
import { updateNotification } from '../../store/reducers/notification/notificationSlice';
import NotificationLoader from './loader';
import Burger from '../../assets/svg/burger.svg';

interface NotificationPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { notifications, loading, hasMore, currentPage } = useAppSelector(state => state.allNotifications);

    const { user } = useAppSelector(state => state.auth);
 

    useEffect(() => {
        if (notifications.length === 0 && !loading && isOpen) {
            dispatch(fetchAllNotification({ page: 1 }));
        }
    }, [dispatch, user, isOpen, updateNotification]);

    const handleLoadMore = () => {
        dispatch(fetchAllNotification({ page: currentPage + 1 }));
    };

    const handleNotificationClick = (notificationId: string | number, webLink: string) => {
        onClose();
        dispatch(updateNotification(notificationId));
        dispatch(fetchAllNotification({ page: 1 }));
        if(webLink)
            navigate(webLink);
    };

    if (!isOpen) {
        return null;
    }

    if (loading && notifications.length === 0) {
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
        );
    }

    return (
        <div className="fixed top-16 right-4 w-72 bg-white border border-gray-300 shadow-md overflow-y-auto max-h-[35rem] rounded-lg notification-scrollbar">
            <h2 className="pl-2 py-2 text-lg font-semibold">Notifications</h2>
            {notifications.map(notification => (
                <div title={notification?.message} key={notification?._id} className={`p-4 border-b border-gray-200 cursor-pointer flex items-center hover:bg-gray-400 ${notification?.read ? 'bg-white' : 'bg-[#cfd8e6]'}`} onClick={() => handleNotificationClick(notification._id, notification?.webLink)} 
               
                >
                   {notification?.image && <img src={notification.image} alt="User" className="w-12 h-12 rounded-full mr-2" />}
                    <p className="flex-grow truncate text-sm ">{notification?.message}</p>
                </div>
            ))}
            {hasMore && (
                <div className="text-center">
                    <button onClick={handleLoadMore} className="mt-4 mb-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                        Load More
                    </button>
                </div>
            )}
            {!hasMore && (
                <p className="text-center text-gray-500 mb-2">No more notifications</p>
            )}
        </div>
    );
};

export default NotificationPopup;
