import React,{ useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from "./firebase";
import Login from './pages/auth/login'
import Chat from './pages/chat/chat'
import './App.css'

function App() {

  const [user, setUser] = useState(null);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser);
    });
    return () => unsubscribe();
  },[]);

  return (
    <>
      {user? <Chat user={user}/> : <Login />}
    </>
  );
}

export default App
