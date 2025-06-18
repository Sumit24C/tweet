import React, { useEffect, useState } from 'react'
import { getFileView, updateTweet } from '../appwrite/services';
import {
    Typography,
    IconButton,
    Box,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function ReactionCounter({ tweetId, initialCount }) {
    const [count, setCount] = useState(initialCount)
    const [isLiked, setIsLiked] = useState(true)

    async function handleClick() {
        setIsLiked(prev => !prev)
        if (isLiked) {
            const newCount = count + 1;
            setCount(newCount)
            try {
                await updateTweet(tweetId, {
                    data: {
                        reactionCount: newCount
                    }
                })
            } catch (error) {
                console.log('ReactionCount :: error', error)
            }
        } else {
            const newCount = count - 1;
            setCount(newCount)
            try {
                await updateTweet(tweetId, {
                    data: {
                        reactionCount: initialCount
                    }
                })
            } catch (error) {
                console.log('ReactionCount :: error', error)
            }
        }
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
                size="small"
                onClick={handleClick}
                sx={{
                    color: '#888',
                    '&:hover': {
                        color: '#ba68c8',
                    },
                }}
            >
                <ThumbUpIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <Typography
                variant="caption"
                sx={{
                    fontSize: 13,
                    color: '#888',
                    fontWeight: 400,
                }}
            >
                {count}
            </Typography>
        </Box>
    )
}
export default ReactionCounter