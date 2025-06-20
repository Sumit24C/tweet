import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tweets: [],
}

const tweetSlice = createSlice({
    name: 'tweet',
    initialState,
    reducers: {

        setTweet: (state, action) => {
            state.tweets = action.payload
        },
        addTweet: (state, action) => {
            state.tweets.push(action.payload)
        },
        deleteTweet: (state, action) => {
            state.tweets.filter((tweet) => tweet.$id !== action.payload)
        }
    }
})

export const { addTweet, setTweet, deleteTweet } = tweetSlice.actions
export default tweetSlice.reducer
