import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface StoreDetails {
    store: {
        _id?: string | number;
        name: string;
        slogan: string;
        stall: number;
        location: string;
        active: boolean;
        logo?: {
            url?: string;
        };
        rent: number;
        electricity: number;
        water: number;
    };
    loading: boolean;
    error: string | null;
}

const initialState: StoreDetails = {
    store: {
        name: '',
        slogan: '',
        stall: 0,
        location: '',
        active: false,
        rent: 0,
        electricity: 0,
        water: 0,

    },

    loading: false,
    error: null,
};

export const getStoreDetails = createAsyncThunk('storeDetails/getStoreDetails', async (id: string | number |undefined, { dispatch, rejectWithValue }) => {
    try {
        dispatch(storeDetailsRequest());

        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/store/${id}`, { withCredentials: true });
        dispatch(storeDetailsSuccess(data.store));
        return data.store;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(storeDetailsFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(storeDetailsFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
});

const storeDetailsSlice = createSlice({
    name: 'storeDetails',
    initialState,
    reducers: {
        storeDetailsRequest: (state) => {
            state.loading = true;
        },
        storeDetailsSuccess: (state, action: PayloadAction<StoreDetails['store']>) => {
            state.loading = false;
            state.store = action.payload;
        },
        storeDetailsFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
        clearStore: (state) => {
            state.error = null;
            state.store = {
                name: '',
                slogan: '',
                stall: 0,
                location: '',
                active: false,
                rent: 0,
                electricity: 0,
                water: 0,
            };
        },
    },
});

export const {
    storeDetailsRequest,
    storeDetailsSuccess,
    storeDetailsFail,
    clearErrors,
    clearStore,
} = storeDetailsSlice.actions;

export default storeDetailsSlice.reducer;
