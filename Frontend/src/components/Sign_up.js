import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
const host = "https://notebook-backend-feva.onrender.com";
const Signup = () => {
  const { alert, Showalert, setToken } = useContext(noteContext);
  const history = useNavigate();
  const [details, setDetails] = useState({ name: "", email: "", password: "", ConfirmPassword: "" })
  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  }

  const handleclick = async (e) => {
    e.preventDefault();
    const url = `${host}/api/auth/createuser`;
    const { email, name, password } = details;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, name, password })

    });
    const json = await response.json();
    //console.log(json);
    if (!json.error) {
      localStorage.setItem('token', json.authenticationtoken);
      setToken(json.authenticationtoken);
      history("/Home");
      Showalert("Signed in Successfully");
    }
  }
  return (
    <div className="signup" style={{
      marginTop: "50px",
      background: 'linear-gradient(135deg, #23272f 60%, #1e2235 100%)',
      borderRadius: '18px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.7)',
      padding: '2.5rem 2rem',
      maxWidth: '420px',
      color: '#f1f1f1',
      position: 'relative',
      margin: '2rem auto'
    }}>
      <h2 style={{color:'#4f8cff', fontWeight:'bold', marginBottom:'1.5rem', fontSize:'2rem', textAlign:'center'}}>Sign Up to INoteBook</h2>
      <form className="form" style={{display:'flex',flexDirection:'column',gap:'1.5rem'}} onSubmit={handleclick}>
        <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
          <label htmlFor="name" style={{fontWeight:'500',color:'#8ab4f8'}}>Name</label>
          <input type="text" id="name" name="name" value={details.name} onChange={onChange} style={{background:'#181a20',color:'#f1f1f1',border:'1px solid #4f8cff',borderRadius:'8px',padding:'0.7rem',fontSize:'1rem'}} />
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
          <label htmlFor="email" style={{fontWeight:'500',color:'#8ab4f8'}}>Email address</label>
          <input type="email" id="email" name="email" value={details.email} onChange={onChange} aria-describedby="emailHelp" style={{background:'#181a20',color:'#f1f1f1',border:'1px solid #4f8cff',borderRadius:'8px',padding:'0.7rem',fontSize:'1rem'}} />
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
          <label htmlFor="password" style={{fontWeight:'500',color:'#8ab4f8'}}>Password</label>
          <input type="password" id="password" name="password" value={details.password} onChange={onChange} style={{background:'#181a20',color:'#f1f1f1',border:'1px solid #4f8cff',borderRadius:'8px',padding:'0.7rem',fontSize:'1rem'}} />
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
          <label htmlFor="ConfirmPassword" style={{fontWeight:'500',color:'#8ab4f8'}}>Confirm Password</label>
          <input type="password" id="ConfirmPassword" name="ConfirmPassword" value={details.ConfirmPassword} onChange={onChange} style={{background:'#181a20',color:'#f1f1f1',border:'1px solid #4f8cff',borderRadius:'8px',padding:'0.7rem',fontSize:'1rem'}} />
        </div>
        <div className="my-3">
          <small id="emailHelp" className="form-text text-muted" style={{color:'#8ab4f8'}}>Make sure that everything entered above is correct</small>
          <button type="submit" className="btn" style={{
            background: 'linear-gradient(90deg, #4f8cff 0%, #1e2a78 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.8rem 1.5rem',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            marginTop: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;