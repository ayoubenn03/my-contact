
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AddContact from './components/AddContact'
import Contact from './components/Contacts'
import Register from './components/Register';
import Login from './components/Login';
import UpdateContact from './components/UpdateContact';
import DeleteContact from './components/DeleteContact';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/contacts" element={<Contact/>}/>
          <Route path="/add-contact" element={<AddContact/>}/>
          <Route path="/contacts/edit-contact" element={<UpdateContact/>}/>
          <Route path="/contacts/delete-contact" element={<DeleteContact/>}/>
          <Route path="/logout" element={<Logout/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App
