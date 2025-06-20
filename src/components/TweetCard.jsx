import React, { useEffect, useState } from 'react';
import { deleteTweet, getFileView } from '../appwrite/services';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Stack,
    Avatar,
    Divider,
    IconButton,
    Box,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { useSelector } from 'react-redux';
import {
    AllComments,
    CommentForm,
    ReactionCounter,
    DeleteTweetBtn,
    FollowBtn,
} from './index';

function TweetCard({ tweet }) {
    const [showCommentBox, setShowCommentBox] = useState(false);
    const userData = useSelector((state) => state.auth.userData);

    return (
        <Box sx={{ m: 0, p: 0 }}>
            <Card
                elevation={0}
                sx={{
                    borderRadius: 0,
                    border: '1px solid rgba(255,255,255,0.08)', // subtle bottom border like Twitter
                    backgroundColor: '#1e1e1e',
                    color: '#e0e0e0',
                    boxShadow: 'none',
                    px: 2,
                    pt: 2,
                }}
            >

                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: '#6a1b9a' }}>
                            {tweet.username?.[0]?.toUpperCase() || 'U'}
                        </Avatar>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            @{tweet.username}
                        </Typography>
                        <Typography variant="caption" color="gray">
                            . {new Date(tweet.$createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </Typography>

                    </Stack>

                    {userData.$id !== tweet.userId && (
                        <FollowBtn key={tweet.$id} followingId={tweet.userId} followingName={tweet.username} />
                    )}
                </Stack>

                {/* Content */}
                <CardContent sx={{ mb: 0 }}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        {tweet.content}
                    </Typography>

                    {tweet.tweetImage && (
                        <CardMedia
                            component="img"
                            image={getFileView(tweet.tweetImage)}
                            alt={tweet.content}
                            sx={{
                                height: '35vh',
                                width: '100%',
                                objectFit: 'cover',
                                borderRadius: 2,
                            }}
                        />
                    )}

                    {/* Action Bar */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <ReactionCounter tweetId={tweet.$id} initialCount={tweet.reactionCount} />
                        <IconButton
                            size="medium"
                            onClick={() => setShowCommentBox(prev => !prev)}
                            sx={{
                                color: '#888',
                                '&:hover': { color: '#ba68c8' },
                            }}
                        >
                            <CommentIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                        {userData.$id === tweet.userId && (
                            <DeleteTweetBtn tweetId={tweet.$id} tweetImage={tweet.tweetImage} />
                        )}
                    </Stack>

                    {/* Comments */}
                    {showCommentBox && (
                        <>
                            <Box mt={2}>
                                <CommentForm
                                    tweetId={tweet.$id}
                                    userId={userData.$id}
                                    username={userData.name}
                                />
                            </Box>
                            <Box>
                                <AllComments tweetId={tweet.$id} />
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Thin divider between tweets */}
        </Box >
    );
}

export default TweetCard;
