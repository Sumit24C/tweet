import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { createTweet, uploadFile } from '../appwrite/services'
import {
    Box,
    Button,
    Container,
    IconButton,
    Stack,
    TextField,
    Typography,
    CircularProgress,
} from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'

function AddTweet({ tweet, closeModal }) {
    const userData = useSelector((state) => state.auth.userData)
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, reset } = useForm()
    const navigate = useNavigate()

    const create = async (data) => {
        setLoading(true)
        try {
            if (!tweet) {
                const file = data.image?.[0] ? await uploadFile(data.image[0]) : null
                const fileId = file?.$id
                const tweetData = {
                    ...data,
                    tweetImage: fileId,
                    userId: userData.$id
                }
                const postTweet = await createTweet(tweetData)
                reset()
                console.log(postTweet)
                closeModal?.()
            }
        } catch (error) {
            console.log('AppWriteError :: AddTweet :: error', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container maxWidth="sm" sx={{ backgroundColor: 'transparent' }}>
            <Box
                component="form"
                onSubmit={handleSubmit(create)}
                sx={{
                    backgroundColor: '#1a0e2a',
                    borderRadius: 4,
                    p: 4,
                    boxShadow: '0 0 20px rgba(138, 43, 226, 0.3)',
                    border: '1px solid rgba(255,255,255,0.08)',
                }}
            >
                <Stack spacing={3}>
                    <Typography variant="h6" sx={{ color: '#e0d4ff', textAlign: 'center' }}>
                        {tweet ? 'Edit Tweet' : 'Create a Tweet'}
                    </Typography>

                    <TextField
                        placeholder="What's on your mind?"
                        multiline
                        minRows={4}
                        fullWidth
                        variant="filled"
                        InputProps={{
                            sx: {
                                color: '#e0d4ff',
                                borderRadius: 2,
                                backgroundColor: '#2c1a40',
                            },
                        }}
                        InputLabelProps={{ sx: { color: '#9e9e9e' } }}
                        sx={{
                            '& .MuiFilledInput-root': {
                                backgroundColor: '#2c1a40',
                            },
                        }}
                        {...register('content', { required: true })}
                    />

                    <Box textAlign="center">
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            {...register('image')}
                        />
                        <label htmlFor="image">
                            <IconButton
                                component="span"
                                sx={{
                                    color: '#e0d4ff',
                                    transition: '0.3s',
                                }}
                            >
                                <ImageIcon fontSize="large" />
                            </IconButton>
                        </label>
                    </Box>

                    <Button
                        sx={{
                            backgroundColor: '#8e24aa',
                            color: '#fff',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        type="submit"
                        variant="contained"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : tweet ? 'Edit' : 'Post'}
                    </Button>
                </Stack>
            </Box>
        </Container>

    )
}

export default AddTweet
