import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; // Update the path as needed
import axios from 'axios';

interface User {
  // Define your User type
  // Adjust the fields based on your actual User type
  id: string;
  email: string;
  role: string;
  // ... other fields
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  role: string | null;
}

// Define your thunk payload type if needed
interface ThunkPayload {
  email: string;
  password: string;
  // ... other fields for other actions
}

const initialState: AuthState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('user'),
  role: localStorage.getItem('role'),
};

export const login = createAsyncThunk<User, ThunkPayload>(
  'auth/login',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(loginRequest());
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/login`, { email, password }, config);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('role', data.user.role);

      dispatch(loginSuccess(data.user));
      return data.user;
    } catch (error) {
      dispatch(loginFail(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);

// ... Repeat the same pattern for logout and registerUser thunks

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.error = action.payload;
    },
    // ... Repeat the same pattern for other actions
  },
});

export const { loginRequest, loginSuccess, loginFail } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
