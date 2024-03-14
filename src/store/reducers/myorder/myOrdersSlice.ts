import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/index';
import axios from 'axios';

interface MyOrders {
    orderItems: {
        id: number;
        name: string;
        quantity: number;
        price: number;
        date: string;
        status: string;
        storeName: string;
    },
    user:{
        id: string | number;
        name: string
    }
    createdAt: Date;

}


interface AllMyOrderssState {
    orders: MyOrders[];
    loading: boolean;
    error: string | null;
}

const initialState: AllMyOrderssState = {
    orders: [],
    loading: false,
    error: null,
};

export const fetchAllMyOrders = createAsyncThunk<MyOrders[], void, { state: RootState }>(
    'allMyOrderss/fetchAllMyOrders',
    async (_, { rejectWithValue, dispatch, getState }) => {
        try {
            dispatch(allMyOrderssRequest());
            const authState = getState().auth;
            const userId = authState.user?._id;
            if (!userId) {
                return dispatch(allMyOrderssFail('User not found'));
            }
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/${userId}/transactions`, { withCredentials: true });
            dispatch(allMyOrderssSuccess(data.orders));
            return data.orders;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch(allMyOrderssFail(error.response?.data?.message || 'An error occurred'));
                return rejectWithValue(error.response?.data?.message || 'An error occurred');
            }
            dispatch(allMyOrderssFail('An error occurred'));
            return rejectWithValue('An error occurred');
        }
    }
);



const allMyOrdersSlice = createSlice({
    name: 'allMyOrderss',
    initialState,
    reducers: {
        allMyOrderssRequest: (state) => {
            state.loading = true;
        },
        allMyOrderssSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        allMyOrderssFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    allMyOrderssRequest,
    allMyOrderssSuccess,
    allMyOrderssFail,
    clearErrors,
} = allMyOrdersSlice.actions;

export default allMyOrdersSlice.reducer;
