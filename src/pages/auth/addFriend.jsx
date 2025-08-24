import { collection, query, where, doc, getDocs, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const addFriend = async (currentUid, currentUserData, email) => {
  // Find the user by email
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    if (userData.uid === currentUid) {
      console.warn("User cannot add themselves as a friend.");
      return false;
    }

    // --- Check if already in contacts (current user → friend)
    const contactRef = doc(db, "users", currentUid, "contacts", userData.uid);
    const contactSnap = await getDoc(contactRef);

    if (!contactSnap.exists()) {
      await setDoc(contactRef, {
        uid: userData.uid,
        displayName: userData.displayName || userData.email.split("@")[0],
        email: userData.email,
      });
    }

    // --- Check if already in contacts (friend → current user)
    const reverseRef = doc(db, "users", userData.uid, "contacts", currentUid);
    const reverseSnap = await getDoc(reverseRef);

    if (!reverseSnap.exists()) {
      await setDoc(reverseRef, {
        uid: currentUid,
        displayName: currentUserData.displayName || currentUserData.email.split("@")[0],
        email: currentUserData.email,
      });
    }

    return true;
  } else {
    return false;
  }
};
