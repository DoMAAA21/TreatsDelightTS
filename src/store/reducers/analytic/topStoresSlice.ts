import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    topStores: [],
    loading: false,
    error: null,
};

export const fetchTopStores = createAsyncThunk('topStores/fetchTopStores',async (_, { rejectWithValue, dispatch}) => {
      try {
        dispatch(topStoresRequest()); 
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/chart/top-stores`, { withCredentials: true });
        dispatch(topStoresSuccess(data));
        return;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          dispatch(topStoresFail(error.response?.data?.message || 'An error occurred'));
          return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(topStoresFail('An error occurred'));
        return rejectWithValue('An error occurred');
      }
    }
  );





const topStoresSlice = createSlice({
    name: 'topStores',
    initialState,
    reducers: {
        topStoresRequest: (state) => {
            state.loading = true;
        },
        topStoresSuccess: (state, action) => {
            state.loading = false;
            state.topStores = action.payload;
        },
        topStoresFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    topStoresRequest,
    topStoresSuccess,
    topStoresFail,
    clearErrors,
} = topStoresSlice.actions;

export default topStoresSlice.reducer;
