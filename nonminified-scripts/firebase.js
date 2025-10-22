import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCUltMwgKS1GOH5sL46f5l0Z9oi6qI2aTI",
    authDomain: "max0ytst.firebaseapp.com",
    databaseURL: "https://max0ytst-default-rtdb.firebaseio.com",
    projectId: "max0ytst",
    storageBucket: "max0ytst.firebasestorage.app",
    messagingSenderId: "896428844125",
    appId: "1:896428844125:web:7a7bed5bfe578785ff59b4",
    measurementId: "G-G0RDKQBW80"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, ref, get, child, auth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile };
