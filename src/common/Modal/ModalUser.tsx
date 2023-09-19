import React, { memo, MouseEventHandler } from "react"
import { createPortal } from "react-dom"
import s from "./Modal.module.scss"

import { FormikHelpers, useFormik } from "formik"
import {
  createFieldName,
  initiateValues,
  randomId,
  transformToCapitalize,
  validate,
} from "./utilities"
import { actionStatus, TUserProps } from "./types"
import { TUser } from "../../features/users"
import { img } from "../../assets/image"
import { useNavigate } from "react-router"
import { PATH } from "../../app/routing"

const ModalUser = memo(
  ({ showModal, closeModal, user, onSave }: TUserProps) => {
    const title = user ? "Edit User" : "Add User"
    const navigate = useNavigate()
    const formik = useFormik<Partial<TUser>>({
      initialValues: initiateValues(user),
      validate,
      onSubmit: async (
        values: Partial<TUser>,
        { setSubmitting, resetForm, setStatus }: FormikHelpers<Partial<TUser>>,
      ) => {
        try {
          //throw Error();
          setStatus(actionStatus.loading)
          const arg = {
            id: user?.id ? user?.id : randomId(),
            email: values.email?.trim(),
            first_name:
              values?.first_name && transformToCapitalize(values.first_name),
            last_name:
              values?.last_name && transformToCapitalize(values.last_name),
            avatar: values.avatar?.trim(),
          }
          await onSave(arg)

          setStatus(actionStatus.ok)
          setTimeout(() => {
            resetForm()
            closeModal()
          }, 2000)
          setSubmitting(false)
          navigate(PATH.users + `/${arg.id}`)
        } catch (e) {
          setStatus(actionStatus.formError)
          setTimeout(() => setStatus(null), 7000)
        }
      },
    })

    const handleClick = () => {
      formik.resetForm()
      closeModal()
    }
    const closeHandler: MouseEventHandler<HTMLElement> = (e) => {
      formik.resetForm()
      closeModal()
    }
    //css
    const inputStyle = (el: keyof Partial<TUser>) =>
      formik.errors[el] && formik.touched[el]
        ? `${s.fieldInput} ${s.error}`
        : s.fieldInput
    const imageSuccess = { backgroundImage: `url(${img.userCheck})` }
    return (
      <>
        {showModal &&
          createPortal(
            <>
              <div className={s.modalOutside} onClick={handleClick}></div>
              <div className={s.modalContainer}>
                {formik.status === actionStatus.ok ? (
                  <div className={s.messageOk} style={imageSuccess}>
                    {formik.status}
                  </div>
                ) : (
                  <>
                    {formik.status === actionStatus.formError ? (
                      <div className={s.messageError}>{formik.status}</div>
                    ) : (
                      <div className={s.title}>{title}</div>
                    )}
                    <form onSubmit={formik.handleSubmit} className={s.form}>
                      <div className={s.formFields}>
                        {Object.keys(formik.initialValues).map((el) => (
                          <div key={el} className={s.field}>
                            <label htmlFor={el} className={s.label}>
                              {createFieldName(el)} :
                            </label>
                            <input
                              className={inputStyle(el as keyof Partial<TUser>)}
                              id={el}
                              name={el}
                              placeholder={el}
                              onChange={formik.handleChange}
                              value={formik.values[el as keyof Partial<TUser>]}
                            />

                            {formik.errors[el as keyof Partial<TUser>] &&
                              formik.touched[el as keyof Partial<TUser>] && (
                                <div className={s.fieldError}>
                                  {formik.errors[el as keyof Partial<TUser>]}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                      <div className={s.btnAria}>
                        <button
                          className={s.btn}
                          type="submit"
                          disabled={formik.status === actionStatus.loading}
                        >
                          {user ? "Edit" : "+ Add"}
                        </button>
                        <button
                          className={s.btn}
                          disabled={formik.status === actionStatus.loading}
                          onClick={closeHandler}
                        >
                          Close
                        </button>
                      </div>
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
