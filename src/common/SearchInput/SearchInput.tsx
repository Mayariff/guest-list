import React, { ChangeEventHandler, memo, useEffect, useState } from "react"
import { useDebounce } from "./utilities"
import s from "./SearchInput.module.scss"

type TProps = {
  onChangeHandler: (value: string | number) => void
}

const SearchInput = memo(({ onChangeHandler }: TProps) => {
  const [valueInput, setValueInput] = useState<string>("")
  const value = useDebounce(valueInput)
  const changeInputText:ChangeEventHandler<HTMLInputElement> = (e) => setValueInput(e.currentTarget.value)
  useEffect(() => onChangeHandler(value), [value, onChangeHandler])

  return (
    <input
      type={"text"}
      value={valueInput}
      onChange={changeInputText}
      className={s.input}
      placeholder={"Search"}
    />
  )
})

export default SearchInput
