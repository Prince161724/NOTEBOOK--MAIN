import react, { useContext, useEffect, useRef, useState } from 'react';
import nextContext from '../context/notes/noteContext';
import NoteItem from './NoteItem'
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
const Notes = () => {
    let history = useNavigate();
    const Context = useContext(nextContext);
    const { Notes2, setNotes, fetchnotes, note, setNote, handleclick2, refClose, Editnote, Showalert, alert, token, setToken } = Context;

    useEffect(() => {
        if (token) {
            fetchnotes();
        }
        else {
            history("/");
        }
    }, [token])
    const [showModal, setShowModal] = useState(false);

    const updatenote = (currentnote) => {
        setNote(currentnote);
        setShowModal(true);
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <>
            <div className="card" style={{padding: '2rem', margin: '2rem 0'}}>
                <h2 style={{color:'#4f8cff', marginBottom: '2rem'}}>Your Notes</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2.5rem',
                    alignItems: 'start',
                    marginTop: '1.5rem',
                    padding: '0.5rem',
                }}>
                    {Notes2.length === 0 && <p style={{color:'#aaa'}}>No notes to display</p>}
                    {Notes2.map((note) => (
                        <NoteItem key={note.id || note._id} note={note} updatenote={updatenote} />
                    ))}
                </div>
            </div>

            {/* Modal for editing notes */}
            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{display: 'block', background: 'rgba(0,0,0,0.7)', position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', zIndex:1000}}>
                    <div className="modal-dialog" role="document" style={{maxWidth:'420px', margin:'5vh auto'}}>
                        <div className="modal-content" style={{background:'#23272f', color:'#fff', borderRadius:'12px', boxShadow:'0 4px 24px rgba(0,0,0,0.4)'}}>
                            <div className="modal-header" style={{borderBottom:'1px solid #333', background:'#23272f'}}>
                                <h5 className="modal-title" style={{color:'#fff', fontWeight:'bold'}}>Edit Note</h5>
                                <button type="button" className="close" aria-label="Close" onClick={() => setShowModal(false)} style={{color:'#fff', fontSize:'1.5rem', background:'none', border:'none'}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{padding:'1.5rem'}}>
                                <form>
                                    <div style={{marginBottom:'1.2rem'}}>
                                        <label htmlFor="title" style={{color:'#bbb', fontWeight:'500', marginBottom:'0.3rem', display:'block'}}>Title</label>
                                        <input type="text" id="title" name="title" value={note.title} onChange={onChange} style={{width:'100%', padding:'0.7rem', borderRadius:'7px', border:'none', background:'#2c313a', color:'#fff', fontSize:'1rem', marginBottom:'0.2rem'}} />
                                    </div>
                                    <div style={{marginBottom:'1.2rem'}}>
                                        <label htmlFor="description" style={{color:'#bbb', fontWeight:'500', marginBottom:'0.3rem', display:'block'}}>Description</label>
                                        <input type="text" id="description" name="description" value={note.description} onChange={onChange} style={{width:'100%', padding:'0.7rem', borderRadius:'7px', border:'none', background:'#2c313a', color:'#fff', fontSize:'1rem', marginBottom:'0.2rem'}} />
                                    </div>
                                    <div style={{marginBottom:'1.2rem'}}>
                                        <label htmlFor="tag" style={{color:'#bbb', fontWeight:'500', marginBottom:'0.3rem', display:'block'}}>Tag</label>
                                        <input type="text" id="tag" name="tag" value={note.tag} onChange={onChange} style={{width:'100%', padding:'0.7rem', borderRadius:'7px', border:'none', background:'#2c313a', color:'#fff', fontSize:'1rem', marginBottom:'0.2rem'}} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer" style={{background:'#23272f', borderTop:'1px solid #333', display:'flex', justifyContent:'center', gap:'1rem', padding:'1rem 1.5rem'}}>
                                <button type="button" className="btn" style={{background:'linear-gradient(90deg,#4f8cff,#1e3c72)', color:'#fff', fontWeight:'bold', border:'none', borderRadius:'8px', padding:'0.6rem 1.4rem', fontSize:'1rem', boxShadow:'0 2px 8px rgba(0,0,0,0.2)'}} onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn" style={{background:'linear-gradient(90deg,#4f8cff,#1e3c72)', color:'#fff', fontWeight:'bold', border:'none', borderRadius:'8px', padding:'0.6rem 1.4rem', fontSize:'1rem', boxShadow:'0 2px 8px rgba(0,0,0,0.2)'}} onClick={() => {
                                    Editnote(note.id || note._id, note.title, note.description, note.tag);
                                    Showalert("Updated Successfully");
                                    setShowModal(false);
                                }}>Update changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Notes;