import { cookieStorage } from '../../ts/helpers/helpers'

const cookiePopup = () => {
    const cookiePopup: HTMLElement | null =
        document.getElementById('cookiePopup')
    const acceptBtn: HTMLElement | null = document.getElementById('acceptBtn')
    const cookieName = 'KikfitCookies'
    const today = new Date()
    const expireDate = new Date(today)
    expireDate.setDate(expireDate.getDate() + 364)

    const showPopup = () => !cookieStorage.getItem(cookieName)
    const saveToStorage = () =>
        cookieStorage.setItem(cookieName, true, expireDate)

    const acceptFn = () => {
        saveToStorage()
        cookiePopup?.classList.remove('-active')
        setTimeout(() => {
            cookiePopup?.classList.remove('-visible')
        }, 1000)
    }

    acceptBtn?.addEventListener('click', acceptFn)

    if (showPopup()) {
        cookiePopup?.classList.add('-active')
        cookiePopup?.classList.add('-visible')
    }
}

window.addEventListener('load', () => cookiePopup())

export { cookieStorage }
