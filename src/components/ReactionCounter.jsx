import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { createReaction, deleteReaction, getAllReaction } from '../appwrite/services';
import {
    Typography,
    IconButton,
    Box,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useDispatch, useSelector } from 'react-redux';
import { addReaction, removeReaction, addGlobalReaction, removeGlobalReaction, setGlobalReaction } from '../store/tweetSlice';
import { Query } from 'appwrite';

function ReactionCounter({ tweetId, initialCount = 0 }) {
    const userData = useSelector((state) => state.auth.userData)
    const reactionData = useSelector((state) => state.tweet.reactionCount);
    const globalReactionData = useSelector((state) => state.tweet.globalReaction);
    const [loading, setLoading] = useState(false)
    const [hasLoadedReactions, setHasLoadedReaction] = useState(false)
    const dispatch = useDispatch()

    // Find the current user's reaction (returns object if exists, undefined if not)
    const currentUserReaction = useMemo(() =>
        globalReactionData.find(reaction =>
            reaction.userId === userData?.$id && reaction.tweetId === tweetId
        ), [globalReactionData, userData?.$id, tweetId]);

    // Derive isLiked from currentUserReaction
    const isLiked = Boolean(currentUserReaction);

    const count = useMemo(() =>
        globalReactionData.filter(reaction => reaction.tweetId === tweetId).length,
        [globalReactionData, tweetId]
    );

    // Load reactions only once per tweetId
    useEffect(() => {
        if (!hasLoadedReactions && userData?.$id) {
            setLoading(true)
            getAllReaction([Query.equal('tweetId', tweetId)])
                .then((reaction) => {
                    if (reaction?.documents) {
                        dispatch(setGlobalReaction(reaction.documents))
                        setHasLoadedReaction(true)
                    }
                })
                .catch((err) => console.error("getGlobalReaction :: error", err))
                .finally(() => setLoading(false))
        }
    }, [hasLoadedReactions, tweetId, dispatch, userData?.$id])

    // Memoize the click handler to prevent recreation on every render
    const handleClick = useCallback(async () => {
        if (!userData?.$id || loading) return;

        setLoading(true)
        try {
            if (isLiked && currentUserReaction) {
                await deleteReaction(currentUserReaction.$id);
                dispatch(removeReaction(currentUserReaction.$id));
                dispatch(removeGlobalReaction(currentUserReaction.$id));
                console.log('Unliked successfully');
            } else {
                const reaction = await createReaction({
                    userId: userData.$id,
                    tweetId: tweetId,
                });
                dispatch(addReaction(reaction));
                dispatch(addGlobalReaction(reaction));
                console.log('Liked successfully');
            }
        } catch (error) {
            console.error("Like/Unlike error:", error);
        } finally {
            setLoading(false);
        }
    }, [userData?.$id, loading, isLiked, currentUserReaction, tweetId, dispatch]);

    // Show initial count if reactions haven't loaded yet
    const displayCount = hasLoadedReactions ? count : initialCount;

    // Don't render if user data isn't available
    if (!userData?.$id) {
        return null;
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
                size="small"
                onClick={handleClick}
                disabled={loading}
                aria-label={isLiked ? "Unlike" : "Like"}
                sx={{
                    color: isLiked ? '#ba68c8' : '#888',
                    '&:hover': {
                        color: '#ba68c8',
                    },
                    '&.Mui-disabled': {
                        color: isLiked ? '#ba68c8' : '#888',
                        opacity: 0.7,
                    },
                }}
            >
                <ThumbUpIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <Typography
                variant="caption"
                sx={{
                    fontSize: 13,
                    color: '#888',
                    fontWeight: 400,
                    ml: 0.5,
                }}
            >
                {displayCount}
            </Typography>
        </Box>
    )
}

export default ReactionCounter