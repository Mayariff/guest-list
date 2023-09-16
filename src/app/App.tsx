import { Link, Outlet } from "react-router-dom"
import { PATH } from "./routing"
import s from "./App.module.scss"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"

function App() {
  const navigate = useNavigate()
  let location = useLocation()
  useEffect(() => {
    if (location?.pathname === "/") navigate(PATH.users)
  }, [])

  const [activeFirst, setActiveFirst] = useState<boolean>(true)
  const onClickHandler = (e) => setActiveFirst((prev) => !prev)

  const usersStyle = activeFirst ? `${s.link} ${s.active}` : s.link
  const visitorsStyle = activeFirst ? s.link : `${s.link} ${s.active}`
  return (
    <div className={s.container}>
      <div className={s.navigation}>
        <Link to={PATH.users} className={usersStyle} onClick={onClickHandler}>
          Users
        </Link>
        <Link
          to={PATH.visitors}
          className={visitorsStyle}
          onClick={onClickHandler}
        >
          Visitors
        </Link>
      </div>
      <Outlet />
    </div>
  )
}

export default App
