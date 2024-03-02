import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Permit {
    _id: number | string;
    startedAt: Date;
    expiration: Date;
 
}

interface UpdatePermitState {
    loading: boolean;
    success: boolean;
    error: string | null;
    permits: Permit[];
}

interface UpdatePermitResponse {
    success: boolean;
    permit: Permit[];
}

interface UpdatePermitData {
    storeId: number | string;
    startedAt: Date;
    expiration: Date;
    image: File | null;
}

export const updatePermit = createAsyncThunk<UpdatePermitResponse, UpdatePermitData>('updatePermit/updatePermit', async (permitData, { rejectWithValue, dispatch }) => {

    console.log(permitData);
    try {
        dispatch(updatePermitRequest());
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const { data } = await axios.patch<UpdatePermitResponse>(
            `${import.meta.env.VITE_BASE_URL}/api/v1/admin/update-permit`, permitData, { withCredentials: true, ...config }
        );

        console.log(data);

        dispatch(updatePermitSuccess(data));
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(updatePermitFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(updatePermitFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
}
);

const initialState: UpdatePermitState = {
    loading: false,
    success: false,
    error: null,
    permits: [],
};

const updatePermitSlice = createSlice({
    name: 'updatePermit',
    initialState,
    reducers: {
        updatePermitRequest: (state) => {
            state.loading = true;
        },
        updatePermitSuccess: (state, action: PayloadAction<UpdatePermitResponse>) => {
            state.loading = false;
            state.success = action.payload.success;
            state.permits = action.payload.permit;
        },
        updatePermitFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        updatePermitReset: (state) => {
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
    updatePermitRequest,
    updatePermitSuccess,
    updatePermitFail,
    updatePermitReset,
} = updatePermitSlice.actions;

export default updatePermitSlice.reducer;
