import React,{useEffect,useContext} from 'react';
import nextContext from '../context/notes/noteContext';
import {Link,useLocation,useNavigate} from "react-router-dom";
const Navbar=()=>{
  const history=useNavigate();
  const onClick2=()=>{
    history("/Signup")
  }
  const onClick3=()=>{
    history("/")
  }
  let location=useLocation();
  const {token,setToken}=useContext(nextContext);
  const onClick=()=>{
    localStorage.removeItem('token');
    setToken('');
    history("/");
  }
  const closeDropdown = () => {
    const navCollapse = document.getElementById('navbarSupportedContent');
    if (navCollapse && navCollapse.classList.contains('show')) {
      navCollapse.classList.remove('show');
    }
  };
    return(
      <>
  <nav className="navbar">
  <Link className="navbar-brand" to="#" style={{fontWeight:'bold',fontSize:'1.5rem',color:'#4f8cff'}}>INoteBook</Link>
  <div style={{position:'absolute', right:'18px', top:'2px', textAlign:'center'}}>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{background:'transparent', border:'none', borderRadius:'6px', padding:'0.4rem 0.7rem'}}>
      <span style={{color:'#4f8cff', fontSize:'2rem', fontWeight:'bold'}}>&#x25BC;</span>
    </button>
    <div style={{fontSize:'0.8rem', color:'#fff', marginTop:'2px'}}>
      <span>More options available here</span>
    </div>
  </div>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className={`nav-item ${location.pathname==='/Home'?"active":""}`}>
        <Link className="nav-link" to="/Home" style={{color:'#4f8cff'}}>Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className={`nav-item ${location.pathname==='/about'?"active":""}`}>
        <Link className="nav-link" to="/about" style={{color:'#4f8cff'}}>About</Link>
      </li>
    </ul>
    <div className="form-inline my-2 my-lg-0">
      {!token ? (
        <>
          <button type="button" className="btn" style={{margin:'0 8px'}} onClick={() => { onClick3(); closeDropdown(); }}>Log-In</button>
          <button type="button" className="btn signup-btn" style={{margin:'0 8px', background:'#4f8cff', color:'#fff', fontWeight:'bold', border:'none', borderRadius:'6px', padding:'0.5rem 1.2rem', boxShadow:'0 2px 8px rgba(0,0,0,0.2)'}} onClick={() => { onClick2(); closeDropdown(); }}>Sign-Up</button>
        </>
      ) : (
        <button type="button" className="btn" style={{margin:'0 8px', background:'#4f8cff', color:'#fff', fontWeight:'bold', border:'none', borderRadius:'6px', padding:'0.5rem 1.2rem', boxShadow:'0 2px 8px rgba(0,0,0,0.2)'}} onClick={() => { onClick(); closeDropdown(); }}>Log-Out</button>
      )}
    </div>
  </div>
</nav>
        </>
    )
}
export default Navbar;