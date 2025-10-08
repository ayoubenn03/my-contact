
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Contact() {
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

       useEffect(()=> {
            const query = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
             }
   };
            const fetchContacts = async () => {
                try {
            const response = await fetch("http://localhost:3000/api/contacts", query)
            const data = await response.json();
            setContacts(data.result)
        } catch (err) {
            console.error(err)
            setContacts([])
        }   
        }
        fetchContacts()
       }, []) 

      const handleUpdateContact = (contact) => {
        navigate('edit-contact', {state: {contact}})
      }
       const handleDeleteContact = (contact) => {
        navigate('delete-contact', {state: {contact}})
      }
      const handleLogout = (contact) => {
        localStorage.removeItem('token')
        navigate('/')
      }
      
       
    

    return (
        <div>
            <span onClick={()=>handleLogout()}>
                Logout
            </span>
            <p><Link to="/add-contact">Add Contact</Link></p>
            <table>
                <thead>
                    <tr>
                        <th>
                            Firstname
                        </th>
                        <th>
                            Lastname
                        </th>
                          <th>
                            Phone
                        </th>
                         <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact)=> (
                        <tr key = {contact._id || index}>
                            
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.phone}</td>
                            <td>
                                <button onClick={()=>handleUpdateContact(contact)}>Edit</button>
                            </td>
                            <td>
                                <button onClick={()=>handleDeleteContact(contact)}>Delete</button>
                            </td>
                        </tr>
                        
                    ))}
                    
                </tbody>
            </table>
        </div>
       
    );
   
}