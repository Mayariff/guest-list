import React from "react"
import { useRouteError } from "react-router"
import s from "./ErrorPage.module.scss"
import { img } from "../../assets/image"

const ErrorPage = () => {
  const error = useRouteError() as { statusText?: string; message?: string }
  const image = { backgroundImage: `url(${img.error})` }
  return (
    <div id="error-page" className={s.container}>
      <img src={img.error2} alt={"error"} className={s.img} />
      <h1 className={s.header}>Oops!</h1>
      <p className={s.errorCommonText}>
        Sorry, an unexpected error has occurred.
      </p>
      <p className={s.errorText}>{error?.statusText || error?.message}</p>
    </div>
  )
}

export default ErrorPage
