import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    followInfo: [],
    followersInfo: [],
}

const followSlice = createSlice({
    name: 'follow',
    initialState,
    reducers: {
        setFollowing: (state, action) => {
            state.followInfo = action.payload
        },
        setFollower: (state, action) => {
            state.followersInfo = action.payload
        },
        addFollow: (state, action) => {
            state.followInfo.push(action.payload)
        },
        deleteFollow: (state, action) => {
            state.followInfo.filter((follow) => follow.$id !== action.payload)
        }
    }
})

export const { setFollowing, addFollow, deleteFollow, setFollower } = followSlice.actions
export default followSlice.reducer
