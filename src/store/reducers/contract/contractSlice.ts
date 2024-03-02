import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Contract {
    _id: number | string;
    startedAt: Date;
    expiration: Date;
 
}

interface UpdateContractState {
    loading: boolean;
    success: boolean;
    error: string | null;
    contracts: Contract[];
}

interface UpdateContractResponse {
    success: boolean;
    contract: Contract[];
}

interface UpdateContractData {
    storeId: number | string;
    startedAt: Date;
    expiration: Date;
    file: File | null;
}

export const updateContract = createAsyncThunk<UpdateContractResponse, UpdateContractData>('updateContract/updateContract', async (contractData, { rejectWithValue, dispatch }) => {
    try {
        dispatch(updateContractRequest());
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const { data } = await axios.patch<UpdateContractResponse>(
            `${import.meta.env.VITE_BASE_URL}/api/v1/admin/update-contract`, contractData, { withCredentials: true, ...config }
        );

        dispatch(updateContractSuccess(data));
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(updateContractFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(updateContractFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
}
);

const initialState: UpdateContractState = {
    loading: false,
    success: false,
    error: null,
    contracts: [],
};

const updateContractSlice = createSlice({
    name: 'updateContract',
    initialState,
    reducers: {
        updateContractRequest: (state) => {
            state.loading = true;
        },
        updateContractSuccess: (state, action: PayloadAction<UpdateContractResponse>) => {
            state.loading = false;
            state.success = action.payload.success;
            state.contracts = action.payload.contract;
        },
        updateContractFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateContractReset: (state) => {
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
    updateContractRequest,
    updateContractSuccess,
    updateContractFail,
    updateContractReset,
} = updateContractSlice.actions;

export default updateContractSlice.reducer;
