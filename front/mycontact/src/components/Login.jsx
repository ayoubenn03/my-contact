import { useEffect } from 'react';
import {useState} from 'react';
import { Route, Router, useNavigate } from 'react-router-dom';
import Register from './Register';
import {  Link } from "react-router-dom";


export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const query = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
        })
   };
     const response = await fetch('http://localhost:3000/api/users/login',query)
     const resJson = await response.json()
   if(response.ok) {
    localStorage.setItem( 'token', resJson.token)
    navigate('/contacts');
   } else {
    alert(resJson.message)
   }
  
        }catch (err) {
            return err.message
        }
   
  
    }
  
    return (
        <div>
             <form onSubmit={handleSubmit}>
            <input 
            type ="text"
            name="Email"
            value={email}
            onChange={((e)=> setEmail(e.target.value))}/>
            <input 
                type="text"
                name="Password"
                value={password}
                 onChange={((e)=> setPassword(e.target.value))}/>
             
            <button type='submit'>Login</button>
        </form>
            <p>Pas de compte ?</p>
            <p><Link to="/register">Register</Link></p>


            
        </div>
       
        
       
    )



  }