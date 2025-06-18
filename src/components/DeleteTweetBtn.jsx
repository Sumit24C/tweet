import React, { useState } from 'react';
import { deleteFile, deleteTweet, getFileView } from '../appwrite/services';
import {
    IconButton,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function DeleteTweetBtn({ tweetId, tweetImage }) {
    const [loading, setLoading] = useState(false)

    const handleDeleteBtn = async () => {
        setLoading(true)
        try {
            if (tweetImage) {
                await deleteFile(tweetImage)
            }
            await deleteTweet(tweetId)
        } catch (error) {
            console.log("handleDelete :: deleteTweet :: error", error)
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

export default DeleteTweetBtn
