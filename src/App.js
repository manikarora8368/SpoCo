import React,{useEffect,useContext} from 'react';
import {v4 as uuidv4} from 'uuid';
import Cookie from 'js-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {db,auth,functions} from './firebase';
import './App.css';

// Components
import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import Content from './components/Content/Content';
import Authenticate from './components/Authenticate/Authenticate';

// Context
import {UserContext} from './context/user/UserContext';


// 1) website.com -> main landing page to login
// 2) if logged in -> redirect to website.com/home 
// 3) if not logged in -> login using website.com/auth
// 4) on website.com/auth , set the cookie and the userContext -> then redirect to website.com/home
// 5) on website.com/home , do the shit you want to do and create other subpaths and links , components

const App=()=>{
  const {user,setUser}=useContext(UserContext);
  useEffect(()=>{
    //if there is no hashed_state , create one to identify client
    if(Cookie.get('hashed_state')===undefined)
      Cookie.set('hashed_state',uuidv4());

    //if user had already logged in
    if(Cookie.get('token')!==undefined)
      fetch('https://api.spotify.com/v1/me',{
                'method':'GET',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${Cookie.get('token')}`
                }
            }).then(res=>res.json()).then(res=>{
                setUser({
                    email:res.email,
                    name:res.display_name,
                    pfp:res.images[0].url,
                    uri:res.uri,
                    token:Cookie.get('token')
                })
                const cct=functions.httpsCallable('cct');
              cct({
                    email:res.email,
                    name:res.display_name,
                    pfp:res.images[0].url,
                    uri:res.uri,
                    token:Cookie.get('token')
                }).then(jwt=>auth.signInWithCustomToken(jwt.data));
            });
  },[])
  return(
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/home">
          <Content />
        </Route>
        <Route exact path="/auth">
          <Authenticate />
        </Route>      
    </Switch>
    </Router>
    </>
  )
}

export default App;