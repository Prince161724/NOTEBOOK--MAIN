import React ,{useContext,useState}from 'react';
import nextContext from '../context/notes/noteContext';
import Notes from './Notes'
const Addnote = () => {
    const Context=useContext(nextContext);
    const {addnote,setNote,note,handleclick,Showalert,alert}=Context;
    
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return(
    <div className="add-note" style={{
        background: 'linear-gradient(135deg, #23272f 60%, #1e2235 100%)',
        borderRadius: '18px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.7)',
        padding: '2.5rem 2rem',
        margin: '2rem auto',
        maxWidth: '420px',
        color: '#f1f1f1',
        position: 'relative',
    }}>
        <h2 style={{color:'#4f8cff', fontWeight:'bold', marginBottom:'1.5rem', fontSize:'2rem', textAlign:'center'}}>Add a Note</h2>
        <form className="form" style={{display:'flex',flexDirection:'column',gap:'1.5rem'}} onSubmit={(e) => { handleclick(e, note.title, note.description, note.tag); Showalert("Note Added Successfully"); }}>
            <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                <label htmlFor="title" style={{fontWeight:'500',color:'#8ab4f8'}}>Title</label>
                <input type="text" id="title" name="title" value={note.title} onChange={onChange} minLength={5} required style={{background:'#181a20',color:'#f1f1f1',border:'1px solid #4f8cff',borderRadius:'8px',padding:'0.7rem',fontSize:'1rem'}} />
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                <label htmlFor="description" style={{fontWeight:'500',color:'#8ab4f8'}}>Description</label>
                <textarea id="description" name="description" value={note.description} onChange={onChange} minLength={5} required style={{background:'#181a20',color:'#f1f1f1',border:'1px solid #4f8cff',borderRadius:'8px',padding:'0.7rem',fontSize:'1rem',minHeight:'80px'}} />
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                <label htmlFor="tag" style={{fontWeight:'500',color:'#8ab4f8'}}>Tag</label>
                <input type="text" id="tag" name="tag" value={note.tag} onChange={onChange} style={{background:'#181a20',color:'#f1f1f1',border:'1px solid #4f8cff',borderRadius:'8px',padding:'0.7rem',fontSize:'1rem'}} />
            </div>
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
            }}>Add Note</button>
        </form>
     </div>
    );
}



export default Addnote;