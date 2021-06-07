import React,{useEffect,useState,useContext} from 'react';
import Cookie from 'js-cookie';
import './Navbar.css';

// assets
import logo from '../../assets/images/Spotify_Logo_RGB_White.png';
import { UserContext } from '../../context/user/UserContext';

// functions
import login from '../../functions/login';
import {auth} from '../../firebase';

const Navbar=()=>{
  const {user,setUser} = useContext(UserContext);
  const logout=()=>{
    Cookie.remove('token');
    setUser({
    email:'',
    name:'',
    pfp:'',
    uri:'',
    token:''
    });
    auth.signOut();
  }
    return(
      <div className='nav'>
            <img src={logo} alt="SpoCo logo"></img>
            <div className="nav-links">
            {user.token?(
            <>
            <button>Matches</button>
            <button>Account</button>
            <button onClick={logout}>Logout</button>
            </>):(
              <button onClick={login}>Login With Spotify</button>
            )}
            </div>
      </div>
    )
}
export default Navbar;