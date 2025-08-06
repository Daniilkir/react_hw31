import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from './redux/authSlice';
import Navigation from './components/Navigation';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ContactsPage from './pages/ContactsPage';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);


  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contacts" element={
          <PrivateRoute>
            <ContactsPage />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
}
