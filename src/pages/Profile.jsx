import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    Container,
    Typography,
    Avatar,
    Button,
    Divider,
    Stack,
    Tabs,
    Tab,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CreatePostBtn, AddTweet, TweetCard } from '../components/index'
import { getAllTweets } from '../appwrite/services'


function Profile() {
    const userData = useSelector((state) => state.auth.userData);
    const [tweets, setTweeets] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getAllTweets()
            .then((tweets) => {
                if (tweets) {
                    setTweeets(tweets.documents.filter((tweet) => (userData.$id === tweet.userId)))
                }
            })
            .catch((err) => console.log("getTweet :: error", err))
            .finally(() => setLoading(false))
    }, [tweets])
    console.log("userID: ", userData.$id)
    console.log(tweets)
    return (

        <Container
            maxWidth={false}
            disableGutters
            sx={{
                bgcolor: '#121212',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                overflowY: 'auto',
            }}
        >
            <Box sx={{ width: '100%', maxWidth: 600 }}>
                {/* Banner */}
                <Box
                    sx={{
                        height: 150,
                        backgroundColor: '#2c2c2c',
                        width: '100%',
                    }}
                />

                {/* Avatar, Name, Handle */}
                <Box sx={{ p: 2, mt: -6 }}>
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            bgcolor: '#ec407a',
                            fontSize: 32,
                            border: '4px solid #121212',
                        }}
                    >
                        {userData?.name?.[0]?.toUpperCase() || 'U'}
                    </Avatar>

                    <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                        <Typography variant="h6" fontWeight="bold" color='white'>
                            {userData?.name}
                        </Typography>
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<CheckCircleIcon />}
                            sx={{
                                borderRadius: 8,
                                color: '#00b0ff',
                                borderColor: '#00b0ff',
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: 12,
                                px: 1.5,
                                py: 0.3,
                            }}
                        >
                            Get verified
                        </Button>
                    </Stack>

                    <Typography variant="subtitle2" color="white">
                        @{userData?.name?.toLowerCase().replace(/\s/g, '') || 'username'}
                    </Typography>

                    <Typography variant="body2" color="white" mt={1}>
                        Joined {new Date(userData?.$createdAt).toLocaleString('default', {
                            month: 'long',
                            year: 'numeric',
                        })}
                    </Typography>

                    <Stack direction="row" spacing={2} mt={1}>
                        <Typography variant="body2" color='white'>
                            <strong>1</strong> Following
                        </Typography>
                        <Typography variant="body2" color='white'>
                            <strong>0</strong> Followers
                        </Typography>
                    </Stack>
                </Box>

                <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.1)' }} />

                {/* Tweets */}
                <Container
                    maxWidth={false}
                    disableGutters
                    sx={{
                        bgcolor: '#121212',
                        minHeight: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        overflowY: 'auto',
                        py: 4,
                    }}
                >
                    <div style={{ width: '100%', maxWidth: 600 }}>
                        {tweets.map((tweet) => (
                            <TweetCard key={tweet.$id} tweet={tweet} />
                        ))}
                    </div>
                </Container>

                {/* Setup Steps (Optional Placeholder) */}

            </Box>
        </Container>
    )
}

export default Profile;
