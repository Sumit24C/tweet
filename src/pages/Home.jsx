import { CircularProgress, Box, Modal, Button, Container } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react'
import { getAllTweets } from '../appwrite/services'
import { useSelector } from 'react-redux'
import { CreatePostBtn, TweetForm, TweetCard } from '../components/index'


function Home() {
    const [tweets, setTweets] = useState([])
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef()
    const storeTweets = useSelector((state) => state.tweet.tweets)
    const authStatus = useSelector((state) => state.auth.status)
    useEffect(() => {
        if (authStatus) {
            setLoading(true)
            getAllTweets()
                .then((tweets) => {
                    if (tweets) {
                        setTweets(tweets.documents)
                    }
                })
                .catch((err) => console.log("getTweet :: error", err))
                .finally(() => setLoading(false))
        }
    }, [storeTweets, authStatus])

    return (
        <>
            <CreatePostBtn ref={ref} setIsOpen={setIsOpen} />
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1200 }}
            >
                <TweetForm closeModal={() => setIsOpen(false)} />
            </Modal>
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
                }}
            >
                <div style={{ width: '100%', maxWidth: 600 }}>
                    {tweets.map((tweet) => (
                        <TweetCard key={tweet.$id} tweet={tweet} />
                    ))}
                </div>
            </Container>
        </>
    )
}

export default Home
