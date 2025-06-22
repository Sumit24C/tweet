import {
    Box,
    Avatar,
    Typography,
    Button,
    Stack,
    Divider,
    Paper,
} from '@mui/material';
import { FollowBtn } from './index';
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function FollowCard({ id, follow, isFollowersPage }) {
    const userData = useSelector((state) => state.auth.userData);

    // Memoize user data calculation to avoid unnecessary re-renders
    const user = useMemo(() => {
        if (!userData || !follow) return {};

        if (isFollowersPage) {
            return {
                displayName: follow.followerName,
                followingId: follow.followerId,
                followingName: follow.followerName,
            };
        } else {
            return {
                displayName: follow.followingName,
                followingId: follow.followingId,
                followingName: follow.followingName,
            };
        }
    }, [follow, isFollowersPage, userData]);

    // Early return if required data is missing
    if (!userData || !follow || !user.displayName) {
        return null;
    }

    // Check if this is the current user's own profile
    const isOwnProfile = userData.name === user.displayName;

    // Determine if we should show the follow button
    const shouldShowFollowBtn = !id && !isOwnProfile;

    return (
        <Box sx={{ px: 2 }}>
            <Paper
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
                        transform: 'translateY(-1px)',
                    },
                }}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                        sx={{
                            bgcolor: '#6a1b9a',
                            width: 44,
                            height: 44,
                            fontSize: '1.2rem',
                            fontWeight: 'bold'
                        }}
                    >
                        {user.displayName?.[0]?.toUpperCase() || 'U'}
                    </Avatar>

                    <Box>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                '& a': {
                                    color: 'white',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        color: '#6a1b9a',
                                    },
                                },
                            }}
                        >
                            {userData.name !== id && !isOwnProfile ? (
                                <Link to={`/profile/${user.displayName}`}>
                                    @{user.displayName}
                                </Link>
                            ) : (
                                `@${user.displayName}`
                            )}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: '0.8rem'
                            }}
                        >
                            @{user.displayName?.toLowerCase().replace(/\s+/g, '') || 'username'}
                        </Typography>
                    </Box>
                </Stack>

                {shouldShowFollowBtn && (
                    <FollowBtn
                        key={follow.$id}
                        followId={follow.$id}
                        followingId={user.followingId}
                        followingName={user.followingName}
                    />
                )}
            </Paper>
        </Box>
    );
}

export default FollowCard;