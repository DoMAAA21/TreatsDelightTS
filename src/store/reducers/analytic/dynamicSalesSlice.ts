import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../index';


interface SalesData {
    sales: number[];
}

interface SoldData {
    sales: number[];
}
interface FetchDynamicSalesParams {
    period: string;
    startDate: string | Date;
    endDate: string | Date; 
}

interface FetchDynamicSoldParams {
    period: string;
    startDate: string | Date;
    endDate: string | Date; 
}

const initialState = {
    sales: [],
    sold: [],
    loading: false,
    error: null,
};

export const fetchDynamicSales = createAsyncThunk<SalesData, FetchDynamicSalesParams, { state: RootState }>(
    'sales/fetchSalesDay',
    async ({ period, startDate, endDate }, { rejectWithValue, dispatch, getState }) => {
        try {
            dispatch(salesRequest());
            const authState = getState().auth;
            const storeId = authState.user?.store?.storeId;
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/chart/store/${storeId}/dynamic-sales`, {
                params: { period, startDate, endDate },
                withCredentials: true
            })
            dispatch(salesSuccess(data.sales));
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch(salesFail(error.response?.data?.message || 'An error occurred'));
                return rejectWithValue(error.response?.data?.message || 'An error occurred');
            }
            dispatch(salesFail('An error occurred'));
            return rejectWithValue('An error occurred');
        }
    }
);


export const fetchDynamicSold = createAsyncThunk<SoldData, FetchDynamicSoldParams, { state: RootState }>(
    'solds/fetchSoldDay',
    async ({ period, startDate, endDate }, { rejectWithValue, dispatch, getState }) => {
        try {
            dispatch(soldRequest());
            const authState = getState().auth;
            const storeId = authState.user?.store?.storeId;
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/chart/store/${storeId}/dynamic-sold`, {
                params: { period, startDate, endDate },
                withCredentials: true
            })
            dispatch(soldSuccess(data.sold));
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch(soldFail(error.response?.data?.message || 'An error occurred'));
                return rejectWithValue(error.response?.data?.message || 'An error occurred');
            }
            dispatch(soldFail('An error occurred'));
            return rejectWithValue('An error occurred');
        }
    }
);






const salesPerDaySlice = createSlice({
    name: 'salesPerDay',
    initialState,
    reducers: {
        salesRequest: (state) => {
            state.loading = true;
        },
        salesSuccess: (state, action) => {
            state.loading = false;
            state.sales = action.payload;
        },
        salesFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        soldRequest: (state) => {
            state.loading = true;
        },
        soldSuccess: (state, action) => {
            state.loading = false;
            state.sold = action.payload;
        },
        soldFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    salesRequest,
    salesSuccess,
    salesFail,
    soldRequest,
    soldSuccess,
    soldFail,
    clearErrors,
} = salesPerDaySlice.actions;

export default salesPerDaySlice.reducer;
