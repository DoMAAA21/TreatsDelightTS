import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../../store/index';

interface Product {
    _id: number;
    name: string;
    description: string;
    costPrice: number;
    sellPrice: number;
    stock: number;
    category: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
    cholesterol: number;
    active: boolean | string;
    halal?: boolean | string;
}

interface NewProductState {
    loading: boolean;
    success: boolean;
    error: string | null;
    products: Product[];
}

interface NewProductResponse {
    success: boolean;
    product: Product[];
}

interface NewProductData {
    name: string;
    description: string;
    costPrice: number;
    sellPrice: number;
    stock?: number;
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
    firstImage: File | String | null; //first image is mandatory
    secondImage?: File | String | null;  //remaining are not
    thirdImage?: File | String | null;
}

export const newProduct = createAsyncThunk<NewProductResponse, NewProductData, { state: RootState }>('newProduct/newProduct', async (productData, { rejectWithValue, dispatch, getState }) => {
    try {
        dispatch(newProductRequest());
        const authState = getState().auth;
        const storeId = authState.user?.store?.storeId;
        const storeName = authState.user?.store?.name;
        const storeDetails = {
            storeId,
            storeName: storeName,
        };
        const formProductData = {
            ...productData,
            ...storeDetails
        }

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const { data } = await axios.post<NewProductResponse>(
            `${import.meta.env.VITE_BASE_URL}/api/v1/admin/product/new`, formProductData, { withCredentials: true, ...config }
        );
        console.log(data);
        dispatch(newProductSuccess(data));
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(newProductFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(newProductFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
}
);

const initialState: NewProductState = {
    loading: false,
    success: false,
    error: null,
    products: [],
};

const newProductSlice = createSlice({
    name: 'newProduct',
    initialState,
    reducers: {
        newProductRequest: (state) => {
            state.loading = true;
        },
        newProductSuccess: (state, action: PayloadAction<NewProductResponse>) => {
            state.loading = false;
            state.success = action.payload.success;
            state.products = action.payload.product;
        },
        newProductFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        newProductReset: (state) => {
            state.success = false;
            state.error = null;
        },
        clearErrors: (state) => {
            state.success = false;
            state.error = null;
        },
    },

});

export const {
    newProductRequest,
    newProductSuccess,
    newProductFail,
    newProductReset,
} = newProductSlice.actions;

export default newProductSlice.reducer;
