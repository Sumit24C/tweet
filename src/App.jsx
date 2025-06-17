import { CircularProgress, Box, Container, Popper, Modal, Button } from '@mui/material';
import { useEffect, useState } from 'react'
import { login as appwriteLogin, getCurrentUser } from './appwrite/auth'
import { login as authLogin } from './store/authSlice'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import { Header } from './pages/index';
import { AddTweet } from './components/index';
function App() {
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(authLogin(userData))
          if (location.pathname === '/login') {
            navigate('/')
          }
        } else navigate('/login')
      })
      .catch((error) => console.log('login :: error', error))
      .finally(() => setLoading(false))
  }, [navigate])

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#121212',
          margin: 0
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ margin: 0, padding: 0, minHeight: '100vh' }}>
      <Header />
      <Button
        onClick={() => setIsOpen(true)}
        sx={{
          backgroundColor: '#2c1a40',
          color: '#e0d4ff',
          mx: 1,
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 2,
          textTransform: 'capitalize',
          '&:hover': {
            backgroundColor: '#2c1a40',
            borderColor: '#ba68c8',
          },
        }}
      >
        Create
      </Button>
      < Modal
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <AddTweet closeModal={() => setIsOpen(false)} />
      </Modal>
      <main>
        <Outlet />
      </main>
    </Box>
  )
}

export default App
