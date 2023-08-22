import React from "react"

type Tprops = {
  errorText: string
}
const Error = ({ errorText }: Tprops) => {
  return <div> {errorText || "some error"} </div>
}

export default Error
