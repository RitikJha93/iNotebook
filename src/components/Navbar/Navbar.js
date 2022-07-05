import {React,useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import {Link,useLocation} from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Navbar.css'
const Navbar = () => {

  const [myStyle,setmyStyle] = useState({
    display:"none"
  })
  let location = useLocation();
  let history = useHistory()

  useEffect(() => {
  }, [location]);

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    setmyStyle({
      display:"none"
    })
    history.push('/login')
  }
  const handleClick = ()=>{
    if(myStyle.display === 'none'){
      setmyStyle({
        display:"flex"
      })
    }
    else{
      setmyStyle({
        display:"none"
      })
    }
  }

  return (
    <div className='navbar'>
      <div className='logo'>
        <h1>iNotebook</h1>
      </div>
      {!localStorage.getItem('token')?
        
        <div></div>
        :
        <div className="buttons">
          <AccountCircleIcon className='acc-icon'  onClick={handleClick}/>
          <div className='account' style={myStyle}>
              <Link className='li' to="/user" onClick={handleClick}><p>Profile</p></Link>
              <p onClick={handleLogout}>Logout</p>
          </div>
        </div>}
    </div>
  )
}

export default Navbar
 