import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';

export default function Navigation() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    return (
        <nav>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
            {isLoggedIn && <NavLink to="/contacts">Contacts</NavLink>}
            {isLoggedIn && <UserMenu />}
        </nav>
    );
}
