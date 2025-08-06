import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../redux/contactsSlice';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import { setFilter } from '../redux/filterSlice';

export default function ContactsPage() {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.items);
    const filter = useSelector(state => state.filter);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleFilter = e => {
        dispatch(setFilter(e.target.value));
    };

    const filtered = contacts.filter(c =>
        c.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <>
            <h2>Contacts</h2>
            <ContactForm />
            <input
                type="text"
                placeholder="Filter contacts"
                value={filter}
                onChange={handleFilter}
            />
            <ContactList contacts={filtered} />
        </>
    );
}
