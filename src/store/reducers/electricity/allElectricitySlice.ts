import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Electricity {
    _id: number;
    storeId: string | number;
    total: number;
    price: number;
    additionals: number;
    consumed: number;
    type: string;
    paymentType: string;
    note?: string;
    issuedAt: Date;
    paidAt: Date;
}


interface AllElectricityState {
    electricity: Electricity[];
    loading: boolean;
    error: string | null;
}

const initialState: AllElectricityState = {
    electricity: [],
    loading: false,
    error: null,
};

export const fetchAllElectricity = createAsyncThunk('allElectricity/fetchAllElectricity', async (id: string, { rejectWithValue, dispatch }) => {
    try {
        dispatch(allElectricityRequest());
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/electricity/store/${id}`, { withCredentials: true });
        dispatch(allElectricitySuccess(data.electricity));
        return data.electricity;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(allElectricityFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(allElectricityFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
});

export const fetchArchivedElectricity = createAsyncThunk('allElectricity/fetchAllElectricity', async (id: string, { rejectWithValue, dispatch }) => {
    try {
        dispatch(allElectricityRequest());
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/electricity/store/${id}/archived`, { withCredentials: true });
        console.log(data)
        dispatch(allElectricitySuccess(data.electricity));
        return data.electricity;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(allElectricityFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(allElectricityFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
});



const allElectricitySlice = createSlice({
    name: 'allElectricity',
    initialState,
    reducers: {
        allElectricityRequest: (state) => {
            state.loading = true;
        },
        allElectricitySuccess: (state, action) => {
            state.loading = false;
            state.electricity = action.payload;
        },
        allElectricityFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    allElectricityRequest,
    allElectricitySuccess,
    allElectricityFail,
    clearErrors,
} = allElectricitySlice.actions;

export default allElectricitySlice.reducer;
