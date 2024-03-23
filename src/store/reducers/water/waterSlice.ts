import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface WaterState {
    loading: boolean;
    isUpdated: boolean;
    isDeleted: boolean;
    isRestored: boolean;
    error: string | null;
}

const initialState: WaterState = {
    loading: false,
    isUpdated: false,
    isDeleted: false,
    isRestored: false,
    error: null,
};


export const deleteWater = createAsyncThunk('water/deleteWater', async (id: string | number, { dispatch }) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/water/${id}`, { withCredentials: true });
        dispatch(deleteWaterSuccess(data.success))

        return data.success;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.message || 'An error occured';
        }
        throw 'An error occured';
    }
}
);

export const restoreWater = createAsyncThunk('water/restoreWater', async (id: string | number, { dispatch }) => {
    try {
        const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/water/restore/`, { id }, { withCredentials: true });
        dispatch(restoreWaterSuccess(data.success))
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

export const updateWater = createAsyncThunk(
    'water/updateWater',
    async ({ id, storeId }: { id: string | number, storeId: string | number }, { dispatch }) => {
      try {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/admin/water/update-status`,
          { id, storeId },
          { withCredentials: true }
        );
        dispatch(updateWaterSuccess(data.success));
        return data.success;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw error.response?.data?.message || 'An error occurred';
        }
        throw 'An error occurred';
      }
    }
  );


const waterSlice = createSlice({
    name: 'water',
    initialState,
    reducers: {
        deleteWaterSuccess: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        deleteWaterReset: (state) => {
            state.isDeleted = false;
        },
        restoreWaterSuccess: (state, action) => {
            state.loading = false;
            state.isRestored = action.payload;
        },
        updateWaterSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updateWaterReset: (state) => {
            state.isUpdated = false;
        },
        restoreWaterReset: (state) => {
            state.isRestored = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    deleteWaterSuccess,
    deleteWaterReset,
    restoreWaterSuccess,
    restoreWaterReset,
    updateWaterSuccess,
    updateWaterReset,
    clearErrors,
} = waterSlice.actions;

export default waterSlice.reducer;
