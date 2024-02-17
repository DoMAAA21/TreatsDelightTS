import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../index';

const initialState = {
    billsPerMonth: [],
    loading: false,
    error: null,
};

export const fetchBillsPerMonth = createAsyncThunk<void, void, { state: RootState }>('billsPerMonth/fetchAllElectricity',async (_, { rejectWithValue, dispatch, getState }) => {
      try {
        dispatch(billsPerMonthRequest()); 
        const authState = getState().auth;
        const storeId = authState.user?.store?.storeId;
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/chart/store/${storeId}/electricity-bill-per-month`, { withCredentials: true });
        dispatch(billsPerMonthSuccess(data));
        return;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          dispatch(billsPerMonthFail(error.response?.data?.message || 'An error occurred'));
          return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(billsPerMonthFail('An error occurred'));
        return rejectWithValue('An error occurred');
      }
    }
  );





const billsPerMonthSlice = createSlice({
    name: 'billsPerMonth',
    initialState,
    reducers: {
        billsPerMonthRequest: (state) => {
            state.loading = true;
        },
        billsPerMonthSuccess: (state, action) => {
            state.loading = false;
            state.billsPerMonth = action.payload;
        },
        billsPerMonthFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    billsPerMonthRequest,
    billsPerMonthSuccess,
    billsPerMonthFail,
    clearErrors,
} = billsPerMonthSlice.actions;

export default billsPerMonthSlice.reducer;
