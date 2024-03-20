import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {auth} from "./config";

export const signUpEmailPassword = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInEmailPassword = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutFirebase = async () => {
    return await signOut(auth);
}