import React, {useState} from 'react';
import {auth} from "../../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [isRegistered,setIsRegistered] = useState(false);
  const [error,setError] = useState("");


  const handleSubmit = async(e) =>{
    e.preventDefault();
    setError("");  
    
    try{
      if(isRegistered){
        await createUserWithEmailAndPassword(auth,email,password);
      }else{
        await signInWithEmailAndPassword(auth,email,password);
      }
    }
    catch(err){
      setError(err.message);
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">{isRegistered? "Login":"Signup"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="text-start mb-3">
            <label className="form-label">Username</label>
            <input type="email" className="form-control" placeholder="Enter your username" value={email} onChange={(e)=> setEmail(e.target.value)} required />
          </div>
          <div className="text-start mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {error && <p style={{color:'red'}}> {error}</p>}
      </div>
    </div>
  )
}
