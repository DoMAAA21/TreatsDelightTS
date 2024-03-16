import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface NotificationState {
    loading: boolean;
    isUpdated: boolean;
    error: string | null;
}

const initialState: NotificationState = {
    loading: false,
    isUpdated: false,
    error: null,
};


export const updateNotification = createAsyncThunk('notification/renotificationNotification', async (id: string | number, { dispatch }) => {
    try {
        const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/notification/read`, { id }, { withCredentials: true });
        dispatch(updateNotificationSuccess(data.success))
        return data.success;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.message || 'An error occured';
        }
        throw 'An error occured';
    }
}
);



const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        updateNotificationSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updateNotificationReset: (state) => {
            state.isUpdated = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    updateNotificationSuccess,
    updateNotificationReset,
    clearErrors,
} = notificationSlice.actions;

export default notificationSlice.reducer;
