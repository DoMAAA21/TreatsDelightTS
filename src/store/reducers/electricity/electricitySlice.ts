import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ElectricityState {
    loading: boolean;
    isUpdated: boolean;
    isDeleted: boolean;
    isRestored: boolean;
    error: string | null;
}

const initialState: ElectricityState = {
    loading: false,
    isUpdated: false,
    isDeleted: false,
    isRestored: false,
    error: null,
};


export const deleteElectricity = createAsyncThunk('electricity/deleteElectricity', async (id: string | number, { dispatch }) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/electricity/${id}`, { withCredentials: true });
        dispatch(deleteElectricitySuccess(data.success))

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

export const restoreElectricity = createAsyncThunk('electricity/reelectricityElectricity', async (id: string | number, { dispatch }) => {
    try {
        const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/electricity/restore`, { id }, { withCredentials: true });
        dispatch(restoreElectricitySuccess(data.success))
        return data.success;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.message || 'An error occured';
        }
        throw 'An error occured';
    }
}
);




const electricitySlice = createSlice({
    name: 'electricity',
    initialState,
    reducers: {
        deleteElectricitySuccess: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        deleteElectricityReset: (state) => {
            state.isDeleted = false;
        },
        restoreElectricitySuccess: (state, action) => {
            state.loading = false;
            state.isRestored = action.payload;
        },
        restoreElectricityReset: (state) => {
            state.isRestored = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    deleteElectricitySuccess,
    deleteElectricityReset,
    restoreElectricitySuccess,
    restoreElectricityReset,
    clearErrors,
} = electricitySlice.actions;

export default electricitySlice.reducer;
