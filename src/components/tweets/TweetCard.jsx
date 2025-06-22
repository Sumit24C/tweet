import React, { useEffect, useState, useMemo } from 'react';
import { deleteTweet, getAllReaction, getFileView } from '../../appwrite/services';
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
    Fade,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
    AllComments,
    CommentForm,
    ReactionCounter,
    DeleteTweetBtn,
    FollowBtn,
} from '../index';

function TweetCard({ tweet, userId }) {
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const userData = useSelector((state) => state.auth.userData);
    const followData = useSelector((state) => state.follow.followInfo);
    const globalReactionData = useSelector((state) => state.tweet.globalReaction);
    const { id } = useParams();

    // Memoized calculations for better performance
    const currentFollow = useMemo(() =>
        followData.find((follow) =>
            userData.$id === follow.followerId && tweet.userId === follow.followingId
        ), [followData, userData.$id, tweet.userId]
    );

    const currentReaction = useMemo(() =>
        globalReactionData?.find((reaction) =>
            userData.$id === reaction.userId && tweet.$id === reaction.tweetId
        ) || null, [globalReactionData, userData.$id, tweet.$id]
    );

    const isOwnTweet = useMemo(() =>
        userData.$id === tweet.userId, [userData.$id, tweet.userId]
    );

    const formattedDate = useMemo(() =>
        new Date(tweet.$createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }), [tweet.$createdAt]
    );

    const shouldShowFollowBtn = !id && !isOwnTweet;

    return (
        <Box sx={{ m: 0, p: 0 }}>
            <Card
                elevation={0}
                sx={{
                    borderRadius: 0,
                    border: '1px solid rgba(255,255,255,0.08)',
                    backgroundColor: '#1e1e1e',
                    color: '#e0e0e0',
                    boxShadow: 'none',
                    px: 2,
                    pt: 2,
                    transition: 'background-color 0.2s ease',
                    '&:hover': {
                        backgroundColor: '#252525',
                    },
                }}
            >
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                            sx={{
                                bgcolor: '#6a1b9a',
                                width: 44,
                                height: 44,
                                fontSize: '1.1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            {tweet.username?.[0]?.toUpperCase() || 'U'}
                        </Avatar>

                        <Box>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 'bold',
                                    lineHeight: 1.2,
                                    '& a': {
                                        color: 'white',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            color: '#6a1b9a',
                                        },
                                    },
                                }}
                            >
                                {userData.$id !== userId && !isOwnTweet ? (
                                    <Link to={`/profile/${tweet.username}`}>
                                        @{tweet.username}
                                    </Link>
                                ) : (
                                    `@${tweet.username}`
                                )}
                            </Typography>

                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    fontSize: '0.8rem'
                                }}
                            >
                                {formattedDate}
                            </Typography>
                        </Box>
                    </Stack>

                    {shouldShowFollowBtn && (
                        <FollowBtn
                            key={tweet.$id}
                            followId={currentFollow?.$id || null}
                            followingId={tweet.userId}
                            followingName={tweet.username}
                        />
                    )}
                </Stack>

                {/* Content */}
                <CardContent sx={{ mb: 0, px: 0, py: 1 }}>
                    <Typography
                        variant="body1"
                        sx={{
                            whiteSpace: 'pre-line',
                            color: 'white',
                            mb: 2,
                            lineHeight: 1.5,
                            fontSize: '1rem'
                        }}
                    >
                        {tweet.content}
                    </Typography>

                    {tweet.tweetImage && (
                        <Box sx={{ mb: 2 }}>
                            <CardMedia
                                component="img"
                                image={getFileView(tweet.tweetImage)}
                                alt={tweet.content}
                                sx={{
                                    height: '35vh',
                                    width: '100%',
                                    objectFit: 'cover',
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s ease',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                    },
                                }}
                            />
                        </Box>
                    )}

                    {/* Action Bar */}
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ py: 1 }}
                    >
                        <ReactionCounter tweetId={tweet.$id} />

                        <IconButton
                            size="medium"
                            onClick={() => setShowCommentBox(prev => !prev)}
                            sx={{
                                color: showCommentBox ? '#ba68c8' : '#888',
                                transition: 'all 0.2s ease',
                                borderRadius: 2,
                                px: 1,
                                '&:hover': {
                                    color: '#ba68c8',
                                    backgroundColor: 'rgba(186, 104, 200, 0.1)',
                                },
                            }}
                        >
                            <CommentIcon sx={{ fontSize: 18 }} />
                            {commentCount > 0 && (
                                <Typography
                                    variant="caption"
                                    sx={{
                                        ml: 0.5,
                                        fontSize: '0.8rem',
                                        fontWeight: 500
                                    }}
                                >
                                    {commentCount}
                                </Typography>
                            )}
                        </IconButton>

                        {isOwnTweet && (
                            <DeleteTweetBtn
                                tweetId={tweet.$id}
                                tweetImage={tweet.tweetImage}
                            />
                        )}
                    </Stack>

                    {/* Comments Section */}
                    <Fade in={showCommentBox} timeout={300}>
                        <Box>
                            {showCommentBox && (
                                <>
                                    <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

                                    <Box mb={2}>
                                        <CommentForm
                                            tweetId={tweet.$id}
                                            userId={userData.$id}
                                            username={userData.name}
                                        />
                                    </Box>

                                    <AllComments
                                        tweetId={tweet.$id}
                                        setCommentCount={setCommentCount}
                                    />
                                </>
                            )}
                        </Box>
                    </Fade>
                </CardContent>
            </Card>
        </Box>
    );
}

export default TweetCard;