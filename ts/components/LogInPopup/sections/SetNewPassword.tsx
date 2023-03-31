import React, { ReactElement } from 'react'
import { Formik, Form } from 'formik'
import Button from '../../Button/Button'
import { usePasswordReset } from '../../../hooks/passwordReset'
import { ErrorField } from '../../../../utils/helpers'
import PasswordField from '../../SummaryForm/utils/PasswordField'

interface ISetNewPasswordProps {
  resetProps?: { token: string; email: string }
  handleSuccessReset: (message: string) => void
}

const SetNewPassword = ({
  resetProps,
  handleSuccessReset,
}: ISetNewPasswordProps): ReactElement => {
  const handleNewPasswordReset = (newPassword: string) => {
    if (!resetProps) return
    setNewPassword(resetProps.token, resetProps.email, newPassword)
    document.documentElement.classList.remove('-modal-open')
  }

  const {
    setNewPassword,
    passwordResetErrorMessage,
    newPasswordResetIsLoading,
  } = usePasswordReset({ onSuccessReset: handleSuccessReset })

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
          Ustaw nowe hasło
        </h4>
        <p className='t-text -f16_28'>Stwórz nowe hasło do swojego konta</p>
      </div>
      <Formik
        initialValues={{
          newPassword: '',
        }}
        onSubmit={(values) => handleNewPasswordReset(values.newPassword)}
      >
        {({ errors, touched }) => (
          <Form className='c-form d-flex flex-column flex-grow-1'>
            <div className='c-form_group d-flex flex-column flex-grow-1 -mr16 -mr0md'>
              <PasswordField
                id='newPassword'
                label='Hasło'
                error={errors.newPassword || getError('newPassword')}
                touched={touched.newPassword || false}
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
                loading={newPasswordResetIsLoading}
              >
                Zapisz
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SetNewPassword
