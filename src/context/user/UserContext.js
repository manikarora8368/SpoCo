import React,{createContext,useState} from 'react';

const UserContext=createContext();

const UserProvider=({children})=>{
    const [user,setUser]=useState({
        email:'',
        name:'',
        pfp:'',
        uri:'',
        token:''
    });
    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext,UserProvider};