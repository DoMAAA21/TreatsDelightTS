import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/index';
import axios from 'axios';

interface Notification {
    orderItems: {
        id: number;
        name: string;
        quantity: number;
        price: number;
        date: string;
        status: string;
        storeName: string;
    },
    user:{
        id: string | number;
        name: string
    }
    createdAt: Date;

}


interface AllNotificationsState {
    orders: Notification[];
    loading: boolean;
    error: string | null;
}

const initialState: AllNotificationsState = {
    orders: [],
    loading: false,
    error: null,
};

export const fetchAllNotification = createAsyncThunk<Notification[], void, { state: RootState }>(
    'allNotifications/fetchAllNotification',
    async (_, { rejectWithValue, dispatch, getState }) => {
        try {
            dispatch(allNotificationsRequest());
            const authState = getState().auth;
            const userId = authState.user?._id;
            if (!userId) {
                return dispatch(allNotificationsFail('User not found'));
            }
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/${userId}/transactions`, { withCredentials: true });
            dispatch(allNotificationsSuccess(data.orders));
            return data.orders;
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
            state.orders = action.payload;
        },
        allNotificationsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
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
    clearErrors,
} = allNotificationSlice.actions;

export default allNotificationSlice.reducer;
