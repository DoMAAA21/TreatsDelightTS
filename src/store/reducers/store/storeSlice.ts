import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface StoreState {
    loading: boolean;
    isUpdated: boolean;
    isDeleted: boolean;
    error: string | null;
}

const initialState: StoreState = {
    loading: false,
    isUpdated: false,
    isDeleted: false,
    error: null,
};


interface StoreData {
    _id?: number;
    name: string;
    slogan: string;
    stall: number;
    location: string;
    active: boolean | string;
    logo?: File | Blob | string | null;
}


export const deleteStore = createAsyncThunk('store/deleteStore', async (id: string | number, { dispatch }) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/store/${id}`, { withCredentials: true });
        dispatch(deleteStoreSuccess(data.success))
        return data.success;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.message || 'An error occured';
        }
        throw 'An error occured';
    }
}
);

export const updateStore = createAsyncThunk<boolean, { id: string | number; storeData: StoreData }>('store/updateStore', async ({ id, storeData }, { dispatch, rejectWithValue }) => {
    try {

        dispatch(updateStoreRequest());

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/store/${id}`, storeData, { withCredentials: true, ...config });

        dispatch(updateStoreSuccess(data.success));
        return data.success;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(updateStoreFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }

        dispatch(updateStoreFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
});




const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        updateStoreRequest: (state) => {
            state.loading = true;
        },
        updateStoreSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        deleteStoreSuccess: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        updateStoreReset: (state) => {
            state.isUpdated = false;
            state.error = null;
        },
        deleteStoreReset: (state) => {
            state.isDeleted = false;
        },
        updateStoreFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    updateStoreRequest,
    updateStoreSuccess,
    deleteStoreSuccess,
    updateStoreReset,
    deleteStoreReset,
    updateStoreFail,
    clearErrors,
} = storeSlice.actions;

export default storeSlice.reducer;
