import React, { useState } from 'react'
import { login as authLogin } from '../store/authSlice'
import { login as appwriteLogin } from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { TextField, Box, Stack, Button } from '@mui/material';
function Login() {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [error, setErrors] = useState('')

    const login = async (data) => {
        try {
            setErrors('')
            const userData = await appwriteLogin(data)
            console.log(userData)
            if (userData) {
                dispatch(authLogin(userData))
                navigate('/home')
            }
        } catch (error) {
            setErrors(error)
        }
    }

    return (
        <Box
            component={'form'}
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(login)}
        >
            <Link to={'/signup'}>Signup</Link>
            <Stack direction={'column'} spacing={2}>
                <TextField
                    id="email"
                    label="email"
                    variant="outlined"
                    type='email'
                    {...register('email', { required: 'Email is required' })}
                // error={errors.email.message}
                />
                <TextField
                    id="password"
                    label="password"
                    variant="outlined"
                    type='password'
                    {...register('password', { required: 'Password is required' })}
                // error={errors.password.message}
                />

                <Button type='submit' loading={!loading} variant="outlined" loadingPosition="center">
                    Login
                </Button>
            </Stack>
        </Box>
    )
}

export default Login
