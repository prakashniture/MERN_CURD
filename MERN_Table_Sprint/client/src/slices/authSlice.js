import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('token')
  },
  reducers: {
    login(state, action) {
      localStorage.setItem('token', action.payload.token);
      state.isAuthenticated = true;
    },
    logout(state) {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
