import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";  // Import new wrapper
import Home from './pages/Home';
import Login from './pages/Login';
import Error from './pages/Error';
import SignUp from './pages/SignUp';
import Courses from './pages/Courses';
import { Toaster } from 'react-hot-toast';
import CourseDetail from './pages/CourseDetail';
import LiveCourse from './pages/LiveCourse';
import AdminSignup from './Admin/AdminSignup';
import AdminLogin from './Admin/AdminLogin';
import Dashboard from './Admin/Dashboard';
import CreateCourse from './Admin/CreateCourse';
import OurCourses from './Admin/OurCourses';
import Purchases from './pages/Purchases';
import ProtectedAdminRoute from './Admin/ProtectedAdminRoute';
import Lectures from './Admin/Lectures';
import CourseLectures from './pages/CourseLectures';
import QuizManagement from "./Admin/QuizManagement";
import AllPurchases from "./Admin/AllPurchases";
import AllUsers from "./Admin/AllUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Wrap with RootLayout
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "*", element: <Error /> },
      { path: "courses", element: <Courses /> },
      { path: "courses/:courseId", element: <CourseDetail /> },
      { path: "livecourses", element: <LiveCourse /> },
      { path: "purchase", element: <Purchases /> },
      { path: "course/:courseId/lectures", element: <CourseLectures /> },

      // Admin Routes
      { path: "admin/signup", element: <AdminSignup /> },
      { path: "admin/login", element: <AdminLogin /> },
      {
        path: "admin/",
        element: <ProtectedAdminRoute />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "createcourse", element: <CreateCourse /> },
          { path: "lectures", element: <Lectures /> },
          { path: "ourcourses", element: <OurCourses /> },
          { path: "quizzes", element: <QuizManagement /> },
          { path: "all-purchases", element: <AllPurchases /> },
          { path: "all-users", element: <AllUsers /> },
        ],
      }
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
