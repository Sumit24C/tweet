import { CircularProgress, Box, Modal, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { Header } from './components/index';
import { getAllComments, getAllFollowing, getAllReaction, getAllTweets } from './appwrite/services';
import { setComment } from './store/commentSlice';
import { setReaction, setTweet, setGlobalReaction } from './store/tweetSlice';
import { Query } from 'appwrite';
import { setFollowing } from './store/followSlice';

function App() {
  const dispatch = useDispatch();

  // Redux selectors
  const userData = useSelector((state) => state.auth.userData);
  const storeComment = useSelector((state) => state.comment.comments);
  const storeTweets = useSelector((state) => state.tweet.tweets);
  const storeReaction = useSelector((state) => state.tweet.reactionCount);
  const globalReactionData = useSelector((state) => state.tweet.globalReaction);
  const storeFollow = useSelector((state) => state.follow.followInfo);

  // Load user's own tweets
  useEffect(() => {
    if (!userData?.$id || storeTweets.length !== 0) return;

    getAllTweets([Query.equal('userId', userData.$id)])
      .then((res) => dispatch(setTweet(res.documents)))
      .catch((err) => console.error('Failed to load tweets:', err));
  }, [userData, dispatch, storeTweets.length]);

  // Load user's own reactions
  useEffect(() => {
    if (!userData?.$id || storeReaction.length !== 0) return;

    getAllReaction([Query.equal('userId', userData.$id)])
      .then((res) => dispatch(setReaction(res.documents)))
      .catch((err) => console.error('Failed to load user reactions:', err));
  }, [userData, dispatch, storeReaction.length]);

  // Load ALL reactions globally for real-time updates
  useEffect(() => {
    if (!userData?.$id || globalReactionData.length !== 0) return;

    getAllReaction([])
      .then((res) => dispatch(setGlobalReaction(res.documents)))
      .catch((err) => console.error('Failed to load global reactions:', err));
  }, [userData, dispatch, globalReactionData.length]);

  // Load user's own comments
  useEffect(() => {
    if (!userData?.$id || storeComment.length !== 0) return;

    getAllComments([Query.equal('userId', userData.$id)])
      .then((res) => dispatch(setComment(res.documents)))
      .catch((err) => console.error('Failed to load comments:', err));
  }, [userData, dispatch, storeComment.length]);

  // Load user's following data
  useEffect(() => {
    if (!userData?.$id || storeFollow.length !== 0) return;

    getAllFollowing([Query.equal('followerId', userData.$id)])
      .then((res) => dispatch(setFollowing(res.documents)))
      .catch((err) => console.error('Failed to load following:', err));
  }, [userData, dispatch, storeFollow.length]);

  return (
    <Box sx={{ margin: 0, padding: 0, minHeight: '100vh', bgcolor: '#121212' }}>
      {/* Fixed Header */}
      <Box sx={{ position: 'fixed', height: '9vh', top: 0, left: 0, right: 0, zIndex: 1100 }}>
        <Header />
      </Box>

      {/* Scrollable Main Content */}
      <Box
        sx={{
          pt: '9vh',
          px: 2,
          pb: 4,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;