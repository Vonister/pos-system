import { v4 } from "uuid";
import app from "../firebaseConfig";
import { getDatabase, ref, set } from "firebase/database";
import { getStorage, uploadBytes, ref as imgref } from "firebase/storage";
export const updateImage = async (data, dbtable, imageTable = null) => {
  try {
    const db = getDatabase(app);
    const newDocRef = ref(db, dbtable);

    if (imageTable) {
      const imageName = v4();
      const imageDB = getStorage(app);
      const imgRef = imgref(imageDB, `${imageTable}/${imageName}`);
      uploadBytes(imgRef, data.image);
      data = {
        ...data,
        image: data.image ? imageName : "",
      };
    }

    await set(newDocRef, data);
    return true; // Indicates successful saving
  } catch (error) {
    console.error("Error saving data:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
