import {React, useState,} from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
  // const host = "https://git.heroku.com/codebyte-inotebook.git";
    const noteInitial = []
    const [note,setNote] = useState(noteInitial);
    const [clicked,setClicked] = useState(false)
    const [style,setStyle] = useState({
      display:"none"
  })

    const func = ()=>{
        setStyle({
          display:"flex"
      })
   
    }
    const getNote = async()=>{
      const response = await fetch(`/api/notes/fetchnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
      });
      const json = await response.json();
      setNote(json);
    }

    const addNote = async(title,description)=>{
      const response = await fetch(`/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({title,description})
      });
      const notes = await response.json();
      const {saveNote} = notes
      console.log(saveNote);
      let x = note.concat(saveNote)
      setNote(x)
    }

    const deleteNote = async(id)=>{
      const response = await fetch(`/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
      });
      const newNotes = note.filter((items)=>{
        return items._id !== id
      })
      setNote(newNotes)
    }
    
    const editNote = async(id,title,description)=>{
      const response = await fetch(`/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({title,description})
      });
      const json = await  response.json();

      let newNotes = await JSON.parse(JSON.stringify(note))

      for (let index = 0; index < newNotes.length; index++) {
        const element = note[index]
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          break;
        }
      }
      console.log(newNotes)
      setNote(newNotes)
    }
    return(
        <NoteContext.Provider value={{note,addNote,deleteNote,getNote,clicked,setClicked,func,style,setStyle,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;