import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {auth} from "../../firebase"
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async(e) =>{
    e.preventDefault();
    setError("");  
    
    try{
     const userCredential = await signInWithEmailAndPassword(auth,email,password);
     const user = userCredential.user;

     if(!user.emailVerified){
      alert('please verify email before logging in')
      return
     }
    }
    catch(err){
      setError(err.message);
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="text-start mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your username" value={email} onChange={(e)=> setEmail(e.target.value)} required />
          </div>
          <div className="text-start mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login
          </button>
        </form>

        {error && <p style={{color:'red'}}> {error}</p>}

        <p className='text-center'>
        Not a user ? <span onClick={() => navigate("/signup")} style={{ color: "blue", cursor: "pointer" }}>Signup</span>
      </p>
      </div>
    </div>
  )
}
