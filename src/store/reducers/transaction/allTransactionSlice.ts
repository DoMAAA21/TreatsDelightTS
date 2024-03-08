import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../index';
import axios from 'axios';


interface Transaction {
  orderItems:{
    id: number | string;
    name: string;
    quantity: string;
    price: number;
    status : string;
  },
  user: {
    name: string;
  }
}

interface AllTransactionsState {
  transactions: Transaction[];
  items: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: AllTransactionsState = {
  transactions: [],
  items: [],
  loading: false,
  error: null,
}

export const fetchAllTransactions = createAsyncThunk<Transaction[], void, { state: RootState }>(
  'allTransactions/fetchAllTransactions',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      dispatch(allTransactionsRequest());
      const authState = getState().auth;
      const storeId = authState.user?.store?.storeId;
      if (!storeId) {
        return dispatch(allTransactionsFail('Store not found'));
      }
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/store/${storeId}/transactions`, { withCredentials: true });
      dispatch(allTransactionsSuccess(data.transactions));
      console.log(data.transactions);
      return data.transactions;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(allTransactionsFail(error.response?.data?.message || 'An error occurred'));
        return rejectWithValue(error.response?.data?.message || 'An error occurred');
      }
      dispatch(allTransactionsFail('An error occurred'));
      return rejectWithValue('An error occurred');
    }
  }
);






const allTransactionsSlice = createSlice({
  name: 'allTransactions',
  initialState,
  reducers: {
    allTransactionsRequest: (state) => {
      state.loading = true;
    },
    allTransactionsSuccess: (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    },
  
    allTransactionsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearItems: (state) => {
      state.items = [];
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  allTransactionsRequest,
  allTransactionsSuccess,
  allTransactionsFail,
  clearErrors,
  clearItems
} = allTransactionsSlice.actions;

export default allTransactionsSlice.reducer;
