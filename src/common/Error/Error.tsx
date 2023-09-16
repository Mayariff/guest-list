import React, { memo } from "react"
import s from "./Error.module.scss"
import { img } from "../../assets/image"

type Tprops = {
  errorText: string
}
const Error = memo(({ errorText }: Tprops) => {
  const image = { backgroundImage: `url(${img.error})` }

  return (
    <div className={s.errorContainer}>
      <div style={image} className={s.img} />
      <h1 className={s.text}>{errorText || "Some error"}</h1>
    </div>
  )
})

export default Error
