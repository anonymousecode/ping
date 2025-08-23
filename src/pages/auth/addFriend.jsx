import { collection,query,where,orderBy,doc,getDocs,setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const addFriend = async (currentUid, email) =>{

    const q = query(collection(db, "users"), where("email","==",email));
    const querySnapshot = await getDocs(q);


    if (!querySnapshot.empty){
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        const contactRef = doc(db,"users", currentUid,"contacts","userData.uid");
        await setDoc(contactRef, {
            uid: userData.uid,
            displayName:userData.displayName || userData.email.split('@')[0],
            email:userData.email,
        });

        return true;
    }else{
        return False;
    }
}