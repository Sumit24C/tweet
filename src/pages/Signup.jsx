import React, { useState } from 'react'
import { login as authLogin } from '../store/authSlice'
import { createAccount } from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
    TextField,
    Box,
    Button,
    Stack,
    Typography,
    Alert,
    CircularProgress
} from '@mui/material'

function Signup() {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setErrors] = useState('')
    const [loading, setLoading] = useState(false)

    const create = async (data) => {
        setLoading(true)
        setErrors('')
        try {
            const userData = await createAccount(data)
            if (userData) {
                dispatch(authLogin(userData))
                navigate('/')
            }
        } catch (error) {
            setErrors(error.message || 'Signup failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(create)}
            sx={{
                backgroundColor: '#1a0e2a',
                color: '#e0d4ff',
                padding: 4,
                borderRadius: 4,
                maxWidth: '400px',
                margin: 'auto',
                marginTop: '100px',
                boxShadow: '0 0 30px rgba(138, 43, 226, 0.25)',
                border: '1px solid rgba(255,255,255,0.08)',
            }}
        >
            <Stack spacing={3}>
                <Typography variant="h5" align="center" sx={{ color: '#e0d4ff' }}>
                    Create an Account
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <TextField
                    autoFocus
                    label="Username"
                    fullWidth
                    variant="filled"
                    {...register('username', {
                        required: 'Username is required',
                        validate: (value) =>
                            /^[a-zA-Z0-9]+$/.test(value) || 'Don\'t use space or special characters',
                    })}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    InputProps={{
                        sx: {
                            backgroundColor: '#2c1a40',
                            color: '#e0d4ff',
                            borderRadius: 2,
                        }
                    }}
                    InputLabelProps={{
                        sx: { color: '#b39ddb' }
                    }}
                />

                <TextField
                    label="Email"
                    fullWidth
                    type="email"
                    variant="filled"
                    {...register('email', { required: 'Email is required' })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    InputProps={{
                        sx: {
                            backgroundColor: '#2c1a40',
                            color: '#e0d4ff',
                            borderRadius: 2,
                        }
                    }}
                    InputLabelProps={{
                        sx: { color: '#b39ddb' }
                    }}
                />

                <TextField
                    label="Password"
                    fullWidth
                    type="password"
                    variant="filled"
                    {...register('password', { required: 'Password is required' })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                        sx: {
                            backgroundColor: '#2c1a40',
                            color: '#e0d4ff',
                            borderRadius: 2,
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
                    {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Signup'}
                </Button>

                <Typography variant="body2" align="center" sx={{ color: '#b39ddb' }}>
                    Already have an account? <Link to="/login" style={{ color: '#e0d4ff' }}>Login</Link>
                </Typography>
            </Stack>
        </Box>
    )
}

export default Signup
