import { useDispatch } from "react-redux";
import { deleteContact } from "../redux/contactsSlice";

const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

  const handleDelete = (name) => (e) => {
    e.preventDefault();
    dispatch(deleteContact(name));
  };

  return (
    <ul>
      {(contacts || []).map((c, i) => (
        <li key={i}>
          <p>{c.name} : {c.phone}</p>
          <form onSubmit={handleDelete(c.name)}>
            <button type="submit">Видалити</button>
          </form>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
