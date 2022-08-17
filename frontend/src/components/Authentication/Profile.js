import React, { useEffect,useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

const Profile = () => {

    const [profile,setProfile] = useState({name:'',email:''})
    const [loading,setLoading] = useState(false)
    const getUser = async()=>{
        setLoading(true)
        const response = await fetch(`https://git.heroku.com/codebyte-inotebook.git/api/auth/getuser`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
            },
        });
        const json = await response.json();
        const {name,email} = json

        setProfile({name,email})
        setLoading(false)
        
    }
      useEffect(()=>{
          getUser()
      },[])
  return (
    <div className='user-profile'>
        {!loading && 
        <div className='profile-box'>
            <div className="box1">
                <div className="avatar">
                    <Avatar sx={{ bgcolor: deepOrange[500],height: '70px', width: '70px',margin:'0 auto',fontSize:'35px' }}>{((profile.name).slice(0,2).toUpperCase())}</Avatar>
                </div>
                <h3>Name : {profile.name}</h3>
                <h3>email : {profile.email}</h3>
            </div>
        </div>
        }
    </div>
  )
}
export default Profile
