import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { initializeAuth } from 'firebase/auth';
import { persistence } from './authPersistence';

const firebaseConfig = {
  apiKey: "AIzaSyCJheIRWs_3cmd6e4p0C4o6BUTTzzydce0",
  authDomain: "iwamad-chat-38ffe.firebaseapp.com",
  databaseURL: "https://iwamad-chat-38ffe-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iwamad-chat-38ffe",
  storageBucket: "iwamad-chat-38ffe.firebasestorage.app",
  messagingSenderId: "145828428221",
  appId: "1:145828428221:web:a01afceb65badbf9ebad4"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = initializeAuth(app, { persistence });