import {collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, updateDoc} from "firebase/firestore";
import {dbRef} from "./config";
export const getDocuments = async (collectionName: string) => {
    return await getDocs(collection(dbRef, collectionName))
}

export const getDocumentsRealTime = (
    collectionName: string,
    setDataCallback: (data: any[]) => void
) => {
    return onSnapshot(
        collection(dbRef, collectionName),
        (snapshot) => {
            const documents = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setDataCallback(documents);
        },
        (error) => {
            console.error("Error fetching documents: ", error);
        }
    );
};

export const addDocument = async (collectionName: string, data: any) => {
    const addedDocument = await addDoc(collection(dbRef, collectionName), data);

    return addedDocument.id;
}

export const deleteDocument = async (collectionName: string, documentId: string) => {
    const docRef = doc(dbRef, collectionName, documentId)
    await deleteDoc(docRef);
}

export const updateDocument = async (collectionName: string, documentId: string, data: any) => {
    const docRef = doc(dbRef, collectionName, documentId)
    await updateDoc(docRef, data);
}