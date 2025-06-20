import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { FollowCard } from '../components';
import { useLocation } from 'react-router-dom';

function Follow() {
    const followData = useSelector((state) => state.follow.followInfo);         // Following data
    const followersData = useSelector((state) => state.follow.followersInfo);   // Followers data
    const location = useLocation();

    const isFollowersPage = location.pathname.endsWith('/followers');
    const dataToRender = isFollowersPage ? followersData : followData;

    return (
        <Box sx={{ px: 2 }}>
            {dataToRender.length === 0 ? (
                <Typography color="gray" mt={4} textAlign="center">
                    {isFollowersPage ? 'No followers yet.' : 'Not following anyone yet.'}
                </Typography>
            ) : (
                dataToRender.map((follow) => (
                    <FollowCard
                        key={follow.$id}
                        follow={follow}
                        isFollowersPage={isFollowersPage}
                    />
                ))
            )}
        </Box>
    );
}

export default Follow;
