import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
    Avatar,
    Box,
    IconButton,
    InputBase,
    CircularProgress,
    Stack,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import { createComment, createTweet } from '../appwrite/services';
import { addComment } from '../store/commentSlice';

function CommentForm({ tweetId, userId, username, setComment }) {
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const userData = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch()

    const create = async (data) => {
        setLoading(true);
        try {
            const commentData = {
                ...data,
                tweetId,
                userId,
                username,
            };
            const postComment = await createComment(commentData);
            dispatch(addComment(postComment))
            console.log(postComment)
            reset();
        } catch (error) {
            console.error('AddComment error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(create)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                backgroundColor: '#2c1a40',
                borderRadius: '30px',
                padding: '8px 12px',
                mt: 1,
                border: '1px solid rgba(255,255,255,0.08)',
            }}
        >
            {/* User Avatar */}
            <Avatar
                sx={{ width: 32, height: 32, bgcolor: '#6a1b9a' }}
            >
                {userData?.name?.[0]?.toUpperCase() || 'U'}
            </Avatar>

            {/* Input field */}
            <InputBase
                placeholder="Add a comment..."
                fullWidth
                sx={{
                    ml: 1,
                    color: '#e0d4ff',
                    fontSize: 14,
                    flex: 1,
                }}
                {...register('content', { required: true })}
            />

            {/* Emoji and Image icons */}
            <Stack direction="row" spacing={1} alignItems="center">
                <IconButton size="small" sx={{ color: '#aaa' }}>
                    <EmojiEmotionsIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: '#aaa' }}>
                    <ImageIcon fontSize="small" />
                </IconButton>
            </Stack>

            {/* Send button */}
            <IconButton
                type="submit"
                size="small"
                sx={{ color: '#ba68c8' }}
                disabled={loading}
            >
                {loading ? (
                    <CircularProgress size={18} sx={{ color: '#ba68c8' }} />
                ) : (
                    <SendIcon fontSize="small" />
                )}
            </IconButton>
        </Box>
    );
}

export default CommentForm;
