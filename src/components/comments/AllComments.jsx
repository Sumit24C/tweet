import React, { useEffect, useState } from 'react';
import { getAllComments } from '../../appwrite/services';
import {
    Box,
    Typography,
    Stack,
    Fade,
} from '@mui/material';
import { CommentCard } from './index';
import { LoadingPage } from '../index'
import { useSelector } from 'react-redux';

function AllComments({ tweetId, setCommentCount }) {
    const userData = useSelector((state) => state.auth.userData);
    const currentUserId = userData.$id;
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const storeComment = useSelector((state) => state.comment.comments);

    useEffect(() => {
        setLoading(true);
        getAllComments()
            .then((response) => {
                if (response) {
                    const tweetComments = response.documents.filter(
                        (comment) => comment.tweetId === tweetId
                    );
                    setComments(tweetComments);
                    if (setCommentCount) {
                        setCommentCount(tweetComments.length);
                    }
                }
            })
            .catch((err) => console.log("getAllComments :: error", err))
            .finally(() => setLoading(false));
    }, [tweetId, storeComment]);

    // Loading state - use comment variant for comments
    if (loading) {
        return <LoadingPage variant="comment" count={2} />;
    }

    // Empty state
    if (comments.length === 0) {
        return (
            <Fade in timeout={300}>
                <Box
                    sx={{
                        mt: 2,
                        py: 3,
                        textAlign: 'center',
                        borderRadius: 2,
                        backgroundColor: 'rgba(255,255,255,0.02)',
                        border: '1px dashed rgba(255,255,255,0.1)'
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: '0.9rem',
                            fontStyle: 'italic'
                        }}
                    >
                        No comments yet
                    </Typography>
                </Box>
            </Fade>
        );
    }

    // Comments list
    return (
        <Fade in timeout={300}>
            <Box sx={{ mt: 2 }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: 'rgba(255,255,255,0.7)',
                        mb: 2,
                        fontSize: '0.9rem',
                        fontWeight: 600
                    }}
                >
                    Comments ({comments.length})
                </Typography>

                <Stack spacing={1.5}>
                    {comments.map((comment, index) => (
                        <Fade
                            in
                            timeout={300}
                            style={{ transitionDelay: `${index * 100}ms` }}
                            key={comment.$id}
                        >
                            <Box>
                                <CommentCard comment={comment} />
                            </Box>
                        </Fade>
                    ))}
                </Stack>
            </Box>
        </Fade>
    );
}

export default AllComments;