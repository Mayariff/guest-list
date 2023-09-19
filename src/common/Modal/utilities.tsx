import { TUser } from "../../features/users"

export const initiateValues = (user?: Partial<TUser>) => ({
  first_name: user ? user.first_name : "",
  last_name: user ? user.last_name : "",
  email: user ? user.email : "",
  avatar: user ? user.avatar : "",
})

export const validate = (values: Partial<TUser>) => {
  const errors: any = {}
  if (!values.email) {
    errors.email = "Required"
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim())
  ) {
    errors.email = "Invalid email address"
  }
  if (!values.first_name) {
    errors.first_name = "Required"
  } else if (!/[a-zA-Zа-яА-ЯЁё]$/i.test(values.first_name.trim())) {
    errors.first_name = "Use only EN or RU letters"
  } else if (values.first_name.length > 15) {
    errors.first_name = "Too long string"
  }
  if (!values.last_name) {
    errors.last_name = "Required"
  } else if (!/[a-zA-Zа-яА-ЯЁё]$/i.test(values.last_name.trim())) {
    errors.last_name = "Use only EN or RU letters"
  } else if (values.last_name.length > 15) {
    errors.last_name = "Too long string"
  }
  if (
    values.avatar &&
    !/^https?:\S+.(?:jpe?g|png)$/i.test(values.avatar.trim()) &&
    values.avatar.length > 0
  ) {
    errors.avatar = "Example: https://local:3000.jpeg (.jpg/.png)"
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

export const transformToCapitalize = (arg: string) => {
  let str = arg.trim()
  if (str.length > 1) {
    return str[0].toUpperCase() + str.substring(1, str.length)
  } else {
    return str.toUpperCase()
  }
}
