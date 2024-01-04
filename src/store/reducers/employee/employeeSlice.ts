import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface EmployeeState {
  loading: boolean;
  isUpdated: boolean;
  isDeleted: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  loading: false,
  isUpdated: false,
  isDeleted: false,
  error: null,
};


interface EmployeeData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  religion: string;
  role: string;
  avatar?: File | Blob | string | null;
}


export const deleteEmployee = createAsyncThunk('employee/deleteEmployee', async (id: string | number, { dispatch }) => {
  try {
    const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/employee/${id}`, { withCredentials: true });
    dispatch(deleteEmployeeSuccess(data.success))
    return data.success;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || 'An error occured';
    }
    throw 'An error occured';
  }
}
);

export const updateEmployee = createAsyncThunk<boolean, { id: string | number; employeeData: EmployeeData }>('employee/updateEmployee', async ({ id, employeeData }, { dispatch, rejectWithValue }) => {
  try {

    dispatch(updateEmployeeRequest());

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/employee/${id}`, employeeData, { withCredentials: true, ...config });
    
    dispatch(updateEmployeeSuccess(data.success));
    return data.success;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(updateEmployeeFail(error.response?.data?.message || 'An error occurred'));
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
    
    dispatch(updateEmployeeFail('An error occurred'));
    return rejectWithValue('An error occurred');
  }
});




const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    updateEmployeeRequest: (state) => {
      state.loading = true;
    },
    updateEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    deleteEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    updateEmployeeReset: (state) => {
      state.isUpdated = false;
      state.error = null;
    },
    deleteEmployeeReset: (state) => {
      state.isDeleted = false;
    },
    updateEmployeeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  updateEmployeeRequest,
  updateEmployeeSuccess,
  deleteEmployeeSuccess,
  updateEmployeeReset,
  deleteEmployeeReset,
  updateEmployeeFail,
  clearErrors,
} = employeeSlice.actions;

export default employeeSlice.reducer;
