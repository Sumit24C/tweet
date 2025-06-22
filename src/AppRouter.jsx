import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { TweetForm, AuthLayout, FollowCard } from './components/index';
import { Profile, Home, Login, Signup, Follow, MyPosts } from './pages/index';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthLayout authentication={true}>
        <App />
      </AuthLayout>
    ),
    children: [
      {
        index: true, // This makes it `/`
        element: <Home />,
      },
      {
        path: 'add-tweet',
        element: <TweetForm />,
      },
      {
        path: 'profile',
        element: <Profile />,
        children: [
          {
            index: true,
            element: <MyPosts />
          },
          {
            path: 'followers',
            element: <Follow path={'followers'} />
          },
          {
            path: 'following',
            element: <Follow path={'following'} />
          }
        ]
      },
      {
        path: 'profile/:id',
        element: <Profile />,
        children: [
          {
            index: true,
            element: <MyPosts />
          },
          {
            path: 'followers',
            element: <Follow path={'followers'} />
          },
          {
            path: 'following',
            element: <Follow path={'following'} />
          }
        ]
      },
    ],
  },
  {
    path: '/login',
    element: (
      <AuthLayout authentication={false}>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: '/signup',
    element: (
      <AuthLayout authentication={false}>
        <Signup />
      </AuthLayout>
    ),
  },
]);

export default AppRouter;
