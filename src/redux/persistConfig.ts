import { PersistConfig } from 'redux-persist';
import { AuthState } from './slices/authSlice'; // Import the type of the auth state
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig: PersistConfig<AuthState> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['accessToken', 'isAuthenticated', 'user','latitude','longitude'], // Specify which reducer states to persist
};

// import { UserProfile } from '../interfaces/user.interface'; // Import the UserProfile type

// export const setUserProfile = (userProfile: UserProfile) => {
//   return {
//     type: 'SET_USER_PROFILE',
//     payload: userProfile
//   };
// };

export default persistConfig;
