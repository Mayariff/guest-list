import { Link, Outlet } from "react-router-dom"
import { PATH } from "./router"

function App() {
  return (
    <>
      <Link to={PATH.users}>Users</Link>
      <Link to={PATH.visitors}>Visitors</Link>
      <Outlet />
    </>
  )
}

export default App
