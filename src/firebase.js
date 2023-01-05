import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYE1Zd22s8PaJzYOr8176fxumFhpKtKV0",
  authDomain: "suspension-application.firebaseapp.com",
  databaseURL: "https://suspension-application-default-rtdb.firebaseio.com",
  projectId: "suspension-application",
  storageBucket: "suspension-application.appspot.com",
  messagingSenderId: "633314525409",
  appId: "1:633314525409:web:0954498809473ef77a77a0",
  measurementId: "G-T2872PG5T9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
}
