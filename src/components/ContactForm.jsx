import { useDispatch, useSelector } from "react-redux";
import { addContact, deleteContact } from "../redux/contactsSlice";
import { setFilter } from "../redux/filterSlice";
import ContactList from "./ContactList";

const ContactForm = () => {
    const dispatch = useDispatch();

    const contacts = useSelector((state) => state.contacts.contacts.items);
    const isLoading = useSelector((state) => state.contacts.contacts.isLoading);
    const error = useSelector((state) => state.contacts.contacts.error);
    const filter = useSelector((state) => state.filter);

    const handleFilter = (e) => {
        dispatch(setFilter(e.target.value));
    };

    const handleAddContact = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value.trim();
        const phone = e.target.elements.phone.value.trim();

        if (name && phone) {
            dispatch(addContact({ name, phone }));
            e.target.reset();
        }
    };

    const filteredContacts = contacts.filter((c) => {
        const name = c.name || "";
        const search = (filter || "").toLowerCase();
        return name.toLowerCase().includes(search);
    });

    return (
        <>
            <form onSubmit={handleAddContact}>
                <input name="name" placeholder="Ім’я" required />
                <input name="phone" placeholder="Телефон" required />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Завантаження..." : "Додати контакт"}
                </button>
            </form>

            {error && <p style={{ color: "red" }}>Помилка: {error}</p>}

            <input
                type="text"
                placeholder="Пошук по імені"
                value={filter}
                onChange={handleFilter}
            />

            <ContactList
                contacts={filteredContacts}
                onDelete={(id) => dispatch(deleteContact(id))}
            />
        </>
    );
};

export default ContactForm;
