import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';

export const saveIdea = async (userId, idea, pitch = null) => {
    try {
        const ideasRef = collection(db, 'ideas');
        const docRef = await addDoc(ideasRef, {
            userId,
            idea,
            pitch,
            createdAt: new Date().toISOString()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error saving idea:', error);
        throw error;
    }
};

export const getUserIdeas = async (userId) => {
    try {
        const ideasRef = collection(db, 'ideas');
        const q = query(ideasRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching ideas:', error);
        throw error;
    }
};

export const deleteIdea = async (ideaId) => {
    try {
        await deleteDoc(doc(db, 'ideas', ideaId));
        return true;
    } catch (error) {
        console.error('Error deleting idea:', error);
        throw error;
    }
};