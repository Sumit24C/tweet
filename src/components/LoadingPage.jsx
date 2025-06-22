import React from 'react';
import { Box, Skeleton, Container } from '@mui/material';

function LoadingPage({
    count = 2,
    variant = 'comment',
    showContainer = false,
    containerProps = {},
    spacing = 2,
    customStyles = {}
}) {
    // Comment/basic skeleton (original design)
    const renderCommentSkeleton = () => (
        <Box sx={{ display: 'flex', mb: spacing }}>
            <Skeleton
                variant="circular"
                width={32}
                height={32}
                sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
            />
            <Box sx={{ ml: 2, flex: 1 }}>
                <Skeleton
                    variant="text"
                    width="30%"
                    height={20}
                    sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
                />
                <Skeleton
                    variant="text"
                    width="80%"
                    height={16}
                    sx={{ bgcolor: 'rgba(255,255,255,0.1)', mt: 0.5 }}
                />
            </Box>
        </Box>
    );

    // Tweet skeleton for home page
    const renderTweetSkeleton = () => (
        <Box sx={{
            mb: spacing,
            p: 2.5,
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            ...customStyles
        }}>
            {/* User info */}
            <Box sx={{ display: 'flex', mb: 2 }}>
                <Skeleton
                    variant="circular"
                    width={48}
                    height={48}
                    sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
                />
                <Box sx={{ ml: 2, flex: 1 }}>
                    <Skeleton
                        variant="text"
                        width="35%"
                        height={20}
                        sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
                    />
                    <Skeleton
                        variant="text"
                        width="20%"
                        height={16}
                        sx={{ bgcolor: 'rgba(255,255,255,0.1)', mt: 0.5 }}
                    />
                </Box>
            </Box>

            {/* Tweet content */}
            <Box sx={{ mb: 2 }}>
                <Skeleton
                    variant="text"
                    width="100%"
                    height={18}
                    sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 0.5 }}
                />
                <Skeleton
                    variant="text"
                    width="85%"
                    height={18}
                    sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 0.5 }}
                />
                <Skeleton
                    variant="text"
                    width="60%"
                    height={18}
                    sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
                />
            </Box>

            {/* Action buttons */}
            <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
                {[1, 2, 3, 4].map((item) => (
                    <Skeleton
                        key={item}
                        variant="text"
                        width="50px"
                        height={16}
                        sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
                    />
                ))}
            </Box>
        </Box>
    );

    // Profile skeleton
    const renderProfileSkeleton = () => (
        <Box sx={{
            mb: spacing,
            p: 3,
            textAlign: 'center',
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            ...customStyles
        }}>
            <Skeleton
                variant="circular"
                width={100}
                height={100}
                sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    mx: 'auto',
                    mb: 2
                }}
            />
            <Skeleton
                variant="text"
                width="60%"
                height={28}
                sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    mx: 'auto',
                    mb: 1
                }}
            />
            <Skeleton
                variant="text"
                width="40%"
                height={18}
                sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    mx: 'auto',
                    mb: 2
                }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Skeleton
                    variant="text"
                    width="80px"
                    height={16}
                    sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
                />
                <Skeleton
                    variant="text"
                    width="80px"
                    height={16}
                    sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
                />
            </Box>
        </Box>
    );

    // List item skeleton
    const renderListSkeleton = () => (
        <Box sx={{
            mb: spacing,
            p: 2,
            borderRadius: 1,
            bgcolor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            ...customStyles
        }}>
            <Skeleton
                variant="text"
                width="70%"
                height={20}
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 1 }}
            />
            <Skeleton
                variant="text"
                width="90%"
                height={16}
                sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
            />
        </Box>
    );

    // Card skeleton for feed items
    const renderCardSkeleton = () => (
        <Box sx={{
            mb: spacing,
            p: 2,
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            ...customStyles
        }}>
            <Skeleton
                variant="rectangular"
                width="100%"
                height={120}
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1, mb: 2 }}
            />
            <Skeleton
                variant="text"
                width="80%"
                height={20}
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 1 }}
            />
            <Skeleton
                variant="text"
                width="60%"
                height={16}
                sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
            />
        </Box>
    );

    const renderSkeleton = () => {
        switch (variant) {
            case 'tweet':
                return renderTweetSkeleton();
            case 'profile':
                return renderProfileSkeleton();
            case 'list':
                return renderListSkeleton();
            case 'card':
                return renderCardSkeleton();
            case 'comment':
            default:
                return renderCommentSkeleton();
        }
    };

    const skeletonContent = (
        <Box sx={{ mt: 2 }}>
            {Array.from({ length: count }, (_, index) => (
                <Box key={index}>
                    {renderSkeleton()}
                </Box>
            ))}
        </Box>
    );

    // If showContainer is true, wrap in container (for full page loading)
    if (showContainer) {
        return (
            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    bgcolor: '#121212',
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    overflowY: 'auto',
                    py: 4,
                    ...containerProps
                }}
            >
                <div style={{ width: '100%', maxWidth: 600 }}>
                    {skeletonContent}
                </div>
            </Container>
        );
    }

    return skeletonContent;
}

export default LoadingPage;