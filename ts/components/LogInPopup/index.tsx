import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import { USER_PROFILE_PATH } from '../../../utils/constants'
import Toast from '../../../static/components/toast'
import Loader from '../Loader/Loader'
import { getValidLoginToken, getParameter } from '../../../utils/helpers'
import { toggleModal, handleModalClosing } from '../../../static/modals/modals'

const LoginModal = async () => {
    const profileButtons =
        document.querySelectorAll<HTMLAnchorElement>('.c-profile')
    handleModalClosing('logInModal')

    // Login
    const token = await getValidLoginToken()

    if (token) {
        profileButtons.forEach((profile) => (profile.href = USER_PROFILE_PATH))
    } else {
        profileButtons.forEach((profile) => {
            profile.addEventListener('click', () => toggleModal('logInModal'))
        })
    }

    const handleLoginSuccess = () => {
        window.location.href = USER_PROFILE_PATH
        toggleModal('logInModal')
    }

    // Reset password
    const resetParam = getParameter('reset')
    const tokenParam = getParameter('token')
    const emailParam = getParameter('email')

    let popupResetProps

    if (resetParam && tokenParam && emailParam) {
        popupResetProps = { email: emailParam, token: tokenParam }
        toggleModal('logInModal')
    }

    const handlePasswordResetSuccess = (message: string) => {
        Toast(message, 'envelope').toastOpen()
        toggleModal('logInModal')
        window.history.replaceState(null, '', '/')
    }

    // https://reactjs.org/docs/code-splitting.html#reactlazy
    const LogInPopup = React.lazy(() => import('./LogInPopup'))
    const loginContainer = document.getElementById('logInContainer')

    loginContainer &&
        ReactDOM.render(
            <Provider store={store}>
                <Suspense fallback={<Loader />}>
                    <LogInPopup
                        onSuccessLogin={handleLoginSuccess}
                        onSuccessReset={(message) =>
                            handlePasswordResetSuccess(message)
                        }
                        resetProps={popupResetProps}
                        onClose={() => toggleModal('logInModal')}
                    />
                </Suspense>
            </Provider>,
            loginContainer
        )
}

window.addEventListener('load', () => LoginModal())
