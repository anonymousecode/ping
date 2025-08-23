import { signOut } from "firebase/auth"
import { auth } from "../../firebase"

export default function Chat({ user }) {
  return (
    <div className="d-flex flex-column vh-100">
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center bg-dark text-white px-3 py-2 shadow-sm">
        {/* Left - Logo */}
        <div className="d-flex align-items-center gap-2">
          <img src="/logo.png" alt="logo" style={{ width: "50px" }} />
          <span className="fs-5 fw-bold">ping</span>
        </div>

        {/* Right - User Info */}
        <div className="d-flex align-items-center gap-3">
          <h2 className="fs-6 mb-0">{user?.email}</h2>
          <span className="text-success small">Online</span>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => signOut(auth)}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className="col-3 border-end bg-light p-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search chats..."
            className="form-control mb-3"
          />

          {/* Chat List */}
          <div className="list-group">
            <div className="list-group-item list-group-item-action">
              <h6 className="mb-1">John Doe</h6>
              <small className="text-muted">Hello! How are you?</small>
            </div>
            <div className="list-group-item list-group-item-action">
              <h6 className="mb-1">Jane Smith</h6>
              <small className="text-muted">See you tomorrow 👋</small>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="d-flex flex-column flex-grow-1">
          {/* Chat Header */}
          <div className="d-flex justify-content-between align-items-center border-bottom px-3 py-2 bg-white">
            <h6 className="mb-0">John Doe</h6>
            <small className="text-muted">Last seen 2m ago</small>
          </div>

          {/* Messages */}
          <div className="flex-grow-1 overflow-auto p-3 bg-light">
            <div className="d-flex mb-2">
              <div className="p-2 bg-white rounded shadow-sm">
                Hey! How are you?
              </div>
            </div>
            <div className="d-flex justify-content-end mb-2">
              <div className="p-2 bg-primary text-white rounded shadow-sm">
                I’m good! What about you?
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="border-top p-3 bg-white d-flex">
            <input
              type="text"
              placeholder="Type a message..."
              className="form-control"
            />
            <button className="btn btn-primary ms-2">Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}
