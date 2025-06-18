import React from 'react';
import { Button } from '@mui/material';

function FollowBtn({ tweetId, createdBy }) {
    const handleFollowBtn = async () => {
        // Follow logic here
    };

    return (
        <Button
            onClick={handleFollowBtn}
            variant="outlined"
            sx={{
                ml: 'auto',
                color: '#ba68c8',
                borderColor: '#ba68c8',
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                '&:hover': {
                    backgroundColor: '#ba68c81a',
                    borderColor: '#ba68c8',
                },
            }}
        >
            Follow
        </Button>
    );
}

export default FollowBtn;
