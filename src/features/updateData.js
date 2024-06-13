import { v4 } from 'uuid';
import app from '../firebaseConfig';
import { getDatabase, ref, set, push } from 'firebase/database';
import { getStorage, uploadBytes, ref as imgref } from 'firebase/storage';
export const updateData = async (data, dbtable) => {
  try {
    const db = getDatabase(app);
    const newDocRef = ref(db, dbtable);

    await set(newDocRef, data);
    return true; // Indicates successful saving
  } catch (error) {
    console.error('Error saving data:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
