import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  _id: number;
  fname: string;
  lname: string;
  email: string;
  course: string;
  religion: string;
  role: string;

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
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/users`, { withCredentials: true });
    dispatch(allUsersSuccess(data.users));
    return data.users;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
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
