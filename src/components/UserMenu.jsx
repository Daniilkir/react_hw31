import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authSlice';

export default function UserMenu() {
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.user.email);

    return (
        <div>
            <p>{email}</p>
            <button onClick={() => dispatch(logoutUser())}>Logout</button>
        </div>
    );
}
