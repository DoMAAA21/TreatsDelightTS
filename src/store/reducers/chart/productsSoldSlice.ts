import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../index';

const initialState = {
    productsSold: [],
    loading: false,
    error: null,
};

export const fetchProductsSold = createAsyncThunk<void, void, { state: RootState }>('productsSold/fetchProductsSold',async (_, { rejectWithValue, dispatch, getState }) => {
      try {
        dispatch(productsSoldRequest()); 
        const authState = getState().auth;
        const storeId = authState.user?.store?.storeId;
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/chart/store/${storeId}/products-sold`, { withCredentials: true });
        dispatch(productsSoldSuccess(data));
        return;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          dispatch(productsSoldFail(error.response?.data?.message || 'An error occurred'));
          return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(productsSoldFail('An error occurred'));
        return rejectWithValue('An error occurred');
      }
    }
  );





const productsSoldSlice = createSlice({
    name: 'productsSold',
    initialState,
    reducers: {
        productsSoldRequest: (state) => {
            state.loading = true;
        },
        productsSoldSuccess: (state, action) => {
            state.loading = false;
            state.productsSold = action.payload;
        },
        productsSoldFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    productsSoldRequest,
    productsSoldSuccess,
    productsSoldFail,
    clearErrors,
} = productsSoldSlice.actions;

export default productsSoldSlice.reducer;
