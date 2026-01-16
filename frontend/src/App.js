import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import DashboardPage from "./pages/DashboardPage";
import Layout from "./pages/Layout";
import autMiddleware from "./middleware/autMiddleware";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailsPage from "./pages/CourseDetailsPage"

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegistrationPage />,
    },
    {
      path: "/",
      element: <Layout />,
      //middleware: [autMiddleware],
      children: [
        {
          index: true,
          element: <Navigate to="dashboard" replace />,
        },
        {
          path: "dashboard",
          element: <DashboardPage />,
        },
        {
          path: "courses",
          children: [
            {
              index: true,
              element: <CoursesPage />,
            },
            {
              path: ":id",
              element: <CourseDetailsPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
