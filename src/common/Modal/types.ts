import { TUser } from "../../features/users";


export enum actionStatus {
  ok = "Success",
  formError = "Sorry. Form not submitted",
  commonError = "Something went wrong",
  loading = "Loading",
}

//del Modal
export type TDelProps = {
  showModal: boolean
  onDel: (id?: number) => void
  closeModal: () => void
  user: TUser
}
//user Modal
export type TUserProps = {
  showModal: boolean
  onSave: (user: Partial<TUser>) => void
  closeModal: () => void
  user?: Partial<TUser>
}

export type fieldsType = Exclude<keyof TUser, "id">

export type Tfield = {
  el: fieldsType
  formik: unknown
}
