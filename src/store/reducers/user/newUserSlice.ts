import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    _id: number;
    fname: string;
    lname: string;
    email: string;
    course: string;
    religion: string;
    role: string;
}

interface NewUserState {
    loading: boolean;
    success: boolean;
    error: string | null;
    users: User[];
}

interface NewUserResponse {
    success: boolean;
    user: User[];
}

interface NewUserData {
    fname: string;
    lname: string;
    email: string;
    password: string;
    religion: string;
    avatar: File | Blob | String | null;
    role: string;
}

export const newUser = createAsyncThunk<NewUserResponse, NewUserData>('newUser/newUser', async (userData, { rejectWithValue, dispatch }) => {
    try {

        dispatch(newUserRequest());
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const { data } = await axios.post<NewUserResponse>(
            `${import.meta.env.VITE_BASE_URL}/api/v1/admin/user/new`, userData, { withCredentials: true, ...config }
        );
        dispatch(newUserSuccess(data));
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(newUserFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(newUserFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
}
);

const initialState: NewUserState = {
    loading: false,
    success: false,
    error: null,
    users: [],
};

const newUserSlice = createSlice({
    name: 'newUser',
    initialState,
    reducers: {
        newUserRequest: (state) => {
            state.loading = true;
        },
        newUserSuccess: (state, action: PayloadAction<NewUserResponse>) => {
            state.loading = false;
            state.success = action.payload.success;
            state.users = action.payload.user;
        },
        newUserFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        newUserReset: (state) => {
            state.success = false;
            state.error = null;
        },
        clearErrors: (state) => {
            state.success = false;
            state.error = null;
        },
    },

});

export const {
    newUserRequest,
    newUserSuccess,
    newUserFail,
    newUserReset,
} = newUserSlice.actions;

export default newUserSlice.reducer;
