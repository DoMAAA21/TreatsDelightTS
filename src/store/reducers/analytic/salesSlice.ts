import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../index';


interface SalesData {
    sales: number[];
  }

const initialState = {
    salesThisMonth: [],
    salesToday: [],
    loading: false,
    error: null,
};
export const fetchSalesThisMonth = createAsyncThunk<SalesData, void, { state: RootState }>(
    'salesThisMonth/fetchSalesThisMonth',
    async (_, { rejectWithValue, dispatch, getState }) => {
      try {
        dispatch(salesThisMonthRequest());
        const authState = getState().auth;
        const storeId = authState.user?.store?.storeId;
        const { data } = await axios.get<SalesData>(`${import.meta.env.VITE_BASE_URL}/api/v1/chart/store/${storeId}/sales-current-month`, { withCredentials: true });
        dispatch(salesThisMonthSuccess(data));
        return data; 
      } catch (error) {
        if (axios.isAxiosError(error)) {
          dispatch(salesThisMonthFail(error.response?.data?.message || 'An error occurred'));
          return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(salesThisMonthFail('An error occurred'));
        return rejectWithValue('An error occurred');
      }
    }
  );


export const fetchSalesToday = createAsyncThunk<void, void, { state: RootState }>('salesToday/fetchSalesToday', async (_, { rejectWithValue, dispatch, getState }) => {
    try {
        dispatch(salesTodayRequest());
        const authState = getState().auth;
        const storeId = authState.user?.store?.storeId;
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/chart/store/${storeId}/sales-current-day`, { withCredentials: true });
        console.log(data);
        dispatch(salesTodaySuccess(data));
       
        return;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(salesTodayFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(salesTodayFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
}
);




const salesThisMonthSlice = createSlice({
    name: 'salesThisMonth',
    initialState,
    reducers: {
        salesThisMonthRequest: (state) => {
            state.loading = true;
        },
        salesThisMonthSuccess: (state, action) => {
            state.loading = false;
            state.salesThisMonth = action.payload;
        },
        salesThisMonthFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        salesTodayRequest: (state) => {
            state.loading = true;
        },
        salesTodaySuccess: (state, action) => {
            state.loading = false;
            state.salesToday = action.payload;
        },
        salesTodayFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    salesThisMonthRequest,
    salesThisMonthSuccess,
    salesThisMonthFail,
    salesTodayRequest,
    salesTodaySuccess,
    salesTodayFail,
    clearErrors,
} = salesThisMonthSlice.actions;

export default salesThisMonthSlice.reducer;
