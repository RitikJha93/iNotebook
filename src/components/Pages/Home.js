import React, { useContext } from 'react'
import './Home.css'
import Notes from '../Notes/Notes';
import AddNote from '../Notes/AddNote';
const Home = () => {
  
  return (
    <div className='home-container'>
      <AddNote/>
      <Notes/>
    </div>
  )
}

export default Home
