import React, { memo } from "react"
import { createPortal } from "react-dom"
import s from "./Modal.module.scss"

import { FormikHelpers, useFormik } from "formik"
import {
  createFieldName,
  initiateValues,
  randomId,
  validate,
} from "./utilities"
import { actionStatus, fieldsType, TUserProps } from "./types"
import { TUser } from "../../features/users"

const ModalUser = memo(
  ({ showModal, closeModal, user, onSave }: TUserProps) => {
    const title = user ? "Изменить" : "Добавить"
    const formik = useFormik<fieldsType>({
      initialValues: initiateValues(user),
      validate,
      onSubmit: async (
        values: Omit<TUser, "id">,
        {
          setSubmitting,
          resetForm,
          setStatus,
        }: FormikHelpers<Omit<TUser, "id">>,
      ) => {
        try {
          //throw Error()
          setStatus(actionStatus.loading)
          await onSave({ ...values, id: randomId() })
          setStatus(actionStatus.ok)
          setTimeout(() => {
            resetForm()
            closeModal()
          }, 4000)
          setSubmitting(false)
        } catch (e) {
          setStatus(actionStatus.formError)
          setTimeout(() => setStatus(null), 7000)
        }
      },
    })

    const handleClick = () => {
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
                {formik.status === actionStatus.ok ? (
                  <div>{formik.status}</div>
                ) : (
                  <>
                    {formik.status === actionStatus.formError && (
                      <div>{formik.status}</div>
                    )}
                    <form onSubmit={formik.handleSubmit}>
                      {Object.keys(formik.initialValues).map((el) => (
                        <div key={el}>
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
                        </div>
                      ))}
                      <button
                        type="submit"
                        disabled={formik.status === actionStatus.loading}
                      >
                        Submit
                      </button>
                    </form>
                  </>
                )}
              </div>
            </>,
            document.body,
          )}
      </>
    )
  },
)

export default ModalUser
