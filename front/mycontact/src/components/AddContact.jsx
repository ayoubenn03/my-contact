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
    const response = await fetch('http://localhost:3000/api/contacts', query);
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
            <p><Link to='/contacts'>List contacts</Link></p>
            <form onSubmit={handleSubmit}>
            <input 
            type ="text"
            name="Firstname"
            value={firstName}
            onChange={((e)=> setFirstName(e.target.value))}/>
            <input 
                type="text"
                name="Lastname"
                value={lastName}
                 onChange={((e)=> setLastName(e.target.value))}/>
             <input 
             type="number"
             name="Phone"
             value={phone}
              onChange={((e)=> setNumber(e.target.value))}
             />
            <button type='submit'>Add</button>
        </form>
        </div>
       
       
    )
}