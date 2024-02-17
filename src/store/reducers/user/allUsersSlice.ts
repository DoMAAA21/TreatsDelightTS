import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  _id: number | string;
  fname: string;
  lname: string;
  email: string;
  course: string;
  religion: string;
  role: string;
  store?: {
    storeId: string | number;
    name: string;
  }

}


interface AllUsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: AllUsersState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchAllUsers = createAsyncThunk('allUsers/fetchAllUsers', async (_, { rejectWithValue, dispatch }) => {
  try {
    dispatch(allUsersRequest());
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/users`, { withCredentials: true });
    dispatch(allUsersSuccess(data.users));
    return data.users;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(allUsersFail(error.response?.data?.message || 'An error occurred'));
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
    dispatch(allUsersFail('An error occurred'));
    return rejectWithValue('An error occurred');
  }
});

export const fetchAllOwners = createAsyncThunk('allUsers/fetchAllOwners', async (_, { rejectWithValue, dispatch }) => {
  try {
    dispatch(allUsersRequest());
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/owners`, { withCredentials: true });
    dispatch(allUsersSuccess(data.owners));
    return data.owners;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(allUsersFail(error.response?.data?.message || 'An error occurred'));
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
    dispatch(allUsersFail('An error occurred'));
    return rejectWithValue('An error occurred');
  }
});

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    allUsersRequest: (state) => {
      state.loading = true;
    },
    allUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    allUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  allUsersRequest,
  allUsersSuccess,
  allUsersFail,
  clearErrors,
} = allUsersSlice.actions;

export default allUsersSlice.reducer;
