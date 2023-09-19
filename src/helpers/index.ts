import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { TStatusCSS } from "../features/users/types";
import s from "../features/users/UsersList/UsersList.module.scss";

//for tags in RTK Query
export const createTag = (
  res: object & { id: string | number },
  tagName: string,
) => [{ type: tagName, id: res.id }]

export const createTags = (res: number[] | string[], tagName: string) =>
  res.map((el) => ({ type: tagName, id: el }))

// styles for DND elements
type argT = {
  idleStyled: string
  ragStartStyle: string
  dragOverStyle: string
  dragLeaveStyle: string
}
export const useDnDStyle = (arg: argT) => {
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

//for determining screen proportions for layout css
export const useIdentifyScreen = () => {
  const w = window.innerWidth
  const h = window.innerHeight
  const [identifyScreen, setIdentifyScreen] = useState<
    "vertical" | "horizontal"
  >(w < h || w <= 1000 ? "vertical" : "horizontal")

  useLayoutEffect(() => {
    const handleResize = (event) => {
      const w = event.target.innerWidth
      const h = event.target.innerHeight
      setIdentifyScreen((prev) =>
        w < h || w <= 1000 ? "vertical" : "horizontal",
      )
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  return identifyScreen
}

//for determining click outside current El

export const useOutsideClick = (fn: () => void) => {
  const elRef = useRef(null)
  const count = useRef(null)
  useEffect(() => {
    const onClick = (e) => {
      if (count.current > 0 && !elRef.current.contains(e.target)) {
        fn()
      }
      count.current++
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])
  return elRef
}
