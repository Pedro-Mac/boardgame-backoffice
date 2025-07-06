import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to check authentication status');
      }
      return response.json();
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return; // Return false if there's an error
    }
  }
);

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
      return response.json();
    } catch (error) {
      console.error('Login failed:', error);
      return null;
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

    builder.addCase(checkAuthStatus.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.isAuthenticated = false;
    });

    builder.addCase(checkAuthStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload && typeof action.payload === 'object') {
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.isAuthenticated = false;
        state.error = 'Not authenticated';
      }
    });
    builder.addCase(checkAuthStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error =
        action.error.message || 'Failed to check authentication status';
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
