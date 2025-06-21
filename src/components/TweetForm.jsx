import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
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
import CloseIcon from '@mui/icons-material/Close'
import { createTweet, uploadFile } from '../appwrite/services'
import { addTweet } from '../store/tweetSlice'

function TweetForm({ tweet, closeModal, handleNewTweet }) {
    const userData = useSelector((state) => state.auth.userData)
    const [loading, setLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [newTweet, setNewTweet] = useState({})
    const { register, handleSubmit, reset, setValue, watch } = useForm()
    const dispatch = useDispatch()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedImage(file)
            setImagePreview(URL.createObjectURL(file))
            setValue('image', [file]) // Update form state for consistency
        }
    }

    const removeImage = () => {
        setSelectedImage(null)
        setImagePreview(null)
        setValue('image', []) // Clear file from form
    }

    const create = async (data) => {
        setLoading(true)
        try {
            if (!tweet) {
                const file = selectedImage ? await uploadFile(selectedImage) : null
                const tweetData = {
                    ...data,
                    tweetImage: file?.$id || null,
                    userId: userData.$id,
                    username: userData.name,
                };
                const postTweet = await createTweet(tweetData)
                dispatch(addTweet(postTweet))
                handleNewTweet(postTweet)
                reset()
                setSelectedImage(null)
                setImagePreview(null)
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
                        autoFocus
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

                    {imagePreview && (
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                textAlign: 'center',
                                borderRadius: 2,
                                overflow: 'hidden',
                                backgroundColor: '#2c1a40',
                                p: 1
                            }}
                        >
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{
                                    maxWidth: '100%',
                                    borderRadius: 8,
                                    marginBottom: '8px'
                                }}
                            />
                            <IconButton
                                onClick={removeImage}
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    backgroundColor: '#00000088',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#000000cc'
                                    }
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    )}
                    <Box textAlign="center">
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <label htmlFor="image">
                            <IconButton
                                component="span"
                                sx={{ color: '#e0d4ff', transition: '0.3s' }}
                            >
                                <ImageIcon fontSize="large" />
                            </IconButton>
                        </label>
                    </Box>

                    {/* Preview & Remove Button */}

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

export default TweetForm
