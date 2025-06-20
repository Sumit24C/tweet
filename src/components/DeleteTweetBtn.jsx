import React, { useEffect, useState } from 'react';
import { deleteFile, deleteTweet, getFileView } from '../appwrite/services';
import { IconButton, CircularProgress, Tooltip } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTweet as storeTweetDelete } from '../appwrite/services';

function DeleteTweetBtn({ tweetId, tweetImage }) {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleDeleteBtn = async () => {
        setLoading(true)
        try {
            await deleteTweet(tweetId, tweetImage)
            dispatch(storeTweetDelete(tweetId))
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
                        <CircularProgress size={20} thickness={5} color="white" />
                    ) : (
                        <DeleteOutlineIcon />
                    )}
                </IconButton>
            </span>
        </Tooltip>
    )
}

export default DeleteTweetBtn
