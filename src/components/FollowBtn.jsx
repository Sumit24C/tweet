import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addFollow } from '../store/followSlice';
import { createFollow, unFollow } from '../appwrite/services';

function FollowBtn({ followId, followingId, followingName }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const userData = useSelector((state) => state.auth.userData);
    const followData = useSelector((state) => state.follow.followInfo);
    const [followingIds, setFollowingIds] = useState([]);

    useEffect(() => {
        const ids = followData.map((follow) => follow.followingId);
        setFollowingIds(ids);
    }, [followData]);

    const isFollowing = followingIds.includes(followingId);
    const handleFollowBtn = async () => {

        setLoading(true);
        if (isFollowing) {
            unFollow(followId)
                .then(() => console.log('deleted'))
                .catch((error) => console.error("unFollow error:", error))
                .finally(() => setLoading(false))
        } else {
            try {
                const follow = await createFollow({
                    followerId: userData.$id,
                    followingId: followingId,
                    followerName: userData.name,
                    followingName: followingName,
                });
                dispatch(addFollow(follow));
            } catch (error) {
                console.error("Follow error:", error);
            } finally {
                setLoading(false);
            }
        }
    };


    return (
        <Button
            onClick={handleFollowBtn}
            loading={loading}
            variant={isFollowing ? "contained" : "outlined"}
            color="secondary"
            sx={{
                ml: 'auto',
                borderRadius: '999px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                px: 2.5,
                py: 1,
                backgroundColor: isFollowing ? '#ba68c8' : 'transparent',
                borderColor: '#ba68c8',
                color: isFollowing ? '#fff' : '#ba68c8',
                '&:hover': {
                    backgroundColor: isFollowing ? '#ab47bc' : '#f3e5f5',
                    borderColor: '#ab47bc',
                },
                '&.Mui-disabled': {
                    backgroundColor: '#ffffff',
                    color: '#ba68c8',
                    borderColor: '#ba68c8',
                    opacity: 1, // removes MUI's default greyed-out effect
                    cursor: 'default',
                },
            }}
        >
            {!isFollowing ? 'Follow' : 'unFollow'}
        </Button>
    );
}

export default FollowBtn;
