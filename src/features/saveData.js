import { v4 } from "uuid";
import app from "../firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
import { getStorage, uploadBytes, ref as imgref } from "firebase/storage";
export const saveData = async (data, dbtable, imageTable = null) => {
  try {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, dbtable));

    if (data.image) {
      const imageName = v4();
      const imageDB = getStorage(app);
      const imgRef = imgref(imageDB, `${imageTable}/${imageName}`);
      uploadBytes(imgRef, data.image);

      data = {
        ...data,
        image: imageName,
      };
    }
    await set(newDocRef, data);
    return true; // Indicates successful saving
  } catch (error) {
    console.error("Error saving data:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
