import React from "react"
import { createPortal } from "react-dom"
import s from "./Modal.module.scss"
import { TUser } from "../../features/users/types"
import { FormikHelpers, useFormik } from "formik"
import {
  createFieldName,
  initiateValues,
  randomId,
  validate,
} from "./utilities"
import { actionStatus, fieldsType, TUserProps } from "./types"

const ModalUser = ({ showModal, closeModal, user, onSave }: TUserProps) => {
  const title = user ? "Изменить" : "Добавить"

  const formik = useFormik<fieldsType>({
    initialValues: initiateValues(user),
    validate,
    onSubmit: async (
      values: Omit<TUser, "id">,
      { setSubmitting, resetForm, setStatus }: FormikHelpers<Omit<TUser, "id">>,
    ) => {
      try {
        //throw Error()
        await onSave({ ...values, id: randomId() })
        setStatus(actionStatus.ok)
        setTimeout(() => {
          resetForm()
          closeModal()
        }, 7000)
        setSubmitting(false)
      } catch (e) {
        setStatus(actionStatus.formError)
        setTimeout(() => setStatus(null), 7000)
      }
    },
  })
  const handleClick = (e) => {
    formik.setStatus(null)
    closeModal()
  }
  return (
    <>
      {showModal &&
        createPortal(
          <>
            <div className={s.modalOutside} onClick={handleClick}></div>
            <div className={s.modalContainer}>
              {title}
              {formik.status == actionStatus.ok ? (
                <div>{formik.status}</div>
              ) : (
                <>
                  {formik.status == actionStatus.formError && (
                    <div>{formik.status}</div>
                  )}
                  <form onSubmit={formik.handleSubmit}>
                    {Object.keys(formik.initialValues).map((el) => (
                      <MyTextField el={el} formik={formik} key={el} />
                    ))}
                    <button type="submit">Submit</button>
                  </form>
                </>
              )}
            </div>
          </>,
          document.body,
        )}
    </>
  )
}

export default ModalUser

const MyTextField = ({ el, formik }: Tfield) => {
  return (
    <>
      <label htmlFor={el}>{createFieldName(el)}</label>
      <input
        id={el}
        name={el}
        placeholder={el}
        onChange={formik.handleChange}
        value={formik.values[el]}
      />

      {formik.errors[el] && formik.touched[el] && (
        <div>{formik.errors[el]}</div>
      )}
    </>
  )
}
