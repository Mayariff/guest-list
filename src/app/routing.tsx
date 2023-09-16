import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import React from "react"
import { ErrorPage } from "../common"
import { User, UserPage, VisitorsPage } from "../features"

export enum PATH {
  users = "/users",
  visitors = "visitors",
  user = "/users/:userID",
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
        children: [
          {
            path: PATH.user,
            element: <User />,
          },
        ],
      },
      {
        path: PATH.visitors,
        element: <VisitorsPage />,
      },
    ],
  },
])
