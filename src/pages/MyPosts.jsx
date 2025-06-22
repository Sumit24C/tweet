import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { TweetCard } from '../components/index';
import { useParams } from 'react-router-dom';
import { getAllTweets } from '../appwrite/services';
import { Query } from 'appwrite';
import { setUserTweet } from '../store/tweetSlice'; // Add this missing import

function MyPosts() {
    const [loading, setLoading] = useState(false);
    const storeTweets = useSelector((state) => state.tweet.tweets);
    const userTweetData = useSelector((state) => state.tweet.userTweet);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        getAllTweets([Query.equal('username', id)])
            .then((res) => {
                dispatch(setUserTweet(res.documents));
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching user tweets:', error);
                setLoading(false);
            });
    }, [id, dispatch]);

    const tweetsToRender = id ? userTweetData : storeTweets;
    const shouldShowLoading = id ? loading : !storeTweets;

    if (shouldShowLoading) {
        return (
            <div style={{ width: '100%', maxWidth: 600, textAlign: 'center', padding: '20px' }}>
                <CircularProgress size={24} sx={{ color: 'white' }} />
            </div>
        );
    }

    if (!tweetsToRender || tweetsToRender.length === 0) {
        return (
            <div style={{ width: '100%', maxWidth: 600, textAlign: 'center', padding: '20px' }}>
                <Typography color="gray">No tweets found.</Typography>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', maxWidth: 600 }}>
            {tweetsToRender.map((tweet) => (
                <TweetCard key={tweet.$id} tweet={tweet} userId={tweet.userId} />
            ))}
        </div>
    );
}

export default MyPosts;