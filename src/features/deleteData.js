import { v4 } from 'uuid';
import app from '../firebaseConfig';
import { getDatabase, ref, set, push, remove } from 'firebase/database';
import { getStorage, uploadBytes, ref as imgref } from 'firebase/storage';
export const deleteData = async (dbtable) => {
  try {
    const db = getDatabase(app);
    const newDocRef = ref(db, dbtable);

    await remove(newDocRef);
    return true; // Indicates successful saving
  } catch (error) {
    console.error('Error saving data:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
