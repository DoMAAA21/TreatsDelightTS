import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserDetails {
    user: {
        _id? : string | number;
        fname: string;
        lname: string;
        email: string;
        password: string;
        role?: string;
        course?: string;
        religion?: string;
        avatar?: {
            url?: string;
        };
    };
    loading: boolean;
    error: string | null;
}

const initialState: UserDetails = {
    user: {
        fname: '',
        lname: '',
        email: '',
        password: '',
        role: '',
        course: '',
        religion: ''
    },
    loading: false,
    error: null,
};

export const getUserDetails = createAsyncThunk('userDetails/getUserDetails', async (id: string | undefined, { dispatch, rejectWithValue }) => {
    try {
        dispatch(userDetailsRequest());

        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/user/${id}`, { withCredentials: true });
        dispatch(userDetailsSuccess(data.user));
        return data.user;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(userDetailsFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(userDetailsFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
});

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        userDetailsRequest: (state) => {
            state.loading = true;
        },
        userDetailsSuccess: (state, action: PayloadAction<UserDetails['user']>) => {
            state.loading = false;
            state.user = action.payload;
        },
        userDetailsFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
        clearUser: (state) => {
            state.error = null;
            state.user = {
                fname: '',
                lname: '',
                email: '',
                password: '',
                role: '',
            };
        },
    },
});

export const {
    userDetailsRequest,
    userDetailsSuccess,
    userDetailsFail,
    clearErrors,
    clearUser,
} = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
