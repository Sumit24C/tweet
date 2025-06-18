import React, { useState } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Popover,
    Avatar,
    Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn'; // Make sure this is the correct path

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const navItems = [
        { path: '/home', name: 'Home' },
        { path: '/profile', name: 'Profile' },
    ];

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'user-popover' : undefined;

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: '#121212',
                boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                zIndex: 1200,
                px: 2,
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
                    Tweetly
                </Typography>

                <Box display="flex" alignItems="center">
                    {navItems.map((item) => (
                        <Button
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            sx={{
                                color: '#e0d4ff',
                                mx: 1,
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: 2,
                                textTransform: 'capitalize',
                                '&:hover': {
                                    backgroundColor: '#2c1a40',
                                    borderColor: '#ba68c8',
                                },
                            }}
                        >
                            {item.name}
                        </Button>
                    ))}

                    <Button
                        onClick={handleOpen}
                        sx={{
                            ml: 1,
                            color: '#e0d4ff',
                            borderRadius: 2,
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#2c1a40',
                            },
                        }}
                        aria-describedby={id}
                        startIcon={
                            <Avatar
                                sx={{
                                    width: 30,
                                    height: 30,
                                    fontSize: 14,
                                    bgcolor: '#ba68c8',
                                }}
                            >
                                {userData.name?.[0] || 'unknown'}
                            </Avatar>
                        }
                    >
                        {userData.name}
                    </Button>

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        PaperProps={{
                            sx: {
                                mt: 1,
                                px: 2,
                                py: 1,
                                backgroundColor: '#1e1e1e',
                                color: '#fff',
                                borderRadius: 2,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                            }
                        }}
                    >
                        <Stack spacing={1}>
                            <LogoutBtn />
                        </Stack>
                    </Popover>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
