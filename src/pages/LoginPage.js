import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/authSlice';

export default function LoginPage() {
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        dispatch(loginUser({ email, password }));
        form.reset();
    };


    return (
        <form onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
}
