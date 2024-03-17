import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface TransactionState {
    loading: boolean;
    isUpdated: boolean;
    error: string | null;
}

interface UpdateTransactionArgs {
    id: string | number;
    status: string;
}


const initialState: TransactionState = {
    loading: false,
    isUpdated: false,
    error: null,
};


export const updateTransaction = createAsyncThunk(
    'transaction/updateTransaction',
    async ({ id, status }: UpdateTransactionArgs, { dispatch }) => {
        try {
            const { data } = await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/api/v1/admin/transaction/update`,
                { id, status }, // Include status in the request body
                { withCredentials: true }
            );
            dispatch(updateTransactionSuccess(data.success));
            console.log(data.success);
            return data.success;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error.response?.data?.message || 'An error occurred';
            }
            throw 'An error occurred';
        }
    }
);




const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
       
        updateTransactionSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updateTransactionReset: (state) => {
            state.isUpdated = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    updateTransactionSuccess,
    updateTransactionReset,
    clearErrors,
} = transactionSlice.actions;

export default transactionSlice.reducer;
