import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../index';

const initialState = {
    rentBillsPerMonth: [],
    loading: false,
    error: null,
};

export const fetchRentBillsPerMonth = createAsyncThunk<void, void, { state: RootState }>('billsPerMonth/fetchAllRent',async (_, { rejectWithValue, dispatch, getState }) => {
      try {
        dispatch(rentBillsPerMonthRequest()); 
        const authState = getState().auth;
        const storeId = authState.user?.store?.storeId;
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/chart/store/${storeId}/rent-bill-per-month`, { withCredentials: true });
        dispatch(rentBillsPerMonthSuccess(data));
        return;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          dispatch(rentBillsPerMonthFail(error.response?.data?.message || 'An error occurred'));
          return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(rentBillsPerMonthFail('An error occurred'));
        return rejectWithValue('An error occurred');
      }
    }
  );





const rentBillsPerMonthSlice = createSlice({
    name: 'rentBillsPerMonth',
    initialState,
    reducers: {
        rentBillsPerMonthRequest: (state) => {
            state.loading = true;
        },
        rentBillsPerMonthSuccess: (state, action) => {
            state.loading = false;
            state.rentBillsPerMonth = action.payload;
        },
        rentBillsPerMonthFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    rentBillsPerMonthRequest,
    rentBillsPerMonthSuccess,
    rentBillsPerMonthFail,
    clearErrors,
} = rentBillsPerMonthSlice.actions;

export default rentBillsPerMonthSlice.reducer;
