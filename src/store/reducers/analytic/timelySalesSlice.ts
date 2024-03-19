import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../index';


interface SalesData {
    sales: number[];
  }

const initialState = {
    salesPerDay: [],
    salesPerMonth: [],
    loading: false,
    error: null,
};
export const fetchSalesPerDay = createAsyncThunk<SalesData, void, { state: RootState }>(
    'salesPerDay/fetchSalesPerDay',
    async (_, { rejectWithValue, dispatch, getState }) => {
      try {
        dispatch(salesPerDayRequest());
        const authState = getState().auth;
        const storeId = authState.user?.store?.storeId;
        const { data } = await axios.get<SalesData>(`${import.meta.env.VITE_BASE_URL}/api/v1/chart/store/${storeId}/sales-per-day`, { withCredentials: true });
        dispatch(salesPerDaySuccess(data.sales));
        console.log(data.sales);
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


export const fetchSalesPerMonth = createAsyncThunk<void, void, { state: RootState }>('salesPerMonth/fetchSalesPerMonth', async (_, { rejectWithValue, dispatch, getState }) => {
    try {
        dispatch(salesPerMonthRequest());
        const authState = getState().auth;
        const storeId = authState.user?.store?.storeId;
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/chart/store/${storeId}/sales-current-day`, { withCredentials: true });
        console.log(data);
        dispatch(salesPerMonthSuccess(data));
       
        return;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(salesPerMonthFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(salesPerMonthFail('An error occurred'));
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
            state.salesPerDay = action.payload;
        },
        salesPerDayFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        salesPerMonthRequest: (state) => {
            state.loading = true;
        },
        salesPerMonthSuccess: (state, action) => {
            state.loading = false;
            state.salesPerMonth = action.payload;
        },
        salesPerMonthFail: (state, action) => {
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
    salesPerMonthRequest,
    salesPerMonthSuccess,
    salesPerMonthFail,
    clearErrors,
} = salesPerDaySlice.actions;

export default salesPerDaySlice.reducer;
