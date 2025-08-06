import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
};

export const registerUser = createAsyncThunk('auth/register', async (cred, thunkAPI) => {
    try {
        const res = await fetch('https://connections-api.goit.global/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cred),
        });
        if (!res.ok) throw new Error('Register failed');
        return await res.json();
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const loginUser = createAsyncThunk('auth/login', async (cred, thunkAPI) => {
    try {
        const res = await fetch('https://connections-api.goit.global/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cred),
        });
        if (!res.ok) throw new Error('Login failed');
        return await res.json();
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
        await fetch('https://connections-api.goit.global/users/logout', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const fetchCurrentUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    if (!token) return thunkAPI.rejectWithValue('No token');

    try {
        const res = await fetch('https://connections-api.goit.global/users/current', {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Fetch user failed');
        return await res.json();
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
                state.isLoggedIn = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
                state.isLoggedIn = true;
            })
            .addCase(logoutUser.fulfilled, state => {
                state.user = { name: null, email: null };
                state.token = null;
                state.isLoggedIn = false;
            })
            .addCase(fetchCurrentUser.pending, state => {
                state.isRefreshing = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
                state.user = payload;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(fetchCurrentUser.rejected, state => {
                state.isRefreshing = false;
            });
    },
});

export default authSlice.reducer;
