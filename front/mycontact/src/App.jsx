
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AddContact from './components/AddContact'
import Contact from './components/Contacts'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/contacts">Contact</Link></li>
            <li><Link to="/add-contact">Add Contact</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/contacts" element={<Contact />} />
          <Route path="/add-contact" element={<AddContact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
