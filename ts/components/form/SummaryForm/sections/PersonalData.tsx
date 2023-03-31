import React, { ReactElement } from 'react'
import { Form, Formik } from 'formik'
import Button from '../../../components/Button/Button'
import { setPersonalData } from '../../../redux/user-slice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { useIsLoggedIn } from '../../../hooks/useIsLoggedIn'
import { IPersonalData, useRegister } from '../../../hooks/register'
import { useLogin } from '../../../hooks/login'
import { ErrorField } from 'utils/helpers'
import { isTabletRes } from '../../../../utils/helpers'
import { PersonalDataWithPassword } from '../../../redux/user-slice/index'
import TextField from '../utils/TextField'
import PhoneField, { validatePhone } from '../utils/PhoneField'
import PasswordField from '../utils/PasswordField'
import TippyInfo from '../../../../creator/components/TippyInfo/TippyInfo'
import Quote from '../../Quote/Quote'
interface IPersonalDataProps {
    onSubmit: () => void
}

const PersonalDataForm = ({ onSubmit }: IPersonalDataProps): ReactElement => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useIsLoggedIn()
    const user = useAppSelector((state) => state.user)

    const { personalData } = user

    const { login, loginErrorMessage, loginIsLoading } = useLogin({
        onSuccessLogin: onSubmit,
    })

    const onSuccessRegistration = (values: IPersonalData) => {
        const { email, password } = values
        login(email, password)
        dispatch(setPersonalData(values))
    }

    const { register, registrationError, registrationIsLoading } = useRegister({
        onSuccessRegistration,
    })

    const submitPersonalData = (values: PersonalDataWithPassword) => {
        if (!isLoggedIn) {
            const { firstName, lastName, phone, email, password } = values

            register({
                name: firstName || '',
                surname: lastName || '',
                email: email || '',
                phone: phone || '',
                password: password || '',
            })
        } else {
            dispatch(setPersonalData(values))
        }
    }

    const initialFormValues: PersonalDataWithPassword = {
        email: personalData?.email || '',
        firstName: personalData?.firstName || '',
        lastName: personalData?.lastName || '',
        phone: personalData?.phone || '',
        password: personalData?.password || '',
    }

    const getError = (field: string) => {
        return registrationError?.messages?.find(
            (error: ErrorField) => error.property_path === field
        )
    }

    const errorMessage =
        loginErrorMessage?.message || registrationError?.message

    const validate = (values: PersonalDataWithPassword) => {
        const errors: PersonalDataWithPassword = {}

        if (values.phone) {
            const phoneError = validatePhone(values.phone)
            if (phoneError) errors.phone = phoneError
        }

        return errors
    }

    return (
        <Formik
            initialValues={initialFormValues}
            enableReinitialize
            onSubmit={submitPersonalData}
            isInitialValid={false}
            validateOnBlur={true}
            validate={validate}
        >
            {({ isValid, values, errors, touched }) => (
                <Form className="c-form d-flex flex-column">
                    <div className="c-form_row d-flex flex-column flex-lg-row">
                        <div className="c-form_group d-flex flex-column -mr16 -mr0md">
                            <TextField
                                id="firstName"
                                label="Imię"
                                placeholder="Wpisz imię"
                                min={3}
                                error={
                                    errors.firstName || getError('firstName')
                                }
                                touched={touched.firstName || false}
                            />
                        </div>
                        <div className="c-form_group d-flex flex-column -mt24md">
                            <TextField
                                id="lastName"
                                min={3}
                                label="Nazwisko"
                                placeholder="Wpisz nazwisko"
                                error={errors.lastName || getError('lastName')}
                                touched={touched.lastName || false}
                            />
                        </div>
                    </div>
                    <div className="c-form_row d-flex -fullWidth -mt24">
                        <div className="c-form_group d-flex flex-column -fullWidth">
                            <TextField
                                id="email"
                                label="Adres e-mail"
                                type="text"
                                placeholder="np. imię@adres.pl"
                                error={errors.email || getError('email')}
                                touched={touched.email || false}
                            />
                        </div>
                    </div>
                    <div className="c-form_row d-flex -fullWidth -mt24">
                        <div className="c-form_group d-flex flex-column -fullWidth">
                            <PhoneField
                                id="phone"
                                label="Numer kontaktowy"
                                error={errors.phone || getError('phone')}
                                value={values.phone || ''}
                                touched={touched.phone || false}
                            />
                        </div>
                    </div>
                    {!isLoggedIn && (
                        <>
                            <p className="t-text -f16 -cCinder -wBold -mt40 -mb24">
                                Ustaw hasło do konta
                                {isTabletRes() && (
                                    <TippyInfo
                                        text="Składając zamówienie zakładasz również konto użytkownika, dzięki któremu możesz w dowolnym momencie dokonywać zmian w swoim zamówieniu."
                                        placement="top"
                                    >
                                        <span className="icon-exclamation -s16 c-icon"></span>
                                    </TippyInfo>
                                )}
                            </p>
                            <div className="c-form_quoteContainer d-none d-lg-block -fullWidth -mb24">
                                <Quote
                                    name="Filip"
                                    position="Manager ds. Cateringu"
                                    text="Składając zamówienie zakładasz również konto użytkownika, dzięki któremu możesz w dowolnym momencie dokonywać zmian w swoim zamówieniu."
                                    alt={false}
                                    image="/build/images/mapPage/avatar.jpg"
                                    department="catering"
                                />
                            </div>
                            <div className="c-form_row d-flex flex-column -fullWidth">
                                <PasswordField
                                    id="password"
                                    label="Wpisz hasło"
                                    error={
                                        errors.password || getError('password')
                                    }
                                    touched={touched.password || false}
                                    infoText="min. 8 znaków"
                                />
                            </div>
                        </>
                    )}
                    <div className="c-form_row">
                        {errorMessage && (
                            <div className="-cErrorInfo -pt16">
                                {errorMessage}
                            </div>
                        )}

                        <Button
                            type="submit"
                            layout="primary"
                            css="c-stepContainer_button -mt32 -mt24md"
                            disabled={!isValid}
                            loading={registrationIsLoading || loginIsLoading}
                        >
                            Kontynuuj
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default PersonalDataForm
