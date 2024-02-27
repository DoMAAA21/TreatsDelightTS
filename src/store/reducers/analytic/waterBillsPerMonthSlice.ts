import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../index';

const initialState = {
    waterBillsPerMonth: [],
    loading: false,
    error: null,
};

export const fetchWaterBillsPerMonth = createAsyncThunk<void, void, { state: RootState }>('billsPerMonth/fetchAllWater',async (_, { rejectWithValue, dispatch, getState }) => {
      try {
        dispatch(waterBillsPerMonthRequest()); 
        const authState = getState().auth;
        const storeId = authState.user?.store?.storeId;
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/chart/store/${storeId}/water-bill-per-month`, { withCredentials: true });
        dispatch(waterBillsPerMonthSuccess(data));
        return;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          dispatch(waterBillsPerMonthFail(error.response?.data?.message || 'An error occurred'));
          return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(waterBillsPerMonthFail('An error occurred'));
        return rejectWithValue('An error occurred');
      }
    }
  );





const waterBillsPerMonthSlice = createSlice({
    name: 'waterBillsPerMonth',
    initialState,
    reducers: {
        waterBillsPerMonthRequest: (state) => {
            state.loading = true;
        },
        waterBillsPerMonthSuccess: (state, action) => {
            state.loading = false;
            state.waterBillsPerMonth = action.payload;
        },
        waterBillsPerMonthFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    waterBillsPerMonthRequest,
    waterBillsPerMonthSuccess,
    waterBillsPerMonthFail,
    clearErrors,
} = waterBillsPerMonthSlice.actions;

export default waterBillsPerMonthSlice.reducer;
