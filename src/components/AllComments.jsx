import React, { useEffect, useRef, useState } from 'react';
import { getAllComments } from '../appwrite/services';
import {
    Box,
    Typography,
    Avatar,
    Stack,
    CircularProgress,
} from '@mui/material';
import DeleteCommentBtn from './DeleteCommentBtn';
import CommentCard from './CommentCard';
import { useSelector } from 'react-redux';

function AllComments({ tweetId }) {
    const userData = useSelector((state) => state.auth.userData)
    const currentUserId = userData.$id
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const storeComment = useSelector((state) => state.comment.comments)

    useEffect(() => {
        setLoading(true);
        getAllComments()
            .then((response) => {
                if (response) {
                    const tweetComments = response.documents.filter(
                        (comment) => comment.tweetId === tweetId
                    )
                    setComments(tweetComments);
                }
            })
            .catch((err) => console.log("getAllComments :: error", err))
            .finally(() => setLoading(false));
    }, [tweetId, storeComment]);

    if (comments.length === 0) {
        return (
            <>
                {loading ? <CircularProgress size={20} sx={{ color: '#ba68c8', mt: 2 }} /> : (<Typography variant="body2" sx={{ mt: 2, color: '#aaa' }}>
                    No comments yet.
                </Typography>)}
            </>
        );
    }

    return (
        <Box mt={2}>
            {loading ? <CircularProgress size={20} sx={{ color: '#ba68c8', mt: 2 }} /> : comments.map((comment) => (
                <CommentCard key={comment.$id} comment={comment} />
            ))}
        </Box>
    );
}

export default AllComments;
