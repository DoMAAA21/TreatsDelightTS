import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Maintenance {
    _id: number;
    storeId: string | number;
    amount: number;
    type: string;
    paymentType: string;
    cateredBy: string;
    note?: string;
    issuedAt: Date;
    paidAt: Date;
}


interface AllMaintenanceState {
    maintenances: Maintenance[];
    loading: boolean;
    error: string | null;
}

const initialState: AllMaintenanceState = {
    maintenances: [],
    loading: false,
    error: null,
};

export const fetchAllMaintenances = createAsyncThunk('allMaintenances/fetchAllMaintenances', async (id: string, { rejectWithValue, dispatch }) => {
    try {
        dispatch(allMaintenancesRequest());
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/maintenance/store/${id}`, { withCredentials: true });
        dispatch(allMaintenancesSuccess(data.maintenances));
        return data.maintenances;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(allMaintenancesFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(allMaintenancesFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
});

export const fetchArchivedMaintenances = createAsyncThunk('allMaintenances/fetchAllMaintenances', async (id: string, { rejectWithValue, dispatch }) => {
    try {
        dispatch(allMaintenancesRequest());
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/maintenance/store/${id}/archived`, { withCredentials: true });
        console.log(data)
        dispatch(allMaintenancesSuccess(data.maintenances));
        return data.maintenances;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(allMaintenancesFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(allMaintenancesFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
});



const allMaintenancesSlice = createSlice({
    name: 'allMaintenances',
    initialState,
    reducers: {
        allMaintenancesRequest: (state) => {
            state.loading = true;
        },
        allMaintenancesSuccess: (state, action) => {
            state.loading = false;
            state.maintenances = action.payload;
        },
        allMaintenancesFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    allMaintenancesRequest,
    allMaintenancesSuccess,
    allMaintenancesFail,
    clearErrors,
} = allMaintenancesSlice.actions;

export default allMaintenancesSlice.reducer;
