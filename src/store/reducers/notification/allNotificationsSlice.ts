import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/index';
import axios from 'axios';

interface Notification {
    _id: string | number;
    message: string;
    createdAt: Date;
    image: string;
    webLink: string;
    read: boolean;
}

interface UnreadNotification {
    unread: number;
}

interface AllNotificationsState {
    notifications: Notification[];
    loading: boolean;
    unReadLoading: boolean;
    error: string | null;
    totalPages: number;
    currentPage: number;
    unRead: number;
    hasMore: boolean;
}

const initialState: AllNotificationsState = {
    notifications: [],
    loading: false,
    unReadLoading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
    unRead: 0,
    hasMore: true
};

export const fetchAllNotification = createAsyncThunk<Notification[], { page: number; }, { state: RootState }>(
    'allNotifications/fetchAllNotification',
    async ({ page }, { rejectWithValue, dispatch, getState }) => {
        try {
            dispatch(allNotificationsRequest());
            const authState = getState().auth;
            const userId = authState.user?._id;
            if (!userId) {
                return dispatch(allNotificationsFail('User not found'));
            }
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/notification/user/${userId}?page=${page}`, { withCredentials: true });

            if (page === 1) {
                dispatch(allNotificationsSuccess(data));
            } else {
                dispatch(concatNotifications(data));
            }



            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch(allNotificationsFail(error.response?.data?.message || 'An error occurred'));
                return rejectWithValue(error.response?.data?.message || 'An error occurred');
            }
            dispatch(allNotificationsFail('An error occurred'));
            return rejectWithValue('An error occurred');
        }
    }
);


export const fetchAllUnreadNotification = createAsyncThunk< UnreadNotification, void,{ state: RootState }>(
    'allNotifications/fetchAllNotification',
    async (_, { rejectWithValue, dispatch, getState }) => {
        try {
            dispatch(allUnreadNotificationsRequest());
            const authState = getState().auth;
            const userId = authState.user?._id;
            if (!userId) {
                return dispatch(allUnreadNotificationsFail('User not found'));
            }
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/notification/user/${userId}/unread`, { withCredentials: true });

    
             dispatch(allUnreadNotificationsSuccess(data.totalUnreadNotifications))
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch(allNotificationsFail(error.response?.data?.message || 'An error occurred'));
                return rejectWithValue(error.response?.data?.message || 'An error occurred');
            }
            dispatch(allNotificationsFail('An error occurred'));
            return rejectWithValue('An error occurred');
        }
    }
);



const allNotificationSlice = createSlice({
    name: 'allNotifications',
    initialState,
    reducers: {
        allNotificationsRequest: (state) => {
            state.loading = true;
        },

        allNotificationsSuccess: (state, action) => {
            state.loading = false;
            state.notifications = action.payload.notifications;
            state.unRead = action.payload.totalUnreadNotifications;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.hasMore = action.payload.hasMore
        },
        allNotificationsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        concatNotifications: (state, action) => {
            state.notifications = state.notifications.concat(action.payload.notifications);
            state.hasMore = action.payload.hasMore;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.loading = false;
        },
        prependNotifications: (state, action) => {
            state.notifications = state.notifications.concat(action.payload.notifications);
            state.hasMore = action.payload.hasMore;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.loading = false;
        },
        allUnreadNotificationsRequest: (state) => {
            state.unReadLoading = true;
        },
        
        allUnreadNotificationsSuccess: (state, action) => {
            state.unRead = action.payload;     
        },
        allUnreadNotificationsFail: (state, action) => {
            state.unReadLoading = false;
            state.error = action.payload;
        },
        clearNotifications: (state) => {
            state.notifications = [];
            state.unRead = 0;
            state.totalPages = 1;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    allNotificationsRequest,
    allNotificationsSuccess,
    allNotificationsFail,
    concatNotifications,
    allUnreadNotificationsRequest,
    allUnreadNotificationsSuccess,
    allUnreadNotificationsFail,
    clearNotifications,
    prependNotifications,
    clearErrors,
} = allNotificationSlice.actions;

export default allNotificationSlice.reducer;
