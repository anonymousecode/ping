import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { addFriend } from "../auth/addFriend";

export default function Sidebar({ user, onSelectChat }) {
  const [contacts, setContacts] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "contacts"),
      (snapshot) => {
        setContacts(snapshot.docs.map((doc) => doc.data()));
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleAddFriend = async () => {
    if (!email) return;
    try {
      const success = await addFriend(user.uid, user, email);
      if (success) {
        setEmail("");
      } else {
        alert("User not found or already in contacts.");
      }
    } catch (err) {
      console.error("Error adding friend:", err);
      alert("Something went wrong while adding friend.");
    }
  };

  return (
    <div className="h-100 d-flex flex-column p-3 border-end bg-light">
      {/* Add Friend */}
      <div className="d-flex mb-3">
        <input
          type="email"
          placeholder="Add friend by email..."
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleAddFriend} className="btn btn-primary ms-2">
          +
        </button>
      </div>

      {/* Contacts */}
      <div className="list-group flex-grow-1 overflow-auto">
        {contacts.map((c) => (
          <div
            key={c.uid}
            className="list-group-item list-group-item-action"
            onClick={() => onSelectChat(c)}
            style={{ cursor: "pointer" }}
          >
            <h6 className="mb-1">{c.displayName || c.email}</h6>
            <small className="text-muted">{c.email}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
