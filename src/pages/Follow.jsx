import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, CircularProgress } from '@mui/material';
import { FollowCard } from '../components/index';
import { useLocation, useParams } from 'react-router-dom';
import { getAllFollowers, getAllFollowing } from '../appwrite/services';
import { Query } from 'appwrite';
import { setUserFollower, setUserFollowing } from '../store/followSlice';

function Follow() {
    const [loading, setLoading] = useState(false);

    // Redux state with default values to prevent errors
    const followData = useSelector((state) => state.follow.followInfo || []);
    const followersData = useSelector((state) => state.follow.followersInfo || []);
    const userFollowersData = useSelector((state) => state.follow.userFollowersInfo || []);
    const userFollowingData = useSelector((state) => state.follow.userFollowingsInfo || []);
    const dispatch = useDispatch();

    const location = useLocation();
    const { id } = useParams();

    // Memoized values to prevent unnecessary re-calculations
    const isFollowersPage = useMemo(() =>
        location.pathname.endsWith('/followers'),
        [location.pathname]
    );

    const dataToRender = useMemo(() => {
        if (id) {
            return isFollowersPage ? userFollowersData : userFollowingData;
        }
        return isFollowersPage ? followersData : followData;
    }, [id, isFollowersPage, userFollowersData, userFollowingData, followersData, followData]);

    // Fetch user's following data
    useEffect(() => {
        if (!id) return;

        setLoading(true);
        getAllFollowing([Query.equal('followerName', id)])
            .then((res) => {
                dispatch(setUserFollowing(res.documents || []));
            })
            .catch((error) => {
                console.error('Error fetching following:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, dispatch]);

    // Fetch user's followers data - Fixed the bug in original code
    useEffect(() => {
        if (!id) return;

        setLoading(true);
        getAllFollowers([Query.equal('followingName', id)])
            .then((res) => {
                dispatch(setUserFollower(res.documents || []));
            })
            .catch((error) => {
                console.error('Error fetching followers:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [dispatch, id]);

    // Show loading when fetching user-specific data
    if (id && loading && dataToRender.length === 0) {
        return (
            <Box sx={{ px: 2, textAlign: 'center', mt: 4 }}>
                <CircularProgress size={24} sx={{ color: 'white' }} />
            </Box>
        );
    }

    return (
        <Box sx={{ px: 2 }}>
            {dataToRender.length === 0 ? (
                <Typography color="gray" mt={4} textAlign="center">
                    {isFollowersPage ? 'No followers yet.' : 'Not following anyone yet.'}
                </Typography>
            ) : (
                dataToRender.map((follow) => (
                    <FollowCard
                        id={id}
                        key={follow.$id || `${follow.followerId}-${follow.followingId}`}
                        follow={follow}
                        isFollowersPage={isFollowersPage}
                    />
                ))
            )}
        </Box>
    );
}

export default Follow;