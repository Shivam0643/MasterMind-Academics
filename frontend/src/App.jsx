import { useState } from 'react'
// import './App.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Error from './pages/Error';
import SignUp from './pages/SignUp';
import Courses from './pages/Courses';
import { Toaster } from 'react-hot-toast'
import Buy from './pages/Buy';
import CourseDetail from './pages/CourseDetail';
import Purchases from './pages/Purchases';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '*',
        element: <Error />
      },
      {
        path: '/courses',
        element: <Courses />
      },
      {
        path: '/courses/:courseId', // Dynamic route for course details
        element: <CourseDetail />,
      },
      {
        path: '/courses/buy/:courseId', // Corrected the path for Buy
        element: <Buy />
      },
      {
        path: '/purchases',
        element: <Purchases />
      },
    ]
  )

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
