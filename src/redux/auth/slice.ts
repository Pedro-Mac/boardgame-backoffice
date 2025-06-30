import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export const handleLogin = createAsyncThunk(
  'auth/handleLogin',
  async (formData: FormData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/backoffice/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password'),
          }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error('Login failed:', error);
      return;
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      if (action.payload && typeof action.payload === 'object') {
        state.isAuthenticated = true;
      }
    });

    builder.addCase(handleLogin.rejected, (state) => {
      state.isAuthenticated = false;
    });
  },
  reducers: {
    handleLogout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleLogout } = authSlice.actions;

export default authSlice.reducer;
