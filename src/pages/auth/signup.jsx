import React, {useState} from 'react';
import {auth} from '../../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

export default function Signup(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [cpassword,setCPassword] =useState("");
    const [error,setError] = useState("");

    const handleSignup = async(e) =>{
        e.preventDefault();
        setError("");

        if(password !== cpassword){
            setError("Passwords dont match");
            return;
        }

        try{

            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;

            await sendEmailVerification(user);
            alert("Verification email sent! pls check your mail")
        }catch(err){
            setError(err.message);
        }

    };

    return(    
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Signup</h3>
        <form onSubmit={handleSignup}>
          <div className="text-start mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="text-start mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-start mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm your password"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Signup
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>

    )




}