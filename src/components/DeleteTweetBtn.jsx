import React, { useEffect, useState } from 'react';
import { deleteFile, deleteTweet, getFileView } from '../appwrite/services';
import { IconButton, CircularProgress, Tooltip } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTweet as deleteTweetAction } from '../store/tweetSlice'; // or wherever your slice is
function DeleteTweetBtn({ tweetId, tweetImage, }) {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleDeleteBtn = async () => {
        setLoading(true)
        try {
            await deleteTweet(tweetId, tweetImage)
            dispatch(deleteTweetAction(tweetId))

        } catch (error) {
            console.log("handleDelete :: deleteTweet :: error", error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return (
        <Tooltip title="Delete Tweet" arrow>
            <span>
                <IconButton
                    size="medium"
                    onClick={handleDeleteBtn}
                    sx={{
                        color: loading ? '#ba68c8' : '#888',
                        '&:hover': {
                            color: '#ba68c8',
                        },
                        transition: '0.3s',
                    }}
                    disabled={loading}
                >
                    {loading ? (
                        // FIX: Use sx prop for custom color
                        <CircularProgress
                            size={20}
                            thickness={5}
                            sx={{ color: 'white' }}
                        />
                    ) : (
                        <DeleteOutlineIcon />
                    )}
                </IconButton>
            </span>
        </Tooltip>
    )
}

export default DeleteTweetBtn
