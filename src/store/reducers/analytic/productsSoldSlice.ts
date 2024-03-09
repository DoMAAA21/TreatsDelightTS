import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../index';
import { allProductsFail } from '../product/allProductsSlice';

const initialState = {
  productsSold: [],
  allProductsSold: [],
  allTotalSale: [],
  loading: false,
  error: null,
};

export const fetchProductsSold = createAsyncThunk<void, void, { state: RootState }>('productsSold/fetchProductsSold', async (_, { rejectWithValue, dispatch, getState }) => {
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


export const fetchAllProductsSold = createAsyncThunk('productsSold/fetchProductsSold', async (_, { rejectWithValue, dispatch }) => {
  try {
    dispatch(allProductsSoldRequest());

    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/chart/all-products-sold`, { withCredentials: true });
    dispatch(allProductsSoldSuccess(data));
    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(allProductsSoldFail(error.response?.data?.message || 'An error occurred'));
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
    dispatch(allProductsFail('An error occurred'));
    return rejectWithValue('An error occurred');
  }
}
);


export const fetchAllTotalSale = createAsyncThunk('productsSold/fetchProductsSold', async (_, { rejectWithValue, dispatch }) => {
  try {
    dispatch(allTotalSaleRequest());

    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/chart/all-total-sale`, { withCredentials: true });
    dispatch(allTotalSaleSuccess(data));
    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(allTotalSaleSoldFail(error.response?.data?.message || 'An error occurred'));
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
    dispatch(allTotalSaleSoldFail('An error occurred'));
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
    allProductsSoldRequest: (state) => {
      state.loading = true;
    },
    allProductsSoldSuccess: (state, action) => {
      state.loading = false;
      state.allProductsSold = action.payload;
    },
    allProductsSoldFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    allTotalSaleRequest: (state) => {
      state.loading = true;
    },
    allTotalSaleSuccess: (state, action) => {
      state.loading = false;
      state.allTotalSale = action.payload;
    },
    allTotalSaleSoldFail: (state, action) => {
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
  allProductsSoldRequest,
  allProductsSoldSuccess,
  allProductsSoldFail,
  allTotalSaleRequest,
  allTotalSaleSuccess,
  allTotalSaleSoldFail,
  clearErrors,
} = productsSoldSlice.actions;

export default productsSoldSlice.reducer;
