import React,{useContext,useRef} from 'react';
import nextContext from '../context/notes/noteContext';
const host = "https://notebook-backend-feva.onrender.com";
const NoteItem = (props) => {
  const Context=useContext(nextContext);
  const {Notes2,setNote,Showalert,alert,fetchnotes,setNotes}=Context;
  const {updatenote}=props;
    const { title, description,tag} = props.note;
    const { note,id } = props;
    
    
    const ref=useRef(null);
    const updatenote2 = (note) => {
    //console.log("Notes =c",note);
    note.id?Deletenote(note.id):Deletenote(note._id);
        //console.log("Note to be deleted = ",id);
    }
        //console.log("Its being Printed");
    //Delete the Note
    const Deletenote = async (id) => {
      //console.log("id To be deleted = ",id)
    const url = `${host}/api/notes/deleteNote/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authenticationtoken': localStorage.getItem('token')
      },
      body: JSON.stringify({id})
    });
    const json = await response.json();
    //console.log("Deleted response:", json);
    const newNotes = Notes2.filter(note => note.id !== id);
    setNotes(newNotes);
    fetchnotes();
  };
  
  return (
    <div className="note-item">
      <h5 style={{color:'#4f8cff'}}>{note.title}</h5>
      <p>{note.description}</p>
      <span style={{background:'#4f8cff',color:'#fff',borderRadius:'4px',padding:'2px 8px',fontSize:'0.9rem'}}>{note.tag}</span>
      <div>
        <i className="fa fa-trash mx-2" style={{color:'#ff6b6b'}} onClick={() => { updatenote2(note); Showalert("Note Deleted SuccessFully") }}></i>
        <i className="fa fa-edit mx-2" style={{color:'#4f8cff'}} onClick={() => updatenote(note)}></i>
      </div>
    </div>
  );
}

export default NoteItem;
