import { useEffect } from 'react';
import {useState} from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function UpdateContact() {
    const navigate = useNavigate();
    const location = useLocation();
    const {contact} = location.state || {};
    const [firstName, setFirstName] = useState(contact.firstName || '')
    const [lastName, setLastName] = useState(contact.lastName || '')
    const [phone, setPhone] = useState(contact.phone || '')
   
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const query = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
             },
            body: JSON.stringify({
                firstName,
                lastName,
                phone
        })
   };
    const response = await fetch(`${process.env.APIURL}/contacts/${contact._id}`, query)
    const resJon = await response.json();
    alert(resJon.message)
    if(response.ok) {
        navigate('/contacts')
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
                 <p><Link to='/contacts'>List contacts</Link></p>
            </nav>
           
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
              onChange={((e)=> setPhone(e.target.value))}
             />
            <button type='submit'>Edit</button>
        </form>
        </div>
       
       
    )
}