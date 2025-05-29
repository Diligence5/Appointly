import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../interface/UserInterface';

export interface AuthState {
  accessToken: string | null;
  fcmToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
  latitude: number | null;
  longitude: number | null;
  notificationCount: number | null;
}

const initialState: AuthState = {
  accessToken: null,
  fcmToken: null,
  isAuthenticated: false,
  user: null,
  latitude: null,
  longitude: null,
  notificationCount: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    setNotificationCount: (state, action: PayloadAction<number>) => {
      state.notificationCount = action.payload;
      state.isAuthenticated = true;
    },
    setFcmToken: (state, action: PayloadAction<string>) => {
      state.fcmToken = action.payload;
      state.isAuthenticated = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLocation: (
      state,
      action: PayloadAction<{latitude: number; longitude: number}>,
    ) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    clearAccessToken: state => {
      state.accessToken = null;
      state.fcmToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.latitude = null;
      state.longitude = null;
      state.notificationCount = null;
    },
  },
});

export const {
  setAccessToken,
  setUser,
  setLocation,
  clearAccessToken,
  setFcmToken,
  setNotificationCount,
} = authSlice.actions;
export default authSlice.reducer;
