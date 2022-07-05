import React, { useContext } from 'react'
import noteContext from '../../context/NoteContext'
const About = () => {
  const a = useContext(noteContext)

  return (
    <div>
      This is about
    </div>
  )
}

export default About
