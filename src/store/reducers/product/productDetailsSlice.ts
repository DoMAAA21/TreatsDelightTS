import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductImage {
    index?: number;
    url?: string;
}


interface ProductDetails {
    product: {
        _id? : string | number;
        name: string;
        description: string;
        costPrice: number;
        sellPrice: number;
        stock: number;
        category: string;
        halal: boolean | string;
        active: boolean | string;
        nutrition:{
            calories: number;
            protein: number;
            carbs: number;
            fat: number;
            fiber: number;
            sugar: number;
            sodium: number;
            cholesterol: number;
        }
        images: ProductImage[] ;

    };
    loading: boolean;
    error: string | null;
}

const initialState: ProductDetails = {
    product: {
        name: '',
        description: '',
        costPrice: 0,
        sellPrice: 0,
        stock: 0,
        category: '',
        active: '',
        halal: '',
        images: [],
        nutrition:{
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            fiber: 0,
            sugar: 0,
            sodium: 0,
            cholesterol: 0
        }
    },
    loading: false,
    error: null,
};

export const getProductDetails = createAsyncThunk('productDetails/getProductDetails', async (id: string | undefined, { dispatch, rejectWithValue }) => {
    try {
        dispatch(productDetailsRequest());

        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/product/${id}`, { withCredentials: true });
        dispatch(productDetailsSuccess(data.product));
        return data.product;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(productDetailsFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(productDetailsFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
});

export const getItemDetails = createAsyncThunk('itemDetails/getItemDetails', async (id: string | undefined, { dispatch, rejectWithValue }) => {
    try {
        dispatch(productDetailsRequest());

        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/product/${id}`);
        dispatch(productDetailsSuccess(data.product));
        return data.product;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(productDetailsFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(productDetailsFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
});

const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    reducers: {
        productDetailsRequest: (state) => {
            state.loading = true;
        },
        productDetailsSuccess: (state, action: PayloadAction<ProductDetails['product']>) => {
            state.loading = false;
            state.product = action.payload;
        },
        productDetailsFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
        clearProduct: (state) => {
            state.error = null;
            state.product = {
                name: '',
                description: '',
                costPrice: 0,
                sellPrice: 0,
                stock: 0,
                category: '',
                active: '',
                halal: '',
                images: [],
                nutrition:{
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fat: 0,
                    fiber: 0,
                    sugar: 0,
                    sodium: 0,
                    cholesterol: 0,
                }
            };
        },
    },
});

export const {
    productDetailsRequest,
    productDetailsSuccess,
    productDetailsFail,
    clearErrors,
    clearProduct,
} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
