import React, { useState, useEffect, useMemo } from 'react';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getAllFollowers, getAllFollowing } from '../appwrite/services';
import { Query } from 'appwrite';
import NavTabs from '../components/NavTabs';
import {
    setFollower as storeSetFollower,
    setUserFollower,
    setUserFollowing
} from '../store/followSlice';
import { useParams } from 'react-router-dom';

function Profile() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    // Redux state with default values to prevent errors
    const userData = useSelector((state) => state.auth.userData);
    const followData = useSelector((state) => state.follow.followInfo || []);
    const storeFollower = useSelector((state) => state.follow.followersInfo || []);
    const userFollowersData = useSelector((state) => state.follow.userFollowersInfo || []);
    const userFollowingData = useSelector((state) => state.follow.userFollowingsInfo || []);
    const userTweet = useSelector((state) => state.tweet.userTweet || []);

    // Check if viewing own profile
    const isOwnProfile = !id;

    // Load current user's followers (only when viewing own profile)
    useEffect(() => {
        if (!userData?.$id || !isOwnProfile || storeFollower.length > 0) return;

        setLoading(true);
        getAllFollowers([Query.equal('followingId', userData.$id)])
            .then((res) => {
                dispatch(storeSetFollower(res.documents || []));
            })
            .catch((err) => {
                console.error('Failed to load followers:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [userData?.$id, dispatch, storeFollower.length, isOwnProfile]);

    // Load specific user's followers (when viewing someone else's profile)
    useEffect(() => {
        if (isOwnProfile || !id) return;

        setLoading(true);
        getAllFollowers([Query.equal('followingName', id)])
            .then((res) => {
                dispatch(setUserFollower(res.documents || []));
            })
            .catch((err) => {
                console.error('Failed to load user followers:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, dispatch, isOwnProfile]);

    // Load specific user's following (when viewing someone else's profile)
    useEffect(() => {
        if (isOwnProfile || !id) return;

        setLoading(true);
        getAllFollowing([Query.equal('followerName', id)])
            .then((res) => {
                dispatch(setUserFollowing(res.documents || []));
            })
            .catch((err) => {
                console.error('Failed to load user following:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, dispatch, isOwnProfile]);

    // Memoized display values for better performance
    const displayData = useMemo(() => {
        const createdAt = isOwnProfile
            ? userData?.$createdAt
            : (userTweet[0]?.$createdAt || new Date().toISOString());

        const name = isOwnProfile ? userData?.name : id;
        const avatar = name?.charAt(0)?.toUpperCase() || 'U';
        const username = name?.toLowerCase().replace(/\s+/g, '') || 'username';
        const followingCount = isOwnProfile ? followData.length : userFollowingData.length;
        const followersCount = isOwnProfile ? storeFollower.length : userFollowersData.length;

        const joinDate = new Date(createdAt).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
        });

        return {
            name,
            avatar,
            username,
            followingCount,
            followersCount,
            joinDate,
        };
    }, [
        isOwnProfile,
        userData,
        userTweet,
        id,
        followData.length,
        storeFollower.length,
        userFollowingData.length,
        userFollowersData.length,
    ]);

    // Show loading state for initial data load
    if (!userData && isOwnProfile) {
        return (
            <Container maxWidth={false} disableGutters sx={{ bgcolor: '#121212', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress sx={{ color: '#00b0ff' }} />
            </Container>
        );
    }

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                bgcolor: '#121212',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                px: 2,
            }}
        >
            <Box sx={{ width: '100%', maxWidth: 600 }}>
                {/* Banner */}
                <Box sx={{ height: '6vh', backgroundColor: '#2c2c2c', width: '100%' }} />

                {/* Avatar, Info */}
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
                        {displayData.avatar}
                    </Avatar>

                    <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                        <Typography variant="h6" fontWeight="bold" color="white">
                            {displayData.name}
                        </Typography>
                        {isOwnProfile && (
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
                                    '&:hover': {
                                        bgcolor: 'rgba(0, 176, 255, 0.1)',
                                        borderColor: '#00b0ff',
                                    },
                                }}
                            >
                                Get verified
                            </Button>
                        )}
                    </Stack>

                    <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.7)">
                        @{displayData.username}
                    </Typography>

                    <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" mt={1}>
                        Joined {displayData.joinDate}
                    </Typography>

                    <Stack direction="row" spacing={2} mt={1} alignItems="center">
                        {loading ? (
                            <CircularProgress size={16} sx={{ color: '#00b0ff' }} />
                        ) : (
                            <>
                                <Typography
                                    variant="body2"
                                    color="white"
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': { textDecoration: 'underline' }
                                    }}
                                >
                                    <strong>{displayData.followingCount}</strong>{' '}
                                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Following</span>
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="white"
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': { textDecoration: 'underline' }
                                    }}
                                >
                                    <strong>{displayData.followersCount}</strong>{' '}
                                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Followers</span>
                                </Typography>
                            </>
                        )}
                    </Stack>
                </Box>

                <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.1)' }} />

                {/* Nav Tabs */}
                <NavTabs id={id} />
            </Box>
        </Container>
    );
}

export default Profile;