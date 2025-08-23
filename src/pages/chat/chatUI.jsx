import { useEffect, useState } from "react";
import { send, listen } from "./chatService";

export default function ChatUI({ user, selectedFriend }) {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    if (!selectedFriend) return;
    const chatId = [user.uid, selectedFriend.uid].sort().join("_");
    const unsubscribe = listen(chatId, setMessages);
    return () => unsubscribe();
  }, [selectedFriend, user]);

  const handleSend = async () => {
    if (!newMsg.trim()) return;
    const chatId = [user.uid, selectedFriend.uid].sort().join("_");
    await send(chatId, user.uid, newMsg);
    setNewMsg("");
  };

  if (!selectedFriend) {
    return (
      <div className="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
        <p className="text-muted">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      {/* Chat Header */}
      <div className="d-flex justify-content-between align-items-center border-bottom px-3 py-2 bg-white">
        <h6 className="mb-0">{selectedFriend.displayName || selectedFriend.email}</h6>
        <small className="text-muted">Online</small>
      </div>

      {/* Messages */}
      <div className="flex-grow-1 overflow-auto p-3 bg-light">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`d-flex mb-2 ${
              msg.senderId === user.uid ? "justify-content-end" : "justify-content-start"
            }`}
          >
            <div
              className={`p-2 rounded shadow-sm ${
                msg.senderId === user.uid ? "bg-primary text-white" : "bg-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-top p-3 bg-white d-flex">
        <input
          type="text"
          placeholder="Type a message..."
          className="form-control"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <button onClick={handleSend} className="btn btn-primary ms-2">
          Send
        </button>
      </div>
    </div>
  );
}
