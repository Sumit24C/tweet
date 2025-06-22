import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    followInfo: [],
    followersInfo: [],
    userFollowersInfo: [],
    userFollowingsInfo: [],
}

const followSlice = createSlice({
    name: 'follow',
    initialState,
    reducers: {
        setFollower: (state, action) => {
            state.followersInfo = action.payload
        },
        setFollowing: (state, action) => {
            state.followInfo = action.payload
        },
        addFollow: (state, action) => {
            state.followInfo.push(action.payload)
        },
        removeFollow: (state, action) => {
            state.followInfo = state.followInfo.filter((follow) => follow.$id !== action.payload)
        },
        setUserFollower: (state, action) => {
            state.userFollowersInfo = action.payload
        },
        setUserFollowing: (state, action) => {
            state.userFollowingsInfo = action.payload
        },
    }
})

export const { setFollowing, addFollow, removeFollow, setFollower, setUserFollower, setUserFollowing } = followSlice.actions
export default followSlice.reducer
