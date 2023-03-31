import './LogInPopup.scss'
import React, { ReactElement, useEffect, useState } from 'react'
import LogIn from './sections/Login'
import ResetPassword from './sections/ResetPassword'
import SetNewPassword from './sections/SetNewPassword'
import SetPasswordAgain from './sections/SetPasswordAgain'

export interface IPayment {
    checkbox: boolean
}

interface ILogInPopupProps {
    onSuccessLogin: () => void
    onSuccessReset: (message: string) => void
    onClose: () => void
    resetProps?: { token: string; email: string }
}

export type TPopupMode =
    | 'login'
    | 'resetPassword'
    | 'setNewPassword'
    | 'setPasswordAgain'

const LogInPopup = ({
    onSuccessLogin,
    onSuccessReset,
    onClose,
    resetProps,
}: ILogInPopupProps): ReactElement => {
    const [popupMode, setPopupMode] = useState<TPopupMode>('login')
    const [email, setEmail] = useState<string>('')

    useEffect(() => {
        setPopupMode(resetProps ? 'setNewPassword' : 'login')
    }, [resetProps])

    const handleClose = () => {
        setPopupMode('login')

        if (popupMode === 'setNewPassword') {
            history.replaceState(null, '', '/')
        }

        onClose()
    }

    const handleSuccessReset = (message: string) => {
        onSuccessReset(message)
        setPopupMode('login')
    }

    return (
        <>
            <button
                className="c-closeButton -login -mb16"
                onClick={handleClose}
            >
                <span className="icon-x -s24 -cWhite"></span>
            </button>
            <section
                className="c-logIn d-flex flex-column -mt16md"
                data-testid="LogInPopup"
            >
                <div className="d-flex align-items-stretch -bgWhite">
                    <>
                        {popupMode === 'setPasswordAgain' ? (
                            // User from old page - set new password when logging for the first time
                            <SetPasswordAgain
                                handleSuccessReset={handleSuccessReset}
                                email={email}
                            />
                        ) : popupMode === 'resetPassword' ? (
                            // Generate new password link
                            <ResetPassword
                                handleSuccessReset={handleSuccessReset}
                            />
                        ) : popupMode === 'setNewPassword' ? (
                            // Enter new password
                            <SetNewPassword
                                resetProps={resetProps}
                                handleSuccessReset={handleSuccessReset}
                            />
                        ) : (
                            // Login
                            <LogIn
                                onSuccessLogin={onSuccessLogin}
                                setPopupMode={setPopupMode}
                                setEmail={setEmail}
                            />
                        )}
                    </>

                    <figure className="c-logIn_image d-none d-lg-flex align-items-center justify-content-center">
                        <img
                            src="/build/images/components/LogIn/logInImg.png"
                            alt="Meal photo"
                        />
                    </figure>
                </div>
            </section>
        </>
    )
}

export default LogInPopup
