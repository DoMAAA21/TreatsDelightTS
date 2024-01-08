import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../index';
import axios from 'axios';

interface Product {
    _id: number | string;
    name: string;
    description: string;
    costPrice: number;
    sellPrice: number;
    stock: number;
    category: string;
    active: boolean | string;
}


interface AllProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: AllProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchAllProducts = createAsyncThunk<Product[], void, { state: RootState }>(
    'allProducts/fetchAllProducts',
    async (_, { rejectWithValue, dispatch, getState }) => {
        try {
            dispatch(allProductsRequest());
            const authState = getState().auth;
            const storeId = authState.user?.store?.storeId;
            if (!storeId) {
                return dispatch(allProductsFail('Store not found'));
            }
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/store/${storeId}/products`, { withCredentials: true });
            dispatch(allProductsSuccess(data.products));
            return data.products;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch(allProductsFail(error.response?.data?.message || 'An error occurred'));
                return rejectWithValue(error.response?.data?.message || 'An error occurred');
            }
            dispatch(allProductsFail('An error occurred'));
            return rejectWithValue('An error occurred');
        }
    }
);

export const fetchAllMeals = createAsyncThunk<Product[], void, { state: RootState }>(
  'allProducts/fetchAllProducts',
  async (_, { rejectWithValue, dispatch, getState }) => {
      try {
          dispatch(allProductsRequest());
          const authState = getState().auth;
          const storeId = authState.user?.store?.storeId;
          if (!storeId) {
              return dispatch(allProductsFail('Store not found'));
          }
          const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/store/${storeId}/meals`, { withCredentials: true });
          dispatch(allProductsSuccess(data.products));
          return data.products;
      } catch (error) {
          if (axios.isAxiosError(error)) {
              dispatch(allProductsFail(error.response?.data?.message || 'An error occurred'));
              return rejectWithValue(error.response?.data?.message || 'An error occurred');
          }
          dispatch(allProductsFail('An error occurred'));
          return rejectWithValue('An error occurred');
      }
  }
);


const allProductsSlice = createSlice({
  name: 'allProducts',
  initialState,
  reducers: {
    allProductsRequest: (state) => {
      state.loading = true;
    },
    allProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    allProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  allProductsRequest,
  allProductsSuccess,
  allProductsFail,
  clearErrors,
} = allProductsSlice.actions;

export default allProductsSlice.reducer;
