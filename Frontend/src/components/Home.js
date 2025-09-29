import React ,{useContext}from 'react'
import nextContext from '../context/notes/noteContext';
import Notes from './Notes'
import Addnote from './Addnote'
import Alert from './Alert'
const Home=()=>{
    return (
        <div className="home">
            <h1 style={{color:'#4f8cff'}}>Welcome to INoteBook</h1>
            <p>Save your notes securely and access them anywhere.</p>
            <Addnote />
            <Notes />
        </div>
    );
}
export default Home;