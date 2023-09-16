import React from "react"
import { img } from "../../assets/image"
import s from './Loading.module.scss'

const Loading = () => {

  const image = { backgroundImage: `url(${img.louder})` }
  return (
    <div className={s.louderContainer}>
      <div style={image} className={s.img}/>
      <h1 className={s.text}>Loading...</h1>
    </div>
  )
}

export default Loading
