import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../index';

const initialState = {
    electricBillsPerMonth: [],
    loading: false,
    error: null,
};

export const fetchElectricityBillsPerMonth = createAsyncThunk<void, void, { state: RootState }>('billsPerMonth/fetchAllElectricity',async (_, { rejectWithValue, dispatch, getState }) => {
      try {
        dispatch(elecBillsPerMonthRequest()); 
        const authState = getState().auth;
        const storeId = authState.user?.store?.storeId;
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/chart/store/${storeId}/electricity-bill-per-month`, { withCredentials: true });
        dispatch(elecBillsPerMonthSuccess(data));
        return;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          dispatch(elecBillsPerMonthFail(error.response?.data?.message || 'An error occurred'));
          return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(elecBillsPerMonthFail('An error occurred'));
        return rejectWithValue('An error occurred');
      }
    }
  );





const electricBillsPerMonth = createSlice({
    name: 'electricBillsPerMonth',
    initialState,
    reducers: {
        elecBillsPerMonthRequest: (state) => {
            state.loading = true;
        },
        elecBillsPerMonthSuccess: (state, action) => {
            state.loading = false;
            state.electricBillsPerMonth = action.payload;
        },
        elecBillsPerMonthFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
  elecBillsPerMonthRequest,
    elecBillsPerMonthSuccess,
    elecBillsPerMonthFail,
    clearErrors,
} = electricBillsPerMonth.actions;

export default electricBillsPerMonth.reducer;
