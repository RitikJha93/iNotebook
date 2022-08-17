import React,{useContext} from 'react'
import EditIcon from '@mui/icons-material/Edit';
import noteContext from '../../context/NoteContext';
import DeleteIcon from '@mui/icons-material/Delete';
const NoteItem = ({notes,updateNote}) => {
    const context = useContext(noteContext)
    const {deleteNote,setClicked,func} = context
    const {title,description} = notes
    
    const handleClick = ()=>{
      setClicked(true)
      func()
      updateNote(notes)
    }
  return (
    <>
    <div className='notes1'>
        <div className="text">
           <h3>{title}</h3>
           <p>{description}</p>
        </div>
      
      <div>
        <EditIcon className='edit-icon' onClick={()=>handleClick()}/>
        <DeleteIcon className='delete-icon' onClick={()=>deleteNote(notes._id)}/>
      </div>
    </div>
  </>

  )
}

export default NoteItem
