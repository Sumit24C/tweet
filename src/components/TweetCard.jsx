import React, { useState } from 'react';
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
import { AllComments, AddComment, ReactionCounter, DeleteTweetBtn, FollowBtn } from './index';

function TweetCard({ tweet }) {
    const [showCommentBox, setShowCommentBox] = useState(false);
    const userData = useSelector((state) => state.auth.userData)

    return (
        <Card
            elevation={4}
            sx={{
                borderRadius: 4,
                backgroundColor: '#1e1e1e',
                color: '#e0e0e0',
                overflow: 'hidden',
                mb: 3,
                p: 2,
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
                </Stack>

                {/* Only show follow if not your own tweet */}
                {userData.$id !== tweet.userId && (
                    <FollowBtn tweetId={tweet.$id} createdBy={tweet.userId} />
                )}
            </Stack>

            {/* Tweet content */}
            <CardContent sx={{ py: 0 }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    {tweet.content}
                </Typography>

                {/* Image if exists */}
                {tweet.tweetImage && (
                    <CardMedia
                        component="img"
                        image={getFileView(tweet.tweetImage)}
                        alt={tweet.content}
                        sx={{
                            height: 300,
                            width: '100%',
                            objectFit: 'cover',
                            borderRadius: 2,
                            mb: 2,
                        }}
                    />
                )}

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />

                {/* Action bar */}
                <Stack direction="row" spacing={2} alignItems="center">
                    <ReactionCounter tweetId={tweet.$id} initialCount={tweet.reactionCount} />

                    <IconButton
                        size="medium"
                        onClick={() => setShowCommentBox(prev => !prev)}
                        sx={{
                            color: '#888',
                            '&:hover': {
                                color: '#ba68c8',
                            },
                        }}
                    >
                        <CommentIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                    {userData.$id === tweet.userId && <DeleteTweetBtn tweetId={tweet.$id} tweetImage={tweet.tweetImage} />}
                </Stack>

                {/* Comment Box */}
                {showCommentBox && (<>
                    <Box mt={2}>
                        <AddComment
                            tweetId={tweet.$id}
                            userId={userData.$id}
                            username={userData.name}
                        />
                    </Box>
                    <Box>
                        <AllComments tweetId={tweet.$id} currentUserId={userData.$id} />
                    </Box>
                </>
                )}
            </CardContent>
        </Card>
    );
}

export default TweetCard;
