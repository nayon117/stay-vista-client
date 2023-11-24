import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import RoomDetails from "../pages/RoomDetails/RoomDetails";
import PrivateRoute from "./PrivateRoute";
import { getRoom } from "../api/rooms";
import DashboardLayout from "../layouts/DashBoardLayout";
import AddRoom from "../pages/Dashboard/Host/AddRoom";
import MyListings from "../pages/Dashboard/Host/MyListings";
import HostRoute from "./HostRoute";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import MyBookings from "../pages/Dashboard/Guest/MyBookings";
import ManageBookings from "../pages/Dashboard/Host/ManageBookings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/room/:id",
        element: (
          <PrivateRoute>
            {" "}
            <RoomDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) => getRoom(params.id),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      // Host routes
      {
        path: "add-room",
        element: (
          <PrivateRoute>
            <HostRoute>
              <AddRoom />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-listings",
        element: (
          <PrivateRoute>
            <HostRoute>
              <MyListings></MyListings>
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <PrivateRoute>
            <HostRoute>
               <ManageBookings/>
            </HostRoute>
          </PrivateRoute>
        ),
      },

      // admin routes
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      // common routes
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings/>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
