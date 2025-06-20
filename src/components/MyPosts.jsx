import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    Box,
    Container,
    Typography,
    Avatar,
    Button,
    Divider,
    CircularProgress,
    Stack,
} from '@mui/material';
import { TweetCard } from './index'

function MyPosts() {

    const storeTweets = useSelector((state) => state.tweet.tweets)

    useEffect(() => {
        console.log(storeTweets)
    }, [storeTweets])

    return (
        <div style={{ width: '100%', maxWidth: 600 }}>
            {!storeTweets ? <CircularProgress size={16} sx={{ color: 'white' }} />
                : storeTweets.map((tweet) => (
                    <TweetCard key={tweet.$id} tweet={tweet} />
                ))}
        </div>
    )
}

export default MyPosts
