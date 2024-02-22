import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Maintenance {
    _id: number;
    amount: number;
    type: string;
    note?: string;
}

interface NewMaintenanceState {
    loading: boolean;
    success: boolean;
    error: string | null;
    maintenances: Maintenance[];
}

interface NewMaintenanceResponse {
    success: boolean;
    maintenance: Maintenance[];
}

interface NewMaintenanceData {
    amount: number;
    type: string;
    note?: string;
}

export const newMaintenance = createAsyncThunk<NewMaintenanceResponse, NewMaintenanceData>('newMaintenance/newMaintenance', async (maintenanceData, { rejectWithValue, dispatch }) => {
    try {

        dispatch(newMaintenanceRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post<NewMaintenanceResponse>(
            `${import.meta.env.VITE_BASE_URL}/api/v1/admin/maintenance/new`, maintenanceData, { withCredentials: true, ...config }
        );
        dispatch(newMaintenanceSuccess(data));
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(newMaintenanceFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(newMaintenanceFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
}
);

const initialState: NewMaintenanceState = {
    loading: false,
    success: false,
    error: null,
    maintenances: [],
};

const newMaintenanceSlice = createSlice({
    name: 'newMaintenance',
    initialState,
    reducers: {
        newMaintenanceRequest: (state) => {
            state.loading = true;
        },
        newMaintenanceSuccess: (state, action: PayloadAction<NewMaintenanceResponse>) => {
            state.loading = false;
            state.success = action.payload.success;
            state.maintenances = action.payload.maintenance;
        },
        newMaintenanceFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        newMaintenanceReset: (state) => {
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
    newMaintenanceRequest,
    newMaintenanceSuccess,
    newMaintenanceFail,
    newMaintenanceReset,
} = newMaintenanceSlice.actions;

export default newMaintenanceSlice.reducer;
