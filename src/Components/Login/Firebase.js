import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEDd_Iic96F_4-gR3JVpUTsKdhZvGZKP4",
  authDomain: "seatallocation-5da65.firebaseapp.com",
  projectId: "seatallocation-5da65",
  storageBucket: "seatallocation-5da65.appspot.com",
  messagingSenderId: "126263250971",
  appId: "1:126263250971:web:056add548f3e124ac168be"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;