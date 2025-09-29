import React, { useState, useRef, useEffect } from 'react';
import noteContext from './noteContext';


const host = "https://notebook-backend-feva.onrender.com";

const Notesinitial = [
];

const NoteState = (props) => {
  const [token, setToken] = useState("");
  const [alert, Showalert] = useState("");
  useEffect(() => {
    if (alert !== "") {
      const timer = setTimeout(() => {
        Showalert("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });

  const [Notes2, setNotes] = useState(Notesinitial);


  // 🟡 Edit Note
  const Editnote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authenticationtoken': localStorage.getItem('token')
      },
      body: JSON.stringify({ id,title, description, tag })
    });
    const json = await response.json();


    const updatedNotes = Notes2.map(note =>
      note._id === id ?{ ...note, title, description, tag }:note
    );
    setNotes(updatedNotes);
  };
  const handleclick = (e,title,description,tag) => {
    e.preventDefault();
    addnote(title, description, tag);
  // ...removed unnecessary log...
    setNote({ title: "", description: "", tag: "" });
  }
  const handleclick2 = (note) => {
    refClose.current.click();
    setNote(note);
  }
  // 🟢 Add Note
  const addnote = async (title, description, tag) => {
    const url = `${host}/api/notes/AddNotes`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authenticationtoken': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
  // ...removed unnecessary log...


    const newNote = {
      "id":json,
      "title": title,
      "description": description,
      "tag": tag
    };

    setNotes(Notes2.concat(newNote));
  };

  const fetchnotes = async () => {
    const url = `${host}/api/notes/fetchnotes`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authenticationtoken': localStorage.getItem('token')
      }
    });
    const json = await response.json();
  // ...removed unnecessary log...
    setNotes(json);
  };

  return (
    <noteContext.Provider value={{ Notes2, addnote, Showalert, alert,  Editnote, setNotes, fetchnotes, note, setNote, handleclick, handleclick2, refClose, token, setToken }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
