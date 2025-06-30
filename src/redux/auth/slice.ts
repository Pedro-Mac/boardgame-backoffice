import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  authToken: string;
  expirationAt: string;
}

const initialState: AuthState = {
  authToken: '',
  expirationAt: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleLoginSucceeds: (state, action: PayloadAction<AuthState>) => {
      state.authToken = action.payload.authToken;
      state.expirationAt = action.payload.expirationAt;
    },
    handleLoginFails: (state) => {
      state.authToken = '';
      state.expirationAt = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleLoginSucceeds, handleLoginFails } = authSlice.actions;

export default authSlice.reducer;
