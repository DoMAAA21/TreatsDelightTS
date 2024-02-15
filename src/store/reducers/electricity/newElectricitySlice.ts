import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Electricity {
    _id: number;
    total: number;
    consumed: number;
    price: number,
    additionals: number,
    type: string;
    note?: string;
}

interface NewElectricityState {
    loading: boolean;
    success: boolean;
    error: string | null;
    electricity: Electricity[];
}

interface NewElectricityResponse {
    success: boolean;
    electricity: Electricity[];
}

interface NewElectricityData {
    total: number;
    consumed: number;
    price: number,
    additionals: number,
    type: string;
    note?: string;
}

export const newElectricity = createAsyncThunk<NewElectricityResponse, NewElectricityData>('newElectricity/newElectricity', async (electricityData, { rejectWithValue, dispatch }) => {
    try {

        dispatch(newElectricityRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post<NewElectricityResponse>(
            `${import.meta.env.VITE_BASE_URL}/api/v1/admin/electricity/new`, electricityData, { withCredentials: true, ...config }
        );
        dispatch(newElectricitySuccess(data));
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(newElectricityFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(newElectricityFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
}
);

const initialState: NewElectricityState = {
    loading: false,
    success: false,
    error: null,
    electricity: [],
};

const newElectricitySlice = createSlice({
    name: 'newElectricity',
    initialState,
    reducers: {
        newElectricityRequest: (state) => {
            state.loading = true;
        },
        newElectricitySuccess: (state, action: PayloadAction<NewElectricityResponse>) => {
            state.loading = false;
            state.success = action.payload.success;
            state.electricity = action.payload.electricity;
        },
        newElectricityFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        newElectricityReset: (state) => {
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
    newElectricityRequest,
    newElectricitySuccess,
    newElectricityFail,
    newElectricityReset,
} = newElectricitySlice.actions;

export default newElectricitySlice.reducer;
