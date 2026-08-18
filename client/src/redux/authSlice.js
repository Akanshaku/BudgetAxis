import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios.js';

const userFromStorage = JSON.parse(localStorage.getItem('user'));

export const register = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/register', data);
    localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Registration failed');
  }
});

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/login', data);
    localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const updateBudget = createAsyncThunk('auth/updateBudget', async (monthlyBudget, { rejectWithValue }) => {
  try {
    const res = await api.put('/auth/budget', { monthlyBudget });
    const user = JSON.parse(localStorage.getItem('user'));
    const updated = { ...user, monthlyBudget: res.data.monthlyBudget };
    localStorage.setItem('user', JSON.stringify(updated));
    return res.data.monthlyBudget;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update budget');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userFromStorage || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        if (state.user) state.user.monthlyBudget = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
