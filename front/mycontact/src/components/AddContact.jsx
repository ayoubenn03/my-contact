import { useEffect } from 'react';
import {useState} from 'react';

export default function AddContact() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setNumber] = useState("")

    
    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            const query = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName,
                lastName,
                phone
        })
   };
   console.log(query.body)
    fetch('http://localhost:3000/api/contacts', query)
   .then(response => response.json())
        }catch (err) {
            return err.message
        }
   
  
    }
    
  
    return (
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
             type="text"
             name="Phone"
             value={phone}
              onChange={((e)=> setNumber(e.target.value))}
             />
            <button type='submit'>Create</button>
        </form>
       
    )
}