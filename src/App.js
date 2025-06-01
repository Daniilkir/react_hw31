import './App.css';
import ContactForm from './components/ContactForm.jsx';
import ContactList from './components/ContactList';

function App() {
  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm />
      <ContactList />
    </div>
  );
}

export default App;
