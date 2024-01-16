import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../index';
import axios from 'axios';

interface ProductImage {
  index?: number;
  url?: string;
}

interface Product {
  _id: number | string;
  name: string;
  description: string;
  costPrice: number;
  sellPrice: number;
  stock: number;
  category: string;
  active: boolean | string;
  images: ProductImage[];
}

interface AllProductsState {
  products: Product[];
  items: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean; 
  currentPage: number; 
  totalPages: number;
}

const initialState: AllProductsState = {
  products: [],
  items: [],
  loading: false,
  error: null,
  hasMore: true,
  currentPage: 1,
  totalPages: 1,
}

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


export const fetchAllItems = createAsyncThunk<Product[], { page: number; searchQuery?: string }, { state: RootState }>(
  'allItems/fetchAllItems',
  async ({ page, searchQuery }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(allItemsRequest());

      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/allItemsWeb?page=${page}${searchQuery ? `&searchQuery=${searchQuery}` : ''}`;

      const { data } = await axios.get(url);
   
      if (page === 1) {
        dispatch(allItemsSuccess(data));
      } else {
        dispatch(concatItems(data));
      }

      dispatch(setCurrentPage(page));

      return data.products;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(allItemsFail(error.response?.data?.message || 'An error occurred'));
        return rejectWithValue(error.response?.data?.message || 'An error occurred');
      }
      dispatch(allItemsFail('An error occurred'));
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
    allItemsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.products;
      state.hasMore = action.payload.hasMore;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    allProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    allItemsRequest: (state) => {
      state.loading = true;
    },
    allItemsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    concatItems: (state, action) => {
      state.items = state.items.concat(action.payload.products);
      state.hasMore = action.payload.hasMore;
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
  allProductsRequest,
  allProductsSuccess,
  allProductsFail,
  allItemsRequest,
  allItemsSuccess,
  allItemsFail,
  clearErrors,
  setHasMore,
  setCurrentPage,
  concatItems,
  clearItems
} = allProductsSlice.actions;

export default allProductsSlice.reducer;
