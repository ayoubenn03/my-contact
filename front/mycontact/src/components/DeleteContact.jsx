
import {useState} from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function DeleteContact() {
    const navigate = useNavigate();
    const location = useLocation();
    const {contact} = location.state || {};
    const [firstName, setFirstName] = useState(contact.firstName || '')
    const [lastName, setLastName] = useState(contact.lastName || '')
   
    
    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            const query = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
             },

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
            <p><Link to='/contacts'>List contacts</Link></p>
            <form onSubmit={handleDelete}>
            <p>Are you sure to delete {firstName} {lastName} from your contacts ?</p>
            <button type='submit'>Delete</button>
        </form>
        <button onClick={()=>navigate('/contacts')}>Cancel</button>
        </div>
       
       
    )
}