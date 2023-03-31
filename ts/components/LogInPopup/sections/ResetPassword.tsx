import React, { ReactElement } from 'react'
import { Formik, Form } from 'formik'
import Button from '../../Button/Button'
import { usePasswordReset } from '../../../hooks/passwordReset'
import TextField from '../../SummaryForm/utils/TextField'
import { ErrorField } from '../../../../utils/helpers'

interface IResetPasswordProps {
  handleSuccessReset: (message: string) => void
}

const ResetPassword = ({
  handleSuccessReset,
}: IResetPasswordProps): ReactElement => {
  const handlePasswordReset = (email: string) => {
    passwordReset(email)
    document.documentElement.classList.remove('-modal-open')
  }

  const { passwordReset, passwordResetErrorMessage, passwordResetIsLoading } =
    usePasswordReset({ onSuccessReset: handleSuccessReset })

  const getError = (field: string) => {
    if (passwordResetErrorMessage) {
      if (passwordResetErrorMessage.messages) {
        return passwordResetErrorMessage.messages.find(
          (error: ErrorField) => error.property_path === field
        )
      }
    }
  }

  return (
    <div className='c-logIn_content flex-column'>
      <div className='c-logIn_header -mb24'>
        <img
          className='d-none d-lg-block'
          src='/build/images/logo-black.svg'
          alt='kikfit logo'
        />
        <h4 className='t-title -f32 -wBold -cCinder -mt52 -mt40md -mb8'>
          Zresetuj hasło
        </h4>
        <p className='t-text -f16_28'>
          Na przypisany do konta użytkownika email, zostanie wysłany link za
          pomocą którego będziesz mógł zresetować hasło.
        </p>
      </div>
      <>
        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={(values) => {
            return handlePasswordReset(values.email)
          }}
        >
          {({ errors, touched }) => (
            <Form className='c-form d-flex flex-column flex-grow-1'>
              <div className='c-form_group d-flex flex-column flex-grow-1 -mr16 -mr0md'>
                <TextField
                  type='email'
                  id='email'
                  label='Email'
                  placeholder='Wpisz email'
                  error={errors.email || getError('email')}
                  touched={touched.email || false}
                />
              </div>
              <div className='c-form_row d-flex flex-column -fullWidth -mt56 -mt40md'>
                {passwordResetErrorMessage &&
                  passwordResetErrorMessage.message && (
                    <div className='-cErrorInfo -mb16'>
                      {passwordResetErrorMessage.message}
                    </div>
                  )}
                <Button
                  type='submit'
                  layout='primary'
                  loading={passwordResetIsLoading}
                >
                  Wyślij
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    </div>
  )
}

export default ResetPassword
