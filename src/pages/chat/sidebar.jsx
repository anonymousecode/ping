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
    const success = await addFriend(user.uid, email);
    if (success) {
      setEmail("");
    } else {
      alert("User not found");
    }
  };

  return (
    <div className="col-3 border-end bg-light p-3">
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
      <div className="list-group">
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
