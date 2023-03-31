const newsletterValidation = (component: string) => {
    const email = <HTMLInputElement | null>(
        document.getElementById(`email_${component}`)
    )
    const submitButton: HTMLElement | null = document.getElementById(
        `submitButton_${component}`
    )
    const newsletterCheckbox: HTMLElement | null = document.getElementById(
        `checkbox_${component}`
    )
    const newsletterEmailInput = <HTMLInputElement>(
        document.getElementById(`email_${component}`)
    )
    const policyErrorMsg = document.querySelector(
        `.c-policyErrorMsg_${component}`
    )
    const emailErrorMsg = document.querySelector(
        `.c-emailErrorMsg_${component}`
    )
    const successMsg = document.querySelector(`.c-successMsg_${component}`)

    let isRulesAccepted = false

    const subscribeToNewsletter = async (
        email: string,
        policy: boolean
    ): Promise<void> => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ['email']: email, ['policy']: policy }),
        }

        const url = `${process.env.KIKFIT_PROVIDER_URL}newsletter`

        try {
            // eslint-disable-next-line compat/compat
            const response = await fetch(url, requestOptions)

            if (response.status !== 200) {
                const data = await response.json()
                let errorMessage = ''
                const messages = data.errors

                if (response.status === 409) {
                    successMsg &&
                        (successMsg.textContent =
                            'Twój email jest już w naszej bazie danych')
                    emailErrorMsg && (emailErrorMsg.textContent = '')
                    policyErrorMsg && (policyErrorMsg.textContent = '')

                    return
                }

                messages.forEach(
                    (element: { message: string; property_path: string }) => {
                        if (element.property_path === 'email') {
                            errorMessage += `${element.message} `
                        }
                    }
                )
                emailErrorMsg && (emailErrorMsg.textContent = errorMessage)

                throw Error
            }

            successMsg &&
                (successMsg.textContent =
                    'Twój email został zapisany w naszej bazie danych!')
            emailErrorMsg && (emailErrorMsg.textContent = '')
            policyErrorMsg && (policyErrorMsg.textContent = '')
        } catch (err) {
            return
        }
    }

    newsletterCheckbox?.addEventListener('click', () => {
        isRulesAccepted = !isRulesAccepted
        policyErrorMsg && (policyErrorMsg.textContent = '')
    })
    submitButton?.addEventListener('click', (e) => {
        e.preventDefault()

        if (isRulesAccepted) {
            subscribeToNewsletter(newsletterEmailInput.value, isRulesAccepted)
            if (email) {
                email.value = ''
            }
            return
        }
        policyErrorMsg &&
            (policyErrorMsg.textContent =
                'Musisz zaakceptować regulamin przed zapisaniem się do newslettera')
    })
}

window.addEventListener('load', () => {
    newsletterValidation('newsletter_modal')
    newsletterValidation('newsletter_section')
})
