import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface MaintenanceState {
    loading: boolean;
    isUpdated: boolean;
    isDeleted: boolean;
    isRestored: boolean;
    error: string | null;
}

const initialState: MaintenanceState = {
    loading: false,
    isUpdated: false,
    isDeleted: false,
    isRestored: false,
    error: null,
};


export const deleteMaintenance = createAsyncThunk('maintenance/deleteMaintenance', async (id: string | number, { dispatch }) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/maintenance/${id}`, { withCredentials: true });
        dispatch(deleteMaintenanceSuccess(data.success))

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

export const restoreMaintenance = createAsyncThunk('maintenance/remaintenanceMaintenance', async (id: string | number, { dispatch }) => {
    try {
        const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/maintenance/restore`, { id }, { withCredentials: true });
        dispatch(restoreMaintenanceSuccess(data.success))
        return data.success;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.message || 'An error occured';
        }
        throw 'An error occured';
    }
}
);




const maintenanceSlice = createSlice({
    name: 'maintenance',
    initialState,
    reducers: {
        deleteMaintenanceSuccess: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        deleteMaintenanceReset: (state) => {
            state.isDeleted = false;
        },
        restoreMaintenanceSuccess: (state, action) => {
            state.loading = false;
            state.isRestored = action.payload;
        },
        restoreMaintenanceReset: (state) => {
            state.isRestored = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    deleteMaintenanceSuccess,
    deleteMaintenanceReset,
    restoreMaintenanceSuccess,
    restoreMaintenanceReset,
    clearErrors,
} = maintenanceSlice.actions;

export default maintenanceSlice.reducer;
