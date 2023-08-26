import { TUser } from "../../features/users/types"

export const initiateValues = (user?: TUser) => ({
  first_name: user ? user.first_name : "",
  last_name: user ? user.last_name : "",
  email: user ? user.email : "",
  avatar: user ? user.avatar : "",
})

export const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = "Required"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address"
  }
  if (!values.first_name) {
    errors.first_name = "Required"
  } else if (!/[a-zA-Zа-яА-ЯЁё]$/i.test(values.first_name)) {
    errors.first_name = "Use only EN or RU letters"
  } else if (values.first_name.length > 15) {
    errors.first_name = "Too long string"
  }
  if (!values.last_name) {
    errors.last_name = "Required"
  } else if (!/[a-zA-Zа-яА-ЯЁё]$/i.test(values.last_name)) {
    errors.last_name = "Use only EN or RU letters"
  } else if (values.last_name.length > 15) {
    errors.last_name = "Too long string"
  }
  if (
    !/^https?:\S+.(?:jpe?g|png)$/i.test(values.avatar) &&
    values.avatar.length > 0
  ) {
    errors.avatar = "Link must start with http/https and end with jpeg/jpg/png"
  }
  return errors
}

export const createFieldName = (str: string) => {
  return str
    .replace(/(^|\s)\S/g, function (a) {
      return a.toUpperCase()
    })
    .replace("_", " ")
}

export const randomId = () => {
  return Math.floor(Math.random() * (100000000 - 20 + 1) + 20)
}
