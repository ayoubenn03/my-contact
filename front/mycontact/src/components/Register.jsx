import { useEffect } from 'react';
import {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';


export default function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    
    const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const query = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, query);

    let resJson;
    try {
      resJson = await response.json();
    } catch {
      resJson = { error: { message: 'Réponse invalide du serveur' } };
    }

    if (response.ok) {
      localStorage.removeItem('token');
      navigate('/');
      return;
    }

    let msgError = '';

    if (resJson.error?.error?.errors) {
      if (resJson.error.error.errors.email) {
        msgError += '\n' + resJson.error.error.errors.email.message;
      }
      if (resJson.error.error.errors.password) {
        msgError += '\n' + resJson.error.error.errors.password.message;
      }
    }
    else if (resJson.error?.message) {
      msgError = resJson.error.message;
    } else {
      msgError = 'Error';
    }

    alert(msgError);
  } catch (err) {
    alert('Server error : ' + err.message);
  }
};

  
    return (
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <label>
            Email  <input 
            type ="text"
            name="Email"
            value={email}
            onChange={((e)=> setEmail(e.target.value))}/>
          </label>
          <hr/>
           <label>
            Password <input 
                type="password"
                name="Password"
                value={password}
                 onChange={((e)=> setPassword(e.target.value))}/>
           </label>
            <hr/>
             <p><Link to="/">Have an account ? Login</Link></p>
            <button type='submit' >Register</button>
        </form>
       
    )



  }