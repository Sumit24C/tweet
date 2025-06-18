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

function AllComments({ tweetId, currentUserId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const ref = useRef()
    useEffect(() => {
        setLoading(true);
        getAllComments()
            .then((response) => {
                if (response) {
                    // Filter only comments belonging to this tweet
                    const tweetComments = response.documents.filter(
                        (comment) => comment.tweetId === tweetId
                    );
                    setComments(tweetComments);
                }
            })
            .catch((err) => console.log("getAllComments :: error", err))
            .finally(() => setLoading(false));
    }, [tweetId]);

    if (loading) {
        return <CircularProgress size={20} sx={{ color: '#ba68c8', mt: 2 }} />;
    }

    if (!comments.length) {
        return (
            <Typography variant="body2" sx={{ mt: 2, color: '#aaa' }}>
                No comments yet.
            </Typography>
        );
    }

    return (
        <Box mt={2}>
            {comments.map((comment) => (
                <Box
                    key={comment.$id}
                    sx={{
                        backgroundColor: '#2c1a40',
                        borderRadius: 2,
                        p: 2,
                        mb: 1,
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}
                >
                    <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                        <Avatar sx={{ bgcolor: '#6a1b9a', width: 28, height: 28 }}>
                            {comment.username?.[0]?.toUpperCase() || 'U'}
                        </Avatar>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            @{comment.username}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{ color: '#888', marginLeft: 'auto' }}
                        >
                            {new Date(comment.$createdAt).toLocaleString()}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{ color: '#888', marginLeft: 'auto' }}
                        >
                            {comment.userId === currentUserId && <DeleteCommentBtn ref={ref} commentId={comment.$id} setComments={setComments} />}
                        </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: '#e0d4ff' }}>
                        {comment.content}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}

export default AllComments;
