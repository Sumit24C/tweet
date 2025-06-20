import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import commentSlice from './commentSlice'
import tweetSlice from './tweetSlice'
import followSlice from './followSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        comment: commentSlice,
        tweet: tweetSlice,
        follow: followSlice,
    }
})

export default store