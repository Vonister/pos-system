import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";

export const fetchData = async (dbtable) => {
  const db = getDatabase(app);
  const dbRef = ref(db, dbtable);

  try {
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const tempData = snapshot.val();
      const finalData = Object.keys(tempData).map((dataId) => {
        return {
          ...tempData[dataId],
          id: dataId,
        };
      });

      return finalData;
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
