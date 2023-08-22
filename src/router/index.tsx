import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import UserList from "../features/users/UserList"
import User from "../features/users/User"
import VisitorsPage from "../features/visitors/VisitorsPage"
import React from "react"
import { ErrorPage } from "../common"
import UserPage from "../features/users/UserPage";

export enum PATH {
  users = "users",
  visitors = "visitors",
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PATH.users,
        element: <UserPage />,
      },
      {
        path: "/users/:userID",
        element: <User />,
      },
      {
        path: PATH.visitors,
        element: <VisitorsPage />,
      },
    ],
  },
])
