import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Store {
    _id: number;
    name: string;
    slogan: string;
    stall: number;
    location: string;
    active: boolean ;
}

interface NewStoreState {
    loading: boolean;
    success: boolean;
    error: string | null;
    stores: Store[];
}

interface NewStoreResponse {
    success: boolean;
    store: Store[];
}

interface NewStoreData {
    name: string;
    slogan: string;
    stall: number;
    location: string;
    active: boolean | string;
    logo: File | Blob | String | null;
}

export const newStore = createAsyncThunk<NewStoreResponse, NewStoreData>('newStore/newStore', async (storeData, { rejectWithValue, dispatch }) => {
    try {

        dispatch(newStoreRequest());
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const { data } = await axios.post<NewStoreResponse>(
            `${import.meta.env.VITE_BASE_URL}/api/v1/admin/store/new`, storeData, { withCredentials: true, ...config }
        );
        dispatch(newStoreSuccess(data));
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(newStoreFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(newStoreFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
}
);

const initialState: NewStoreState = {
    loading: false,
    success: false,
    error: null,
    stores: [],
};

const newStoreSlice = createSlice({
    name: 'newStore',
    initialState,
    reducers: {
        newStoreRequest: (state) => {
            state.loading = true;
        },
        newStoreSuccess: (state, action: PayloadAction<NewStoreResponse>) => {
            state.loading = false;
            state.success = action.payload.success;
            state.stores = action.payload.store;
        },
        newStoreFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        newStoreReset: (state) => {
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
    // updateField,
    newStoreRequest,
    newStoreSuccess,
    newStoreFail,
    newStoreReset,
} = newStoreSlice.actions;

export default newStoreSlice.reducer;
