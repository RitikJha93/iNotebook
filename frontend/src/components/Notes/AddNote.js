import React, { useContext, useState } from 'react'
import noteContext from '../../context/NoteContext';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AddNote = () => {
    const context = useContext(noteContext)
    const {addNote} = context
    const [note,setNote] = useState({title:"",description:""})
    const handleChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
        
    }

    const handleClick = ()=>{
        if(note.title === '' || note.description === ''){
          alert("cant be empty")
        }
        else{
          addNote(note.title,note.description)
          setNote({title:"",description:""})
        }
    }
  return (
    <div className="note-box">
        <input type="text"  name='title' placeholder='Title' value={note.title} onChange={handleChange}/>
        <textarea name='description' placeholder="Add your note" value={note.description} id="" cols="70" rows="10" onChange={handleChange}></textarea>
        <AddCircleIcon className="icon" onClick={handleClick}/>
    </div>
  )
}

export default AddNote
