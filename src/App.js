import React from 'react'
import Home from './components/Pages/Home'
import About from './components/Pages/About'
import Contact from './components/Pages/Contact'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Authentication/Login'
import Signup from './components/Authentication/Signup'
import Profile from './components/Authentication/Profile'

import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import NoteState from './context/NoteState'
function App() {
  return (
    <NoteState>
      <Router>
          <Navbar/>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/user">
              <Profile />
            </Route>
          </Switch>
      </Router>
    </NoteState>

  )
}

export default App
