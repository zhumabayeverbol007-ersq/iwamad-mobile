import AsyncStorage from '@react-native-async-storage/async-storage';
// Firebase's types leave out the React Native build; the function is there when the app runs.
// @ts-expect-error
import { getReactNativePersistence } from 'firebase/auth';

export const persistence = getReactNativePersistence(AsyncStorage);