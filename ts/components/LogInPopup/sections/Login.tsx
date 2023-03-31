import React, { ReactElement } from 'react'
import { Formik, Form } from 'formik'
import Button from '../../Button/Button'
import { useLogin } from '../../../hooks/login'
import TextField from '../../SummaryForm/utils/TextField'
import PasswordField from '../../SummaryForm/utils/PasswordField'
import { TPopupMode } from '../LogInPopup'

interface ILogInProps {
  onSuccessLogin: () => void
  setPopupMode: (mode: TPopupMode) => void
  setEmail: (email: string) => void
}

const LogIn = ({
  onSuccessLogin,
  setPopupMode,
  setEmail,
}: ILogInProps): ReactElement => {
  const onNoPasswordResponse = () => {
    setPopupMode('setPasswordAgain')
  }

  const { login, loginErrorMessage, loginIsLoading } = useLogin({
    onSuccessLogin,
    onNoPasswordResponse,
  })

  const handleLogIn = (username: string, password: string) => {
    login(username, password)
    setEmail(username)
    document.documentElement.classList.remove('-modal-open')
  }

  return (
    <div className='c-logIn_content flex-column -loginPopup'>
      <div className='c-logIn_header -mb48 -mb32md'>
        <img
          className='d-none d-lg-block'
          src='/build/images/logo-black.svg'
          alt='kikfit logo'
        />
        <h4 className='t-title -f32 -wBold -cCinder -mt52 -mt26md'>
          Logowanie
        </h4>
      </div>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={(values) => handleLogIn(values.username, values.password)}
      >
        {({ errors, touched }) => (
          <Form className='c-form d-flex flex-column'>
            <div className='c-form_group d-flex flex-column -mr16 -mr0md'>
              <TextField
                id='username'
                label='Login/Email'
                placeholder='Wpisz login lub email'
                error={errors.username}
                touched={touched.username || false}
              />
            </div>
            <div className='c-form_group d-flex flex-column -mt16'>
              <PasswordField
                id='password'
                label='Hasło'
                touched={touched.password || false}
                error={errors.password}
              />
            </div>

            <div className='c-form_row d-flex justify-content-end align-items-center -mt8'>
              <Button
                type='link'
                layout='secondary'
                css='-mt4md'
                onClick={() => setPopupMode('resetPassword')}
              >
                Nie pamiętam hasła
              </Button>
            </div>

            <div className='c-form_row c-loginSubmitBtnWrapper d-flex flex-column -fullWidth -mt56 -mt40md'>
              <div className='-cErrorInfo -mb10 -tCenter'>
                {loginErrorMessage !== null
                  ? 'Niepoprawny login lub hasło.'
                  : ' '}
              </div>

              <Button type='submit' layout='primary' loading={loginIsLoading}>
                Zaloguj się
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LogIn
