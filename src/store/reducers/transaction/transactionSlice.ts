import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface TransactionState {
    loading: boolean;
    isUpdated: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    loading: false,
    isUpdated: false,
    error: null,
};



export const updateTransaction = createAsyncThunk('transaction/retransactionTransaction', async (id: string | number, { dispatch }) => {
    try {
        const { data } = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/transaction/update`, { id }, { withCredentials: true });
        dispatch(updateTransactionSuccess(data.success))
        console.log(data.success)
        return data.success;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.message || 'An error occured';
        }
        throw 'An error occured';
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
