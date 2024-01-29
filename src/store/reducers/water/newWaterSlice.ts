import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Water {
    _id: number;
    total: number;
    consumed: number;
    price: number,
    additionals: number,
    type: string;
    note?: string;
}

interface NewWaterState {
    loading: boolean;
    success: boolean;
    error: string | null;
    waters: Water[];
}

interface NewWaterResponse {
    success: boolean;
    water: Water[];
}

interface NewWaterData {
    total: number;
    consumed: number;
    price: number,
    additionals: number,
    type: string;
    note?: string;
}

export const newWater = createAsyncThunk<NewWaterResponse, NewWaterData>('newWater/newWater', async (waterData, { rejectWithValue, dispatch }) => {
    try {

        dispatch(newWaterRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post<NewWaterResponse>(
            `${import.meta.env.VITE_BASE_URL}/api/v1/admin/water/new`, waterData, { withCredentials: true, ...config }
        );
        dispatch(newWaterSuccess(data));
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(newWaterFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(newWaterFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
}
);

const initialState: NewWaterState = {
    loading: false,
    success: false,
    error: null,
    waters: [],
};

const newWaterSlice = createSlice({
    name: 'newWater',
    initialState,
    reducers: {
        newWaterRequest: (state) => {
            state.loading = true;
        },
        newWaterSuccess: (state, action: PayloadAction<NewWaterResponse>) => {
            state.loading = false;
            state.success = action.payload.success;
            state.waters = action.payload.water;
        },
        newWaterFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        newWaterReset: (state) => {
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
    newWaterRequest,
    newWaterSuccess,
    newWaterFail,
    newWaterReset,
} = newWaterSlice.actions;

export default newWaterSlice.reducer;
