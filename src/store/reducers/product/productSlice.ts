import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductState {
    loading: boolean;
    isUpdated: boolean;
    isDeleted: boolean;
    error: string | null;
}

const initialState: ProductState = {
    loading: false,
    isUpdated: false,
    isDeleted: false,
    error: null,
};


interface ProductData {
    name: string;
    description: string;
    costPrice: number;
    sellPrice: number;
    stock: number;
    category: string;
    active: boolean | string;
    halal?: boolean | string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
    cholesterol: number;
    avatar?: File | Blob | string | null;
}


export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id: string | number, { dispatch }) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/product/${id}`, { withCredentials: true });
        dispatch(deleteProductSuccess(data.success))
        return data.success;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.message || 'An error occured';
        }
        throw 'An error occured';
    }
}
);


export const updateProduct = createAsyncThunk<boolean, { id: string | number; productData: ProductData }>('product/updateProduct', async ({ id, productData }, { dispatch, rejectWithValue }) => {
    try {
  
      dispatch(updateProductRequest());
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/product/${id}`, productData, { withCredentials: true, ...config });
      
      dispatch(updateProductSuccess(data.success));
      return data.success;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(updateProductFail(error.response?.data?.message || 'An error occurred'));
        return rejectWithValue(error.response?.data?.message || 'An error occurred');
      }
      
      dispatch(updateProductFail('An error occurred'));
      return rejectWithValue('An error occurred');
    }
  });




const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        updateProductRequest: (state) => {
            state.loading = true;
        },
        updateProductSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        deleteProductSuccess: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        updateProductReset: (state) => {
            state.isUpdated = false;
            state.error = null;
        },
        deleteProductReset: (state) => {
            state.isDeleted = false;
        },
        updateProductFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    updateProductRequest,
    updateProductSuccess,
    deleteProductSuccess,
    updateProductReset,
    deleteProductReset,
    updateProductFail,
    clearErrors,
} = productSlice.actions;

export default productSlice.reducer;
