import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addFollow, removeFollow } from '../store/followSlice';
import { createFollow, unFollow } from '../appwrite/services';

function FollowBtn({ followId, followingId, followingName }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const userData = useSelector((state) => state.auth.userData);
    const followData = useSelector((state) => state.follow.followInfo);

    const isFollowing = followData.some(follow =>
        follow.followerId === userData.$id && follow.followingId === followingId
    );
    const handleFollowBtn = async () => {

        setLoading(true);
        try {
            if (isFollowing && followId) {
                await unFollow(followId);
                dispatch(removeFollow(followId));
                console.log('Unfollowed successfully');
            } else {
                const follow = await createFollow({
                    followerId: userData.$id,
                    followingId: followingId,
                    followerName: userData.name,
                    followingName: followingName,
                });
                dispatch(addFollow(follow));
                console.log('Followed successfully');
            }
        } catch (error) {
            console.error("Follow/Unfollow error:", error);
        } finally {
            setLoading(false);
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
