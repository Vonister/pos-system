import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
} from "firebase/storage";
import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";

export const fetchData = async (dbtable) => {
  const db = getDatabase(app);
  const dbRef = ref(db, dbtable);

  try {
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const tempData = snapshot.val();
      const fetchImageUrl = async (imageName) => {
        try {
          const storage = getStorage(app);
          const imageRef = storageRef(storage, `menuImages/${imageName}`);
          const url = await getDownloadURL(imageRef);
          return url;
        } catch (error) {
          console.error("Error fetching image URL:", error);
          return "";
        }
      };

      const dataPromises = Object.keys(tempData).map(async (key) => {
        const item = tempData[key];
        if (item.image) {
          const url = await fetchImageUrl(item.image);
          return { id: key, ...item, imageUrl: url };
        }
        return { id: key, ...item };
      });

      const dataWithUrls = await Promise.all(dataPromises);

      return dataWithUrls;
    } else {
      // Handle case when snapshot doesn't exist
      return null;
    }
  } catch (error) {
    // Handle any errors that occur during fetching
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
