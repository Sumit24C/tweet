import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tweets: [],
    userTweets: [],
    reactionCount: [],
    globalReaction: []
}

const tweetSlice = createSlice({
    name: 'tweet',
    initialState,
    reducers: {

        setUserTweet: (state, action) => {
            state.userTweets = action.payload
        },
        setTweet: (state, action) => {
            state.tweets = action.payload
        },
        addTweet: (state, action) => {
            state.tweets.push(action.payload)
        },
        deleteTweet: (state, action) => {
            state.tweets = state.tweets.filter((tweet) => tweet.$id !== action.payload)
        },
        updateTweet: (state, action) => {
            state.tweets = state.tweets.map((tweet) => (
                action.payload.id === tweet.$id ?
                    [...tweet, { reactionCount: action.payload.reactionCount }]
                    : tweet))
        },
        setReaction: (state, action) => {
            state.reactionCount = action.payload
        },
        addReaction: (state, action) => {
            state.reactionCount.push(action.payload)
        },
        removeReaction: (state, action) => {
            state.reactionCount = state.reactionCount.filter((reaction) => reaction.$id !== action.payload)
        },
        setGlobalReaction: (state, action) => {
            state.globalReaction = action.payload
        },
        addGlobalReaction: (state, action) => {
            state.globalReaction.push(action.payload)
        },
        removeGlobalReaction: (state, action) => {
            state.globalReaction = state.globalReaction.filter((reaction) => reaction.$id !== action.payload)
        }
    }
})

export const { setUserTweet, addTweet, setTweet, deleteTweet, updateTweet, setReaction, addReaction, removeReaction, setGlobalReaction, addGlobalReaction, removeGlobalReaction } = tweetSlice.actions
export default tweetSlice.reducer
