
import {
    Box,
    Avatar,
    Typography,
    Button,
    Stack,
    Divider,
    Paper,
} from '@mui/material';
import { FollowBtn } from './index'
import { useEffect, useState } from 'react';

function FollowCard({ follow, isFollowersPage }) {
    const [user, setUser] = useState({})

    useEffect(() => {
        if (isFollowersPage) {
            setUser({
                displayName: follow.followerName,
                followingId: follow.followerId,
                followingName: follow.followerName,
            })
        } else {
            setUser({
                displayName: follow.followingName,
                followingId: follow.followingId,
                followingName: follow.followingName,
            })
        }
    }, [follow, isFollowersPage, location.pathname])

    useEffect(() => {

        console.log(user)
    }, [user])

    return (
        <Box sx={{ px: 2 }}>
            <Paper
                key={follow.$id}
                elevation={3}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 1.5,
                    px: 2,
                    mb: 2,
                    backgroundColor: '#1e1e1e',
                    borderRadius: 2,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    },
                }}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: '#6a1b9a', width: 44, height: 44 }}>
                        {user.displayName?.[0]?.toUpperCase() || 'U'}
                    </Avatar>

                    <Box>
                        <Typography
                            variant="subtitle1"
                            sx={{ color: 'white', fontWeight: 'bold' }}
                        >
                            {user.displayName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'gray' }}>
                            @{user.displayName?.toLowerCase().replace(/\s/g, '')}
                        </Typography>
                    </Box>
                </Stack>
                <FollowBtn
                    key={follow.$id}
                    followId={follow.$id}
                    followingId={user.followingId}
                    followingName={user.followingName}
                />
            </Paper>
        </Box>
    )
}

export default FollowCard
