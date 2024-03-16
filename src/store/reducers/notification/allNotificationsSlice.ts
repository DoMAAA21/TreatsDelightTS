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

interface AllNotificationsState {
    notifications: Notification[];
    loading: boolean;
    error: string | null;
    totalPages: number;
    unRead: number;
}

const initialState: AllNotificationsState = {
    notifications: [],
    loading: false,
    error: null,
    totalPages: 1,
    unRead: 0
};

export const fetchAllNotification = createAsyncThunk<Notification[],{ page: number;} , { state: RootState }>(
    'allNotifications/fetchAllNotification',
    async ({page }, { rejectWithValue, dispatch, getState }) => {
        try {
            dispatch(allNotificationsRequest());
            const authState = getState().auth;
            const userId = authState.user?._id;
            if (!userId) {
                return dispatch(allNotificationsFail('User not found'));
            }
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/notification/user/${userId}?page=${page}`, { withCredentials: true });

            console.log(data);
            dispatch(allNotificationsSuccess(data));
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
            state.totalPages =  action.payload.totalPages
        },
        allNotificationsFail: (state, action) => {
            state.loading = false;
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
    clearNotifications,
    clearErrors,
} = allNotificationSlice.actions;

export default allNotificationSlice.reducer;
