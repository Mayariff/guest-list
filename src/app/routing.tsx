import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import React from "react"
import { ErrorPage } from "../common"
import { StartUserPage, UserPage, VisitorsPage } from "../features"

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
        element: <StartUserPage />,
      },
      {
        path: PATH.user,
        element: <UserPage />,
      },
      {
        path: PATH.visitors,
        element: <VisitorsPage />,
      },
    ],
  },
])
