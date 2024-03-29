import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface RentState {
    loading: boolean;
    isUpdated: boolean;
    isDeleted: boolean;
    isRestored: boolean;
    error: string | null;
}

const initialState: RentState = {
    loading: false,
    isUpdated: false,
    isDeleted: false,
    isRestored: false,
    error: null,
};


export const deleteRent = createAsyncThunk('rent/deleteRent', async (id: string | number, { dispatch }) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/rent/${id}`, { withCredentials: true });
        dispatch(deleteRentSuccess(data.success))

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

export const restoreRent = createAsyncThunk('rent/rerentRent', async (id: string | number, { dispatch }) => {
    try {
        const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/rent/restore`, { id }, { withCredentials: true });
        dispatch(restoreRentSuccess(data.success))
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

export const updateRent = createAsyncThunk(
    'rent/updateRent',
    async ({ id, storeId }: { id: string | number, storeId: string | number }, { dispatch }) => {
      try {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/admin/rent/update-status`,
          { id, storeId },
          { withCredentials: true }
        );
        dispatch(updateRentSuccess(data.success));
        return data.success;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw error.response?.data?.message || 'An error occurred';
        }
        throw 'An error occurred';
      }
    }
  );





const rentSlice = createSlice({
    name: 'rent',
    initialState,
    reducers: {
        deleteRentSuccess: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        deleteRentReset: (state) => {
            state.isDeleted = false;
        },
        restoreRentSuccess: (state, action) => {
            state.loading = false;
            state.isRestored = action.payload;
        },
        restoreRentReset: (state) => {
            state.isRestored = false;
        },
        updateRentSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updateRentReset: (state) => {
            state.isUpdated = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    deleteRentSuccess,
    deleteRentReset,
    restoreRentSuccess,
    restoreRentReset,
    updateRentSuccess,
    updateRentReset,
    clearErrors,
} = rentSlice.actions;

export default rentSlice.reducer;
