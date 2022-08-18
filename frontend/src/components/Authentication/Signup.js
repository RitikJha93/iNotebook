import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import {Link} from 'react-router-dom'

const Signup = () => {
  let history = useHistory()
  const [credential,setcredential] = useState({name:'',email:'',password:''});
  const [formValues,setFormValues] = useState(credential)
  const [formErrors,setFormErrors] = useState({})
  const [backendErrors,setBackendErrors] = useState()
  const [isSubmit,setIsSubmit] = useState(false);

  const handleClick = async()=>{
    const {name,email,password} = formValues;
    const response = await fetch(`/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name,email,password})
    });
    const json = await response.json();
    setBackendErrors(json.error)

    if(json.success){
      localStorage.setItem('token',json.authToken);
      history.push('/login');
    }
    else{
      setFormErrors(validate(formValues));
      setIsSubmit(true)
    }
    
  }

  const handleChange  = (e)=>{
    setFormValues({...formValues,[e.target.name]:e.target.value})
    setFormErrors(validate(formValues));
  }

  const validate = (values)=>{
    const errors = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // eslint-disable-next-line
    if(!values.name){
      errors.name = "username cannot be empty"
    }
    else if (values.name.length < 5){
      errors.name = "username must be of min 5 characters"
    }
    if(!values.email){
      errors.email = "email cannot be empty"
    }
    else if (!regex.test(values.email)){
      errors.email = "Invalid email"
    }
    else if(backendErrors){
      errors.email = backendErrors;
    }
    if(!values.password){
      errors.password = "password cannot be empty"
    }
    else if(values.password.length < 8){
      errors.password = "password must be of min 8 characters"
    }
    return errors;
  }

  useEffect(()=>{
    // console.log(formErrors)
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formValues);
      console.log(formErrors)
    }
  },[formErrors])
  return (
    <div className='signup'>
      <div className="signup-box">
        <h2>Signup</h2>
        <form method="post">
          <div className="signup-form">
              <div className="input-box">
                <div className="input-box1">
                  <PersonIcon className='log-icon'/>
                  <input type="text" placeholder='Enter your name' value={formValues.name} onChange={handleChange} name='name'/>          
                </div>
                <p>{formErrors.name}</p>
              </div>
              
              <div className="input-box">
                <div className="input-box1">
                  <EmailIcon className='log-icon'/>
                  <input type="text" placeholder='Enter your email' value={formValues.email} onChange={handleChange} name='email'/>
                </div>
                  <p>{formErrors.email}</p>
              </div>
              <div className="input-box">
                  <div className="input-box1">
                    <LockIcon className='log-icon'/>
                    <input type="password" placeholder='Enter your password' value={formValues.password} onChange={handleChange} name='password'/>
                  </div>
                  <p>{formErrors.password}</p>
              </div>
              <div className="button-box">
                <button className='btn1' type="button" onClick={handleClick}>Sign Up</button>
              </div>
              <p>Already have an account? <Link className="lis" to="/login">Login now</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
