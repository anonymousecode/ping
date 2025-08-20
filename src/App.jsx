import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "./firebase";

import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import Chat from './pages/chat/chat';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/chat" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/chat" /> : <Signup />} />
        <Route path="/chat" element={user ? <Chat user={user} /> : <Navigate to="/login" />} />
        {/* default redirect */}
        <Route path="*" element={<Navigate to={user ? "/chat" : "/login"} />} />
      </Routes>
    </>
  );
}

export default App;
