import React,{useState,useEffect} from "react";
import Header from "./Header";
import "./CSS/Todo.css";
import InputBox from "./InputBox";
import Note from "./Note";
import axios from "axios";
import { doLogout,getCurrentUser } from "../auth";
import { Navigate } from "react-router-dom";

function Todo() {
      const[notes,setNotes]=useState([]);
      const [loggedout,setLogged]=useState(false);

      useEffect(()=>{
        try{
          axios.get(`${process.env.REACT_APP_API}/notes/getnotes/${getCurrentUser()}`)
          .then((res)=>res.data)
          .then(data=>setNotes(data));
        }
        catch(err)
        {
            console.log("Error fetching details");
        }
      },[])

      function addNote(newNote)
      {
          try{
            axios.post(`${process.env.REACT_APP_API}/notes/postnote/${getCurrentUser()}`,{text:newNote})
            .then(res=>res.data)
            .then(data=>setNotes(prevNotes=>[...prevNotes,data]))
          }
          catch(error)
          {
            console.log("Couldn't add to DB")
          }
      }

      function deleteNote(id)
      {
        setNotes(prevNotes=>{
          return prevNotes.filter((note)=>{
            return note._id!==id;
          })
        })
        try{
            axios.delete(`${process.env.REACT_APP_API}/notes/deletenote/${getCurrentUser()}/${id}`)
        }
        catch(error)
        {
            console.log("could not delete the note")
        }
      }

      function editNote(id,editedNote)
      {
          setNotes(prevNotes=>{
              for(let i=0;i<prevNotes.length;i++)
              {
                if(prevNotes[i]._id===id)
                {
                  prevNotes[i].text=editedNote;
                }
              }
              return [...prevNotes];
            })
          axios.patch(`${process.env.REACT_APP_API}/notes/changenote/${getCurrentUser()}/${id}`,{text:editedNote})
      }

      function logout()
      {
        doLogout();
        setLogged(true);
      }

  return (
    <div>
      <Header />
      <div className="list-container">
        <button className="logout" onClick={logout}>Logout</button>
        {loggedout && <Navigate to="/" />}
        <InputBox
            addNote={addNote}
        />
      </div>
      <div className="list-container" style={{"marginTop":"30px"}}>
          {notes.map((note)=>{
           return <Note
                id={note._id}
                text={note.text}
                deleteNote={deleteNote}
                editNote={editNote}
            />
          })}
      </div>
      
    </div>
  );
}

export default Todo;