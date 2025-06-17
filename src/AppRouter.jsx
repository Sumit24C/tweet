import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { Login, Signup } from './components/index'
import { Profile, Home } from './pages/index'
import AddTweet from './components/AddTweet'

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'add-tweet',
        element: <AddTweet />
      },
      {
        path: 'home',
        element: <Home />
      }, {
        path: 'profile',
        element: <Profile />
      }
    ]
  }, {
    path: '/login', element: <Login />
  }, {
    path: '/signup', element: <Signup />
  }
])

export default AppRouter
