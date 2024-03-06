import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Water {
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


interface AllWaterState {
    waters: Water[];
    loading: boolean;
    error: string | null;
}

const initialState: AllWaterState = {
    waters: [],
    loading: false,
    error: null,
};

export const fetchAllWaters = createAsyncThunk('allWaters/fetchAllWaters', async (id: string, { rejectWithValue, dispatch }) => {
    try {
        dispatch(allWatersRequest());
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/water/store/${id}`, { withCredentials: true });
        dispatch(allWatersSuccess(data.waters));
        return data.waters;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(allWatersFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(allWatersFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
});

export const fetchArchivedWaters = createAsyncThunk('allWaters/fetchAllWaters', async (id: string, { rejectWithValue, dispatch }) => {
    try {
        dispatch(allWatersRequest());
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/water/store/${id}/archived`, { withCredentials: true });
        console.log(data)
        dispatch(allWatersSuccess(data.waters));
        return data.waters;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(allWatersFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(allWatersFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
});



const allWatersSlice = createSlice({
    name: 'allWaters',
    initialState,
    reducers: {
        allWatersRequest: (state) => {
            state.loading = true;
        },
        allWatersSuccess: (state, action) => {
            state.loading = false;
            state.waters = action.payload;
        },
        allWatersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    allWatersRequest,
    allWatersSuccess,
    allWatersFail,
    clearErrors,
} = allWatersSlice.actions;

export default allWatersSlice.reducer;
