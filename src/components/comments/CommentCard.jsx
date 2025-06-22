import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Typography,
    Avatar,
    Stack,
    CircularProgress,
} from '@mui/material';

function CommentCard({ comment }) {
    return (
        <div>
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
                    {/* <Typography
                            variant="caption"
                            sx={{ color: '#888', marginLeft: 'auto' }}
                        >
                            {comment.userId === currentUserId && <DeleteCommentBtn ref={ref} commentId={comment.$id} setComments={setComments} />}
                        </Typography> */}
                </Stack>
                <Typography variant="body2" sx={{ color: '#e0d4ff' }}>
                    {comment.content}
                </Typography>
            </Box>
        </div>
    )
}

export default CommentCard
