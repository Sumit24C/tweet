import React, { useEffect, useState } from 'react'
import { login as authLogin } from '../store/authSlice'
import { login as appwriteLogin } from '../appwrite/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
    TextField,
    Box,
    Stack,
    Button,
    Typography,
    Alert,
    CircularProgress
} from '@mui/material'

function Login() {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setErrors] = useState('')
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        console.log("authStatus Login", authStatus)
    }, [authStatus])

    const login = async (data) => {
        setLoading(true)
        setErrors('')
        try {
            const userData = await appwriteLogin(data)
            if (userData) {
                dispatch(authLogin(userData))
                navigate('/')
            }
        } catch (error) {
            setErrors(error.message || "Login failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(login)}
            sx={{
                backgroundColor: '#1a0e2a',
                color: '#e0d4ff',
                padding: 4,
                borderRadius: 4,
                maxWidth: '28vw',
                margin: 'auto',
                marginTop: '100px',
                boxShadow: '0 0 30px rgba(138, 43, 226, 0.25)',
                border: '1px solid rgba(255,255,255,0.08)',
            }}
        >
            <Stack spacing={3}>
                <Typography variant="h5" align="center" sx={{ color: '#e0d4ff' }}>
                    Welcome Back
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <TextField
                    autoFocus
                    label="Email"
                    type="email"
                    fullWidth
                    variant="filled"
                    {...register('email', { required: 'Email is required' })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    InputProps={{
                        sx: {
                            backgroundColor: '#2c1a40',
                            color: '#e0d4ff',
                            borderRadius: 2
                        }
                    }}
                    InputLabelProps={{
                        sx: { color: '#b39ddb' }
                    }}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    variant="filled"
                    {...register('password', { required: 'Password is required' })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                        sx: {
                            backgroundColor: '#2c1a40',
                            color: '#e0d4ff',
                            borderRadius: 2
                        }
                    }}
                    InputLabelProps={{
                        sx: { color: '#b39ddb' }
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                        backgroundColor: '#8e24aa',
                        fontWeight: 'bold',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#a450c0'
                        }
                    }}
                >
                    {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Login'}
                </Button>

                <Typography variant="body2" align="center" sx={{ color: '#b39ddb' }}>
                    Don't have an account? <Link to="/signup" style={{ color: '#e0d4ff' }}>Sign up</Link>
                </Typography>
            </Stack>
        </Box>
    )
}

export default Login
