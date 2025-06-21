import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    followInfo: [],
    followersInfo: [],
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
        }
    }
})

export const { setFollowing, addFollow, removeFollow, setFollower } = followSlice.actions
export default followSlice.reducer
