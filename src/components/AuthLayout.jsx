import { CircularProgress, Box, Modal, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../appwrite/auth'
import { login as authLogin, logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function AuthLayout({ children, authentication }) {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        if (authStatus === null) {
            getCurrentUser()
                .then((user) => {
                    if (user) {
                        dispatch(authLogin(user));
                    } else {
                        dispatch(logout())
                    }
                })
                .catch((error) => {
                    console.error('login error:', error)
                    dispatch(logout())
                })
        }
    }, [authStatus, dispatch]);

    useEffect(() => {
        if (authStatus !== null) {
            if (authentication && authStatus == false) {
                navigate('/login')
            }
            else if (!authentication && authStatus == true) {
                navigate('/')
            }
        }
    }, [authentication, navigate, authStatus])

    if (authStatus === null) {
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
        )
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default AuthLayout