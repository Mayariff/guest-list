import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import User from "../features/users/User"
import VisitorsPage from "../features/visitors/VisitorsPage"
import React from "react"
import { ErrorPage } from "../common"
import UserPage from "../features/users/UserPage"

export enum PATH {
  users = "users",
  visitors = "visitors",
  user = "users/:userID",
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
        path: PATH.user,
        element: <User />,
      },
      {
        path: PATH.visitors,
        element: <VisitorsPage />,
      },
    ],
  },
])
