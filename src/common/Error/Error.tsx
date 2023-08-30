import React, { memo } from "react"

type Tprops = {
  errorText: string
}
const Error = memo(({ errorText }: Tprops) => {
  return <div> {errorText || "some error"} </div>
})

export default Error
