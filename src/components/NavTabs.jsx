import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
} from '@mui/material';
import { NavLink, Outlet, } from 'react-router-dom'

function NavTabs({ id }) {

    const tabItems = [
        { label: 'Posts', path: '.' },
        { label: 'Followers', path: 'followers' },
        { label: 'Following', path: 'following' },
    ];
    return (
        <div>
            {/* Nav Tabs (buttons using NavLink) */}
            <Box
                sx={{
                    position: 'sticky',
                    top: '9vh',
                    zIndex: 10,
                    backgroundColor: '#121212',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    justifyContent: 'space-around',
                    py: 1,
                    overflowY: 'auto',
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.3)',
                }}
            >
                {tabItems.map((tab) => (
                    <NavLink
                        key={tab.path}
                        to={tab.path}
                        end={tab.path === '.'}
                        style={({ isActive }) => ({
                            color: isActive ? 'rgb(226, 71, 253)' : 'white',
                            textDecoration: 'none',
                            borderBottom: isActive ? '2px solid rgb(226, 71, 253)' : 'none',
                            paddingBottom: 6,
                        })}
                    >
                        {tab.label}
                    </NavLink>
                ))}
            </Box>

            {/* Routed Tab Content */}
            <Box sx={{ py: 2 }}>
                <Outlet id={id} />
            </Box>
        </div>
    )
}

export default NavTabs
