import { useCallback, useLayoutEffect, useState } from "react"
import { TStatusCSS } from "../features/users/types"
import s from "../features/users/UsersList/UsersList.module.scss"

export const createTag = (
  res: object & { id: string | number },
  tagName: string,
) => [{ type: tagName, id: res.id }]

export const createTags = (res: number[] | string[], tagName: string) =>
  res.map((el) => ({ type: tagName, id: el }))

export const useDnDStyle = (arg: {
  idleStyle
  dragStartStyle
  dragOverStyle
  dragLeaveStyle
}) => {
  const { idleStyle, dragStartStyle, dragOverStyle, dragLeaveStyle } = arg
  const [dragStatus, setDragStatus] = useState<TStatusCSS>("idle")
  const changeStatus = useCallback(
    (status: TStatusCSS) => setDragStatus((prev) => status),
    [],
  )
  let DragAriaStyle: TStatusCSS
  if (dragStatus === "dragOver") {
    DragAriaStyle = `${idleStyle} ${dragOverStyle}`
  } else if (dragStatus === "dragLeave") {
    DragAriaStyle = `${idleStyle} ${dragLeaveStyle}`
  } else {
    DragAriaStyle =
      dragStatus === "dragStart" ? `${idleStyle} ${dragStartStyle}` : s.delAria
  }
  return [DragAriaStyle, changeStatus]
}

export const useIdentifyScreen = () => {
  const w = window.innerWidth
  const h = window.innerHeight
  const [identifyScreen, setIdentifyScreen] = useState<
    "vertical" | "horizontal"
  >((w < h || w <= 1000)  ? "vertical" : "horizontal")

  useLayoutEffect(() => {
    const handleResize = (event) => {
      const w = event.target.innerWidth
      const h = event.target.innerHeight
      setIdentifyScreen((prev) =>
        (w < h || w <= 1000) ? "vertical" : "horizontal",
      )
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  return identifyScreen
}
