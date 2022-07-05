import React,{useContext, useEffect,useState} from 'react'
import noteContext from '../../context/NoteContext';
import NoteItem from './NoteItem';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom';

const Notes = () => {
  let history = useHistory()
    const context = useContext(noteContext)
    const {note,getNote,setClicked,style,setStyle,editNote} = context;

    const [enote,seteNote] = useState({id:"",etitle:"",edescription:""})

    useEffect(()=>{
      if(localStorage.getItem('token')){
        getNote();
      }
      else{
        history.push('/login')
      }
    },[])

    const updateNote = (currentNote)=>{
      seteNote({id:currentNote._id,etitle:currentNote.title , edescription:currentNote.description})
    }

    const handleClick = ()=>{
      setStyle({
          display:"none"
      })
      setClicked(false)
    }
    
    const handleClick1 = ()=>{
      editNote(enote.id,enote.etitle,enote.edescription)
      setStyle({
          display:"none"
      })
      setClicked(false)
    }

    const handleChange = (e)=>{
      seteNote({...enote,[e.target.name]:e.target.value})
     }
  return (
    <div className='notes'>
      {note.map((notes,index)=>{
          return(
            <NoteItem key={index} updateNote={updateNote} notes={notes}/>
          )
        })}
      <div className='edit-box' style={style}>
        <div className='edit'>
            <CloseIcon style={{ fontSize: 30 }} className='close-icon'  onClick={handleClick}/>
            <div className="edit-form">
                <input type="text" value={enote.etitle} onChange={handleChange} name='etitle'/>
                <textarea name="edescription" value={enote.edescription}  onChange={handleChange} id="text" cols="30" rows="10"></textarea>
                <button className='btn' onClick={handleClick1}>Save Changes</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Notes
