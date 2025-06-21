import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: []
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setComment: (state, action) => {
            state.comments = action.payload
        },
        addComment: (state, action) => {
            state.comments.push(action.payload)
        },
        deleteComment: (state, action) => {
            state.comments = state.comments.filter((comment) => comment.$id !== action.payload)
        }
    }
})

export const { addComment, setComment, deleteComment } = commentSlice.actions
export default commentSlice.reducer
