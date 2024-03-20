import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../index';


interface SalesData {
    sales: number[];
}

interface FetchDynamicSalesParams {
    period: string;
    startDate: string | Date;
    endDate: string | Date; 
}

const initialState = {
    sales: [],
    loading: false,
    error: null,
};

export const fetchDynamicSales = createAsyncThunk<SalesData, FetchDynamicSalesParams, { state: RootState }>(
    'salesPerDay/fetchSalesPerDay',
    async ({ period, startDate, endDate }, { rejectWithValue, dispatch, getState }) => {
        try {
            dispatch(salesPerDayRequest());
            const authState = getState().auth;
            const storeId = authState.user?.store?.storeId;
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/chart/store/${storeId}/dynamic-sales`, {
                params: { period, startDate, endDate },
                withCredentials: true
            })
            dispatch(salesPerDaySuccess(data.sales));
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch(salesPerDayFail(error.response?.data?.message || 'An error occurred'));
                return rejectWithValue(error.response?.data?.message || 'An error occurred');
            }
            dispatch(salesPerDayFail('An error occurred'));
            return rejectWithValue('An error occurred');
        }
    }
);




const salesPerDaySlice = createSlice({
    name: 'salesPerDay',
    initialState,
    reducers: {
        salesPerDayRequest: (state) => {
            state.loading = true;
        },
        salesPerDaySuccess: (state, action) => {
            state.loading = false;
            state.sales = action.payload;
        },
        salesPerDayFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    salesPerDayRequest,
    salesPerDaySuccess,
    salesPerDayFail,
    clearErrors,
} = salesPerDaySlice.actions;

export default salesPerDaySlice.reducer;
