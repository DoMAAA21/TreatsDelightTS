import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Permit {
    _id: number | string;
    startedAt: Date;
    expiration: Date;
 
}

interface NewPermitState {
    loading: boolean;
    success: boolean;
    error: string | null;
    permits: Permit[];
}

interface NewPermitResponse {
    success: boolean;
    permit: Permit[];
}

interface NewPermitData {
    storeId: number | string;
    startedAt: Date;
    expiration: Date;
}

export const newPermit = createAsyncThunk<NewPermitResponse, NewPermitData>('newPermit/newPermit', async (permitData, { rejectWithValue, dispatch }) => {
    try {
        dispatch(newPermitRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post<NewPermitResponse>(
            `${import.meta.env.VITE_BASE_URL}/api/v1/admin/permit/new`, permitData, { withCredentials: true, ...config }
        );
        dispatch(newPermitSuccess(data));
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(newPermitFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(newPermitFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
}
);

const initialState: NewPermitState = {
    loading: false,
    success: false,
    error: null,
    permits: [],
};

const newPermitSlice = createSlice({
    name: 'newPermit',
    initialState,
    reducers: {
        newPermitRequest: (state) => {
            state.loading = true;
        },
        newPermitSuccess: (state, action: PayloadAction<NewPermitResponse>) => {
            state.loading = false;
            state.success = action.payload.success;
            state.permits = action.payload.permit;
        },
        newPermitFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        newPermitReset: (state) => {
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
    newPermitRequest,
    newPermitSuccess,
    newPermitFail,
    newPermitReset,
} = newPermitSlice.actions;

export default newPermitSlice.reducer;
