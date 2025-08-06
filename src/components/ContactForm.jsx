import { useDispatch } from 'react-redux';
import { addContact } from '../redux/contactsSlice';

export default function ContactForm() {
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const number = form.number.value;
        dispatch(addContact({ name, number }));
        form.reset();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" required />
            <input name="number" placeholder="Phone" required />
            <button type="submit">Add contact</button>
        </form>
    );
}
