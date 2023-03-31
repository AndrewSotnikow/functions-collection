import { usePasswordReset } from '../../../../creator/hooks/passwordReset'
import React, { ReactElement, useState } from 'react'
import Button from '../../Button/Button'

interface ISetPasswordAgainProps {
  handleSuccessReset: (message: string) => void
  email: string
}

const SetPasswordAgain = ({
  email,
  handleSuccessReset,
}: ISetPasswordAgainProps): ReactElement => {
  const handlePasswordReset = () => {
    passwordSet(email)
  }
  const [mailSent, setMailSent] = useState(false)
  const { passwordSet, passwordResetErrorMessage, passwordSetIsLoading } =
    usePasswordReset({ onSuccessReset: handleSuccessReset })

  return (
    <div className='c-logIn_content flex-column'>
      <div className='c-logIn_header -mb16'>
        <img
          className='d-none d-lg-block'
          src='/build/images/logo-black.svg'
          alt='kikfit logo'
        />

        <h4 className='t-title -f32 -f24md -wBold -cCinder -mt52 -mt26md'>
          Ustaw hasło ponownie
        </h4>
      </div>

      <p className='t-text -f16_28 -f14md -tCenterMd'>
        Zmieniamy się dla Ciebie! <br />
        Migracja strony wymaga jednak ponownego ustawienia hasła dla Twojego
        konta. Kliknij poniżej, by otrzymać maila z linkiem do ustawienia nowego
        hasła.
      </p>

      <div className='c-logIn_btnWrapper -mt200 -mt94md'>
        {passwordResetErrorMessage && passwordResetErrorMessage.message && (
          <div className='-cErrorInfo -mb16'>
            {passwordResetErrorMessage.message}
          </div>
        )}
        <Button
          type='button'
          css='-fullWidth'
          layout='primary'
          onClick={() => {
            handlePasswordReset()
            setMailSent(true)
          }}
          loading={passwordSetIsLoading}
        >
          Wyślij mail z linkiem
        </Button>
        {mailSent && (
          <p className='t-text -f14 -mt24 -fullWidth -tCenter'>
            <span>Mail nie dotarł? </span>
            <Button type='link' layout='primary' onClick={handlePasswordReset}>
              Wyślij mail z linkiem
            </Button>
          </p>
        )}
      </div>
    </div>
  )
}

export default SetPasswordAgain
