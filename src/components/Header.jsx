import React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const navItems = [
        { path: '/home', name: 'Home' },
        { path: '/profile', name: 'Profile' }
    ];

    return (
        <AppBar position="static" sx={{ backgroundColor: '#121212', boxShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
                    Tweetly
                </Typography>

                <Box>
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
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
