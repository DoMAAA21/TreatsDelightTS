import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Store {
  _id: number;
  name: string;
  slogan: string;
  stall: number;
  location: string;
  active: boolean;
  rent?: number;
  water?: number;
  electricity?: number;
  maintenance?: number;
}


interface AllStoresState {
  stores: Store[];
  loading: boolean;
  error: string | null;
}

const initialState: AllStoresState = {
  stores: [],
  loading: false,
  error: null,
};

//admin control stores
export const fetchAllStores = createAsyncThunk('allStores/fetchAllStores', async (_, { rejectWithValue, dispatch }) => {
  try {
    dispatch(allStoresRequest());
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/stores`, { withCredentials: true });
    dispatch(allStoresSuccess(data.stores));
    return data.stores;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(allStoresFail(error.response?.data?.message || 'An error occurred'));
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
    dispatch(allStoresFail('An error occurred'));
    return rejectWithValue('An error occurred');
  }
});


//for shop filtering and others
export const fetchStores = createAsyncThunk('allStores/fetchAllStores', async (_, { rejectWithValue, dispatch }) => {
  try {
    dispatch(allStoresRequest());
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/stores`, { withCredentials: true });
    dispatch(allStoresSuccess(data.stores));
    return data.stores;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(allStoresFail(error.response?.data?.message || 'An error occurred'));
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
    dispatch(allStoresFail('An error occurred'));
    return rejectWithValue('An error occurred');
  }
});

export const fetchArchivedStores = createAsyncThunk('allStores/fetchArchivedStores', async (_, { rejectWithValue, dispatch }) => {
  try {
    dispatch(allStoresRequest());
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/stores/archived`, { withCredentials: true });
    dispatch(allStoresSuccess(data.stores));
    return data.stores;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(allStoresFail(error.response?.data?.message || 'An error occurred'));
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
    dispatch(allStoresFail('An error occurred'));
    return rejectWithValue('An error occurred');
  }
});



const allStoresSlice = createSlice({
  name: 'allStores',
  initialState,
  reducers: {
    allStoresRequest: (state) => {
      state.loading = true;
    },
    allStoresSuccess: (state, action) => {
      state.loading = false;
      state.stores = action.payload;
    },
    allStoresFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  allStoresRequest,
  allStoresSuccess,
  allStoresFail,
  clearErrors,
} = allStoresSlice.actions;

export default allStoresSlice.reducer;
