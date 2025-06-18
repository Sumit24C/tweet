import { CircularProgress, Box, Modal, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCurrentUser } from './appwrite/auth';
import { login as authLogin } from './store/authSlice';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { AddTweet, Header } from './components/index';

function App() {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(authLogin(user));
          if (location.pathname === '/login') {
            navigate('/');
          }
        } else {
          navigate('/login');
        }
      })
      .catch((error) => console.error('login error:', error))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: '#121212',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ margin: 0, padding: 0, minHeight: '100vh', bgcolor: '#121212' }}>
      {/* Fixed Header */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100 }}>
        <Header />
      </Box>

      {/* Scrollable Main Content */}
      <Box
        sx={{
          pt: '72px', // push below fixed Header (64px AppBar + margin)
          px: 2,
          pb: 4,
        }}
      >
        <Outlet />
      </Box>


    </Box>
  );
}

export default App;
