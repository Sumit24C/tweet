import { CircularProgress, Box, Modal, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCurrentUser } from './appwrite/auth';
import { login as authLogin, logout } from './store/authSlice';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { Header } from './components/index';
import { getAllComments, getAllFollowers, getAllFollowing, getAllReaction, getAllTweets } from './appwrite/services';
import { setComment } from './store/commentSlice';
import { setReaction, setTweet, setGlobalReaction } from './store/tweetSlice';
import { Query } from 'appwrite';
import { setFollowing } from './store/followSlice';

function App() {
  const dispatch = useDispatch();
  const storeComment = useSelector((state) => state.comment.comments)
  const userData = useSelector((state) => state.auth.userData);
  const storeTweets = useSelector((state) => state.tweet.tweets)
  const storeReaction = useSelector((state) => state.tweet.reactionCount)
  const globalReactionData = useSelector((state) => state.tweet.globalReaction)
  const storeFollow = useSelector((state) => state.follow.followInfo)

  useEffect(() => {
    if (!userData?.$id || storeTweets.length !== 0) return
    getAllTweets([Query.equal('userId', userData.$id)])
      .then((res) => dispatch(setTweet(res.documents)))
  }, [userData, dispatch, storeTweets.length])

  // Load user's own reactions
  useEffect(() => {
    if (!userData?.$id || storeReaction.length !== 0) return
    getAllReaction([Query.equal('userId', userData.$id)])
      .then((res) => dispatch(setReaction(res.documents)))
  }, [userData, dispatch, storeReaction.length])

  // Load ALL reactions globally for real-time updates
  useEffect(() => {
    if (!userData?.$id || globalReactionData.length !== 0) return

    // Load all reactions without filtering by userId to get global state
    getAllReaction([])
      .then((res) => {
        dispatch(setGlobalReaction(res.documents))
      })
      .catch((err) => console.error("Failed to load global reactions:", err))
  }, [userData, dispatch, globalReactionData.length])

  useEffect(() => {
    if (!userData?.$id || storeComment.length !== 0) return

    getAllComments([Query.equal('userId', userData.$id)])
      .then((res) => dispatch(setComment(res.documents)))
  }, [userData, dispatch, storeComment.length])

  useEffect(() => {
    if (!userData?.$id || storeFollow.length !== 0) return

    getAllFollowing([Query.equal('followerId', userData.$id)])
      .then((res) => dispatch(setFollowing(res.documents)))
  }, [userData, dispatch, storeFollow.length])


  return (
    <Box sx={{ margin: 0, padding: 0, minHeight: '100vh', bgcolor: '#121212' }}>
      {/* Fixed Header */}
      <Box sx={{ position: 'fixed', height: '9vh', top: 0, left: 0, right: 0, zIndex: 1100 }}>
        <Header />
      </Box>

      {/* Scrollable Main Content */}
      <Box
        sx={{
          pt: '9vh', // Updated to match the header height
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