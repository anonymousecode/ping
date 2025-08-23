import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";

export const send = async (chatId, senderId, text) =>{

    if(!text.trim()) return;

    await addDoc(collection(db, "chats", chatId, "messages"),{

        senderId,
        text,
        timestamp: serverTimestamp(),
    });

};

export const listen = (chatId, callback) =>{

    const q = query(
        collection(db, "chats",chatId,"messages"),
        orderBy("timestamp","asc")
    );

    return onSnapshot(q, (snapshot) =>{
        const msgs = snapshot.docs.map((doc) => ({
            id: doc.id, ...doc.data(),
        }));
        callback(msgs);
    });
};