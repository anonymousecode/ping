import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";
import ChatUI from "./chatUi";
import Sidebar from "./sidebar";

export default function Chat({ user }) {
  const [selectedFriend, setSelectedFriend] = useState(null);

  return (
    <div className="d-flex flex-column vh-100">
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center bg-dark text-white px-3 py-2 shadow-sm">
        <div className="d-flex align-items-center gap-2">
          <img src="/logo.png" alt="logo" style={{ width: "50px" }} />
          <span className="fs-5 fw-bold">ping</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h2 className="fs-6 mb-0">{user?.email}</h2>
          <span className="text-success small">Online</span>
          <button className="btn btn-sm btn-danger" onClick={() => signOut(auth)}>
            Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="d-flex flex-grow-1">
        <Sidebar user={user} onSelectChat={setSelectedFriend} />
        <ChatUI user={user} selectedFriend={selectedFriend} />
      </div>
    </div>
  );
}
