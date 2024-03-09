import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Image {
    url: string;
    public_id: string;
}

interface InventoryCartItem {
    _id: number | string;
    name: string;
    description: string;
    costPrice: number;
    sellPrice: number;
    stock: number;
    category: string;
    active: boolean | string;
    images?: Image[];
    store?: {
        storeId: string | number;
        name: string;
    }
    quantity?: number;
}

interface CartState {
    cartItems: InventoryCartItem[];
    success: boolean;
    loading: boolean;
    error: string | null;
}


interface CheckoutCartPayload {
    cartItems: InventoryCartItem[];
    totalPrice: number;
    isReserve?: boolean;
}

const initialState: CartState = {
    cartItems: [],
    success: false,
    loading: false,
    error: null
};


export const inventoryCheckout = createAsyncThunk<{ success: boolean }, CheckoutCartPayload>('cart/checkoutCart',
    async ({ cartItems, totalPrice }, { dispatch }) => {

        try {
            dispatch(checkoutRequest());
            const formattedCartItems = cartItems.map(product => ({
                _id: product._id,
                name: product.name,
                price: product.sellPrice,
                image: product.images?.[0]?.url,
                storeId: product?.store?.storeId,
                storeName: product.store?.name,
                quantity: product.quantity, 
            }));

            const order = {
                orderItems: formattedCartItems, 
                totalPrice: totalPrice,
            };
            const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/order/new-inventory-order`, order);
            dispatch(checkoutSuccess(data.success));
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch(checkoutFail(error.response?.data?.message || 'An error occurred'));
                throw error.response?.data?.message || 'An error occurred';
            }
            dispatch(checkoutFail('An error occurred'));
            throw 'An error occurred';
        }
    });



const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        checkoutRequest: (state) => {
            state.loading = true;
        },
        checkoutSuccess: (state, action) => {
            state.success = action.payload;
            state.loading = false;
        },
        checkoutFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        checkoutReset: (state) => {
            state.success = false;
            state.error = null;
        },
        clearErrors: (state) => {
            state.success = false;
            state.error = null;
        },
    },
});

export const { checkoutRequest, checkoutSuccess, checkoutFail, checkoutReset, clearErrors } = inventorySlice.actions;

export default inventorySlice.reducer;