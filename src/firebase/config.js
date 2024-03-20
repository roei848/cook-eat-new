import {initializeApp} from 'firebase/app'
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDo864KJlAiJtezj6pL6YlaUMi0AE4n0XE",
    authDomain: "cook-eat-fa17b.firebaseapp.com",
    projectId: "cook-eat-fa17b",
    storageBucket: "cook-eat-fa17b.appspot.com",
    messagingSenderId: "716786176317",
    appId: "1:716786176317:web:8dd1bba869b6f91382f554"
};

initializeApp(firebaseConfig);

export const auth = getAuth()
export const dbRef = getFirestore()
