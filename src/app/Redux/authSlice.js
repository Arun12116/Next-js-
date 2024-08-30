import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  accessToken: typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
  isAuthenticated: typeof window !== 'undefined' && !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      return { accessToken: data.accessToken };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }
      const data = await response.json();
      if (!data.token || !data.refresh_token
      ) {
        throw new Error('Invalid response data');
      }

      return { accessToken: data.accessToken, refreshToken: data.refreshToken };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
  
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', action.payload.accessToken);
        }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
  
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', action.payload.accessToken);
        }
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
