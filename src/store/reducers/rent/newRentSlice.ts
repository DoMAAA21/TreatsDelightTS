import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Rent {
    _id: number;
    storeId: string | number;
    amount: number;
    type: string;
    note?: string;
}

interface NewRentState {
    loading: boolean;
    success: boolean;
    error: string | null;
    rents: Rent[];
}

interface NewRentResponse {
    success: boolean;
    rent: Rent[];
}

interface NewRentData {
    name: string;
    slogan: string;
    stall: number;
    location: string;
    active: boolean | string;
    logo: File | Blob | String | null;
}

export const newRent = createAsyncThunk<NewRentResponse, NewRentData>('newRent/newRent', async (rentData, { rejectWithValue, dispatch }) => {
    try {

        dispatch(newRentRequest());
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const { data } = await axios.post<NewRentResponse>(
            `${import.meta.env.VITE_BASE_URL}/api/v1/admin/rent/new`, rentData, { withCredentials: true, ...config }
        );
        dispatch(newRentSuccess(data));
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(newRentFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(newRentFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
}
);

const initialState: NewRentState = {
    loading: false,
    success: false,
    error: null,
    rents: [],
};

const newRentSlice = createSlice({
    name: 'newRent',
    initialState,
    reducers: {
        newRentRequest: (state) => {
            state.loading = true;
        },
        newRentSuccess: (state, action: PayloadAction<NewRentResponse>) => {
            state.loading = false;
            state.success = action.payload.success;
            state.rents = action.payload.rent;
        },
        newRentFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        newRentReset: (state) => {
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
    // updateField,
    newRentRequest,
    newRentSuccess,
    newRentFail,
    newRentReset,
} = newRentSlice.actions;

export default newRentSlice.reducer;
