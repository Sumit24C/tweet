import { CircularProgress, Box, Modal, Button } from '@mui/material';
import React from 'react';
function CreatePostBtn({ setIsOpen }, ref) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button
                ref={ref}
                onClick={() => setIsOpen(true)}
                sx={{
                    backgroundColor: '#2c1a40',
                    color: '#e0d4ff',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 2,
                    textTransform: 'capitalize',
                    '&:hover': {
                        backgroundColor: '#2c1a40',
                        borderColor: '#ba68c8',
                    },
                }}
            >
                Start a Tweet
            </Button>
        </Box>
    )
}

export default React.forwardRef(CreatePostBtn)
