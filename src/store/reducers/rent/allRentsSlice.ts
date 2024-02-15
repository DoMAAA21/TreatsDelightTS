import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Rent {
    _id: number;
    storeId: string | number;
    amount: number;
    type: string;
    paymentType: string;
    note?: string;
    issuedAt: Date;
    paidAt: Date;
}


interface AllRentState {
    rents: Rent[];
    loading: boolean;
    error: string | null;
}

const initialState: AllRentState = {
    rents: [],
    loading: false,
    error: null,
};

export const fetchAllRents = createAsyncThunk('allRents/fetchAllRents', async (id: string, { rejectWithValue, dispatch }) => {
    try {
        dispatch(allRentsRequest());
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/rent/store/${id}`, { withCredentials: true });
        dispatch(allRentsSuccess(data.rents));
        return data.rents;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(allRentsFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(allRentsFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
});

export const fetchArchivedRents = createAsyncThunk('allRents/fetchAllRents', async (id: string, { rejectWithValue, dispatch }) => {
    try {
        dispatch(allRentsRequest());
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/rent/store/${id}/archived`, { withCredentials: true });
        console.log(data)
        dispatch(allRentsSuccess(data.rents));
        return data.rents;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(allRentsFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(allRentsFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
});



const allRentsSlice = createSlice({
    name: 'allRents',
    initialState,
    reducers: {
        allRentsRequest: (state) => {
            state.loading = true;
        },
        allRentsSuccess: (state, action) => {
            state.loading = false;
            state.rents = action.payload;
        },
        allRentsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    allRentsRequest,
    allRentsSuccess,
    allRentsFail,
    clearErrors,
} = allRentsSlice.actions;

export default allRentsSlice.reducer;
