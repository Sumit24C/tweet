import React, { useState } from 'react';
import { deleteComment, deleteFile, deleteTweet, getFileView } from '../appwrite/services';
import {
    IconButton,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';

function DeleteCommentBtn({ commentId, setComment }, ref) {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const handleDeleteBtn = async () => {
        setLoading(true)
        try {
            await deleteComment(commentId)
            dispatch(deleteComment(commentId))
        } catch (error) {
            console.log("handleDelete :: deleteComment :: error", error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <IconButton
                size="medium"
                onClick={() => handleDeleteBtn()}
                sx={{
                    color: '#888',
                    '&:hover': {
                        color: '#ba68c8',
                    },
                }}
            >
                <DeleteOutlineIcon />
            </IconButton>
        </div>
    )
}

export default React.forwardRef(DeleteCommentBtn)