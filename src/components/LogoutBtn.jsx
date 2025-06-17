import React, { useState } from 'react'
import { logout as appwriteLogout } from '../appwrite/auth'
import { logout as authLogout } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Box } from '@mui/material';

function LogoutBtn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const handleLogout = async () => {
    setLoading(false)
    await appwriteLogout()
      .then(() => {
        dispatch(authLogout())
        navigate('/login')
      })
      .catch((error) => console.log('appwriteError :: LogoutBtn :: error ', error))
  }

  return (
    <>
      <Button
        onClick={handleLogout}
        variant='outlined'
        loading={!loading}
        loadingPosition='start'
      >
        Logout
      </Button>
    </>
  )
}

export default LogoutBtn
