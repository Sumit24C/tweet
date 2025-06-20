import React, { useState, useEffect } from 'react';
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
import { getAllFollowers } from '../appwrite/services';
import { Query } from 'appwrite';
import NavTabs from '../components/NavTabs';
import { setFollower as storeSetFollower } from '../store/followSlice';

function Profile() {
    const userData = useSelector((state) => state.auth.userData);
    const followData = useSelector((state) => state.follow.followInfo);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const storeFollower = useSelector((state) => state.follow.followersInfo)

    useEffect(() => {
        if (!userData?.$id || storeFollower.length !== 0) return

        setLoading(true)
        getAllFollowers([Query.equal('followingId', userData.$id)])
            .then((res) => dispatch(storeSetFollower(res.documents)))
            .finally(() => setLoading(false))
    }, [userData, dispatch, storeFollower])

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
                        {(userData?.name && userData.name.charAt(0).toUpperCase()) || 'U'}
                    </Avatar>

                    <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                        <Typography variant="h6" fontWeight="bold" color="white">
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
                        {loading ? (
                            <CircularProgress size={16} sx={{ color: 'white' }} />
                        ) : (
                            <>
                                <Typography variant="body2" color="white">
                                    <strong>{followData?.length || 0}</strong> Following
                                </Typography>
                                <Typography variant="body2" color="white">
                                    <strong>{storeFollower?.length || 0}</strong> Followers
                                </Typography>
                            </>
                        )}
                    </Stack>
                </Box>

                <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.1)' }} />

                {/* Nav Tabs - Now properly positioned for sticky behavior */}
                <NavTabs />
            </Box>
        </Container>
    );
}

export default Profile;