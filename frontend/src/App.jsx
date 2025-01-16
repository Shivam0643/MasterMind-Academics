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
import LiveCourse from './pages/LiveCourse';
import AdminSignup from './Admin/AdminSignup';
import AdminLogin from './Admin/AdminLogin';
import Dashboard from './Admin/Dashboard';
import CreateCourse from './Admin/CreateCourse';
import UpdateCourse from './Admin/UpdateCourse';
import OurCourses from './Admin/OurCourses';


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
      {
        path: '/livecourses',
        element: <LiveCourse />
      },


      // Admin Routes
      {
        path: '/admin/signup',
        element: <AdminSignup />
      },
      {
        path: '/admin/login',
        element: <AdminLogin />
      },
      {
        path: '/admin/dashboard',
        element: <Dashboard />
      },
      {
        path: '/admin/createcourse',
        element: <CreateCourse />
      },
      {
        path: '/admin/updatecourse/:id',
        element: <UpdateCourse />
      },
      {
        path: '/admin/ourcourses',
        element: <OurCourses />
      }
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
