import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

const FirebaseInit = () => {
    return initializeApp(firebaseConfig)
};

export default FirebaseInit;