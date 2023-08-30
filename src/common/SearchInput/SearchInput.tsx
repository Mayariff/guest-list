import React, { memo, useEffect, useState } from "react"
import { useDebounce } from "./utilities"

type TProps = {
  onChangeHandler: (value: string) => void
}

const SearchInput = memo(({ onChangeHandler }: TProps) => {
  const [valueInput, setValueInput] = useState<string>("")
  const value = useDebounce(valueInput)
  const changeInputText = (e) => setValueInput(e.currentTarget.value)
  useEffect(() => onChangeHandler(value), [value, onChangeHandler])

  return (
    <div>
      <input type={"text"} value={valueInput} onChange={changeInputText} />
    </div>
  )
})

export default SearchInput
