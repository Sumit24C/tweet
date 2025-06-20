import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    Avatar,
    Typography,
    Button,
    Stack,
    Divider,
    Paper,
} from '@mui/material';
import { useLocation } from 'react-router-dom';

function FollowCard() {
    const followData = useSelector((state) => state.follow.followInfo) //followings data
    const followersData = useSelector((state) => state.follow.followerInfo); // list of followers
    const [followerName, setFollowerName] = useState([]);
    const location = useLocation()

    useEffect(() => {
        const name = followersData.map((follower) => follower.followerName)
        setFollowerName(name)
        console.log("follower's list", followersData)
        console.log("following list", followData)
    }, [followersData, followData])


    useEffect(() => {
        console.log("followers name", followerName)
        console.log('location: ', location.pathname)
    }, [followerName, location])

    return (
        <Box sx={{ px: 2 }}>
            {followersData.map((follow) => (
                <Paper
                    key={follow.$id}
                    elevation={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: 1.5,
                        px: 2,
                        backgroundColor: '#121212',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                    }}
                >
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: '#6a1b9a', width: 40, height: 40 }}>
                            {follow.followerName?.[0]?.toUpperCase() || 'U'}
                        </Avatar>

                        <Box>
                            <Typography
                                variant="subtitle1"
                                sx={{ color: 'white', fontWeight: 'bold' }}
                            >
                                {follow.followerName}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'gray' }}>
                                @{follow.followerName?.toLowerCase().replace(/\s/g, '')}
                            </Typography>
                        </Box>
                    </Stack>

                    <Button
                        variant="outlined"
                        size="small"
                        sx={{
                            textTransform: 'none',
                            borderRadius: 5,
                            fontWeight: 600,
                            borderColor: '#888',
                            color: '#fff',
                            '&:hover': {
                                borderColor: '#ba68c8',
                                backgroundColor: 'rgba(186,104,200,0.1)',
                            },
                        }}
                    >
                        Follow
                    </Button>
                </Paper>
            ))}
        </Box>
    );
}

export default FollowCard;
