import React, { useCallback, useMemo } from 'react'
import { createReaction, deleteReaction } from '../appwrite/services';
import {
    Typography,
    IconButton,
    Box,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useDispatch, useSelector } from 'react-redux';
import { addGlobalReaction, removeGlobalReaction } from '../store/tweetSlice';

function ReactionCounter({ tweetId, initialCount = 0 }) {
    const userData = useSelector((state) => state.auth.userData)
    const globalReactionData = useSelector((state) => state.tweet.globalReaction);
    const dispatch = useDispatch()

    // Find the current user's reaction (returns object if exists, undefined if not)
    const currentUserReaction = useMemo(() =>
        globalReactionData.find(reaction =>
            reaction.userId === userData?.$id && reaction.tweetId === tweetId
        ), [globalReactionData, userData?.$id, tweetId]);

    // Derive isLiked from currentUserReaction
    const isLiked = Boolean(currentUserReaction);

    // Count all reactions for this tweet
    const count = useMemo(() =>
        globalReactionData.filter(reaction => reaction.tweetId === tweetId).length,
        [globalReactionData, tweetId]
    );

    // Memoize the click handler to prevent recreation on every render
    const handleClick = useCallback(async () => {
        if (!userData?.$id) return;

        try {
            if (isLiked && currentUserReaction) {
                // Optimistically remove from UI first
                dispatch(removeGlobalReaction(currentUserReaction.$id));

                // Then delete from backend
                await deleteReaction(currentUserReaction.$id);
                console.log('Unliked successfully');
            } else {
                // Create reaction in backend first
                const reaction = await createReaction({
                    userId: userData.$id,
                    tweetId: tweetId,
                });

                // Then add to UI
                dispatch(addGlobalReaction(reaction));
                console.log('Liked successfully');
            }
        } catch (error) {
            console.error("Like/Unlike error:", error);

            // Revert optimistic update on error
            if (isLiked && currentUserReaction) {
                dispatch(addGlobalReaction(currentUserReaction));
            } else {
                // If we added optimistically but backend failed, we need to remove it
                // This would require storing the temporary reaction, but for now just log the error
                console.error("Failed to create reaction, UI may be out of sync");
            }
        }
    }, [userData?.$id, isLiked, currentUserReaction, tweetId, dispatch]);

    // Don't render if user data isn't available
    if (!userData?.$id) {
        return null;
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
                size="small"
                onClick={handleClick}
                aria-label={isLiked ? "Unlike" : "Like"}
                sx={{
                    color: isLiked ? '#ba68c8' : '#888',
                    '&:hover': {
                        color: '#ba68c8',
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
                {count}
            </Typography>
        </Box>
    )
}

export default ReactionCounter