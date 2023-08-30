import { Link, Outlet } from "react-router-dom"
import { PATH } from "./routing"

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
