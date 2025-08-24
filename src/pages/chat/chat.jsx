import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";
import ChatUI from "./chatUi";
import Sidebar from "./sidebar";

export default function Chat({ user }) {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true); // for mobile

  const handleSelectChat = (friend) => {
    setSelectedFriend(friend);
    setShowSidebar(false); // hide sidebar on mobile
  };

  const handleBack = () => {
    setSelectedFriend(null);
    setShowSidebar(true); // show sidebar again
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center bg-dark text-white px-3 py-2 shadow-sm">
        {/* Left: Logo */}
        <div className="d-flex align-items-center gap-2">
          <img src="/logo.png" alt="logo" style={{ width: "40px"}} />
          <span className="fw-bold">ping</span>
        </div>

        {/* Right: User Info */}
        <div className="d-flex align-items-center gap-2 text-truncate" style={{ maxWidth: "60%" }}>
          <small className="mb-0 text-truncate">{user?.email}</small>
          <span className="text-success small d-none d-sm-inline">Online</span>
          <button className="btn btn-sm btn-danger">Logout</button>
        </div>
      </div>


      {/* Main */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div
          className={`${
            showSidebar ? "d-flex" : "d-none"
          } d-md-flex flex-column col-md-3`}
        >
          <Sidebar user={user} onSelectChat={handleSelectChat} />
        </div>

        {/* Chat */}
        <div
          className={`flex-grow-1 ${
            selectedFriend ? "d-flex" : "d-none"
          } d-md-flex`}
        >
          <ChatUI
            user={user}
            selectedFriend={selectedFriend}
            onBack={handleBack}
          />
        </div>
      </div>
    </div>
  );
}
