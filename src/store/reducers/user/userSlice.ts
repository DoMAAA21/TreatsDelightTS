import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginSuccess } from '../auth/authenticationSlice';
interface UserState {
  loading: boolean;
  isUpdated: boolean;
  isDeleted: boolean;
  error: string | null;
}

interface UserData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  religion: string;
  role?: string;
  avatar?: File | Blob | string | null;
}

interface HealthFormData {
   diabetic: boolean;
    hypertension: boolean;
    kidneyProblem: boolean;
    cardiovascular: boolean;
    obese: boolean;
    heartDisease: boolean;
    none: boolean;
}

const initialState: UserState = {
  loading: false,
  isUpdated: false,
  isDeleted: false,
  error: null,
};




export const deleteUser = createAsyncThunk('user/deleteUser', async (id: string | number, { dispatch }) => {
  try {
    const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/user/${id}`, { withCredentials: true });
    dispatch(deleteUserSuccess(data.success))
    return data.success;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || 'An error occured';
    }
    throw 'An error occured';
  }
}
);

export const updateUser = createAsyncThunk<boolean, { id: string | number; userData: UserData }>('user/updateUser', async ({ id, userData }, { dispatch, rejectWithValue }) => {
  try {

    dispatch(updateUserRequest());

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/user/${id}`, userData, { withCredentials: true, ...config });
    
    dispatch(updateUserSuccess(data.success));
    return data.success;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(updateUserFail(error.response?.data?.message || 'An error occurred'));
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
    
    dispatch(updateUserFail('An error occurred'));
    return rejectWithValue('An error occurred');
  }
});

export const submitHealthDeclaration = createAsyncThunk<boolean, HealthFormData>('user/updateUser',async (healthData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(updateUserRequest());
      const config = {
        headers: {
          'Content-Type': 'application/json', 
        },
        withCredentials: true,
      };
      const { data } = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/user/health-declaration`, healthData, config);
      dispatch(updateUserSuccess(data.success));
      return data.success;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(updateUserFail(error.response?.data?.message || 'An error occurred'));
        return rejectWithValue(error.response?.data?.message || 'An error occurred');
      }
      dispatch(updateUserFail('An error occurred'));
      return rejectWithValue('An error occurred');
    }
  }
);

export const updateProfile = createAsyncThunk<boolean, { id: string | number; userData: UserData }>('user/updateUser', async ({ id, userData }, { dispatch, rejectWithValue }) => {
  try {

    dispatch(updateUserRequest());

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/profile/user/${id}`, userData, { withCredentials: true, ...config });
    dispatch(loginSuccess(data.user));
    dispatch(updateUserSuccess(data.success));
    return data.success;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(updateUserFail(error.response?.data?.message || 'An error occurred'));
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
    
    dispatch(updateUserFail('An error occurred'));
    return rejectWithValue('An error occurred');
  }
});


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserRequest: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    updateUserReset: (state) => {
      state.isUpdated = false;
      state.error = null;
    },
    deleteUserReset: (state) => {
      state.isDeleted = false;
    },
    updateUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  updateUserRequest,
  updateUserSuccess,
  deleteUserSuccess,
  updateUserReset,
  deleteUserReset,
  updateUserFail,
  clearErrors,
} = userSlice.actions;

export default userSlice.reducer;
