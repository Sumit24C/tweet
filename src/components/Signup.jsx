import React, { useState } from 'react'
import { login as authLogin } from '../store/authSlice'
import { createAccount } from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { data, matchPath, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { TextField, Box, Button, Stack } from '@mui/material';


function Signup() {
    const { register, formState: { errors }, handleSubmit, } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setErrors] = useState('')
    const [loading, setLoading] = useState(true)

    const create = async (data) => {
        try {
            setErrors('')
            setLoading(false)
            const userData = await createAccount(data)
            console.log(userData)
            if (userData) {
                dispatch(authLogin(userData))
                navigate('/home')
            }
        } catch (error) {
            setErrors(error)
        } finally {
            setErrors('')
        }
    }

    return (
        <Box
            component={'form'}
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(create)}
        >
            <Stack direction={'column'} spacing={2}>
                <TextField
                    id="username"
                    label="username"
                    variant="outlined"
                    type='text'
                    {...register('username', { required: 'username is required' })}
                // error={errors.username.message}
                />
                <TextField
                    id="email"
                    label="email"
                    variant="outlined"
                    type='email'
                    error={error}
                    {...register('email', { required: true })}
                />
                <TextField
                    id="password"
                    label="password"
                    variant="outlined"
                    type='password'
                    {...register('password', { required: true })}
                />

                <Button type='submit' loading={!loading} variant="outlined" loadingPosition="start">
                    Signup
                </Button>
            </Stack>
        </Box>)
}

export default Signup