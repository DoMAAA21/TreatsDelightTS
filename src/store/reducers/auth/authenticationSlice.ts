import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  _id: string;
  email: string;
  avatar: {
    url: string;
  }
  fname: string;
  lname: string;
  religion?: string;
  role: string;
  store?: {
    storeId?: string | number;
    name?: string
  }
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  role: string | null;
}

interface AuthPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  fname: string;
  lname: string;
  email: string;
  password: string;
  religion: string;
  role: string;
}


const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  role: null,
};

export const login = createAsyncThunk<User, AuthPayload>('auth/login', async ({ email, password }, { rejectWithValue, dispatch }) => {
  try {
    dispatch(loginRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };

    const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/login`, { email, password }, config);
    
    dispatch(setToken(data.token));
    localStorage.setItem('token',data.token);
    dispatch(loginSuccess(data.user));
    
    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(loginFail(error.response?.data?.message || 'An error occurred'));
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
    dispatch(loginFail('An error occurred'));
    return rejectWithValue('An error occurred');
  }
}
);


export const register = createAsyncThunk<User, RegisterPayload>('auth/register', async (userData, { rejectWithValue, dispatch }) => {
  try {
    dispatch(registerRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/register`, userData, config);
    localStorage.setItem('token',data.token);
    dispatch(setToken(data.token));
    dispatch(registerSuccess(data.user));
    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(registerFail(error.response?.data?.message || 'An error occurred'));
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
    dispatch(registerFail('An error occurred'));
    return rejectWithValue('An error occurred');
  }
}
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/logout`, { withCredentials: true });


    localStorage.removeItem('cartItems');
    localStorage.removeItem('token');
    dispatch(destroyToken());
    return dispatch(logoutSuccess(data.success));

  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(logoutFail(error.response?.data?.message || 'An error occurred'));
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
    dispatch(logoutFail('An error occurred'));
    return rejectWithValue('An error occurred');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      axios.defaults.withCredentials = true;
      state.loading = true;
      state.isAuthenticated = false;
    },
    setToken(state, action) {
        state.token = action.payload.token;
    },
    destroyToken(state){
      state.token = null;
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
    registerRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    registerFail(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.error = action.payload;
    },
    logoutSuccess(state) {
      axios.defaults.withCredentials = false;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    logoutFail(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null
    }
  },
});

export const { loginRequest, loginSuccess, loginFail, logoutSuccess, registerRequest,
  registerSuccess, registerFail, setToken, destroyToken,
  logoutFail, clearErrors } = authSlice.actions;

export default authSlice.reducer;
