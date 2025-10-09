import { useEffect } from 'react';
import {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function AddContact() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setNumber] = useState()
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const query = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
             },
            body: JSON.stringify({
                firstName,
                lastName,
                phone
        })
   };
    const response = await fetch(`${process.env.APIURL}/contacts`, query);
    const resJson = await response.json();
    let messageRequiredField = '';
    const errorsMongo =  resJson.msg.errors;
    if(response.ok) {
        alert(`${firstName} ${lastName} added to your contacts`)
        navigate('/contacts');
    } else {
        if(errorsMongo.phone){
            messageRequiredField += `\n${errorsMongo.phone.properties.message}`
        }
         if(errorsMongo.firstName){
            messageRequiredField += `\n${errorsMongo.firstName.properties.message}`
        }
         if(errorsMongo.lastName){
            messageRequiredField += `\n${errorsMongo.lastName.properties.message}`
        }
        alert(messageRequiredField)
    }
        }catch (err) {
            return err.message
        }
        
  
    }
    
  
    return (
        <div>
            <nav style={{
                display: 'flex',
                gap: '80px',
                padding: '10px',
                backgroundColor: '#f0f0f0'
            }}>
           
            <p className="nav-item"><Link to="/contacts">My contacts</Link></p>
            </nav>
            <h2>Add your contact</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    FirstName
                     <input 
                    type ="text"
                    name="Firstname"
                    value={firstName}
                    onChange={((e)=> setFirstName(e.target.value))}/>
                </label>
                <hr/>
                <label>
                    Lastname
                    <input 
                type="text"
                name="Lastname"
                value={lastName}
                 onChange={((e)=> setLastName(e.target.value))}/>
                </label>
                <hr/>
                <label>
                    Phone number
                    <input 
             type="number"
             name="Phone"
             value={phone}
              onChange={((e)=> setNumber(e.target.value))}
             />
                </label>
            <hr/>
            
             
            <button type='submit'>Add</button>
        </form>
         <style>
    {`
      .nav-item {
       
        border-radius: 10px;
        transition: background-color 0.2s;
      }
      .nav-item:hover {
        text-decoration: underline; 
        text-decoration-color: black; 
        color: white;
        
      }
    `}
  </style>
        </div>
       
       
    )
}