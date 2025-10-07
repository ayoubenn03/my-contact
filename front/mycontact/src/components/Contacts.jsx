
import { useEffect, useState } from "react";


export default function Contact() {
    const [contacts, setContacts] = useState([]);

       useEffect(()=> {
        
            const fetchContacts = async () => {
                try {
            const response = await fetch("http://localhost:3000/api/contacts")
            const data = await response.json();
            setContacts(data.result)
        } catch (err) {
            console.error(err)
            setContacts([])
        }   
        }
        fetchContacts()
       }, []) 
       
    

    return (
        <div>
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
                            Number
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact)=> (
                        <tr key = {contact._id || index}>
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.phone}</td>
                        </tr>
                        
                    ))}
                    
                </tbody>
            </table>
        </div>
       
    );
   
}