import React,{useEffect,useContext,useState}from 'react';
import {useLocation,Redirect} from 'react-router-dom';
import {UserContext} from '../../context/user/UserContext';
import Cookie from 'js-cookie';

const Authenticate=()=>{
    const {hash}=useLocation();
    const {setUser}=useContext(UserContext);
    const [isLogged,setIsLogged]=useState(false);
    useEffect(() => {
        let params=hash.slice(1,hash.length).split('&');
        let access_token=params[0].split('=')[1];
        let expires=params[2].split('=')[1];
        let hashed_state=params[3].split('=')[1];
        if(Cookie.get('hashed_state')===hashed_state){
            let now=new Date();
            now.setTime(now.getTime()+1*Number(expires)*1000);
            Cookie.set('token',access_token,{expires:now});
            fetch('https://api.spotify.com/v1/me',{
                'method':'GET',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${access_token}`
                }
            }).then(res=>res.json()).then(res=>{
                setUser({
                    email:res.email,
                    name:res.display_name,
                    pfp:res.images[0].url,
                    uri:res.uri,
                    token:access_token
                });
                setIsLogged(true);
            })
        } else {
            console.log('Request and Response not same origin')
        }
        
    },[])
         
    return(
        <>
        {isLogged?<Redirect to="/" />:false}
        </>
    )
}

export default Authenticate;