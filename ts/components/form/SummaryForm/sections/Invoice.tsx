import React, { ReactElement } from 'react'
import { Form, Formik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { InvoiceData } from '../../../redux/api-slice/types'
import { setInvoiceData } from '../../../redux/user-slice'
import Button from '../../../components/Button/Button'
import PostCodeField, { validatePostCode } from '../utils/PostCodeField'
import TextField from '../utils/TextField'
import PhoneField, { validatePhone } from '../utils/PhoneField'

interface IInvoiceFormProps {
    onSubmit: () => void
}

const InvoiceForm = ({ onSubmit }: IInvoiceFormProps): ReactElement => {
    const dispatch = useAppDispatch()
    const userInvoiceData = useAppSelector((state) => state.user.invoiceData)

    const submitInvoice = (values: InvoiceData) => {
        const invoiceValues = values
        if (invoiceValues?.phoneNumber === '48') {
            invoiceValues.phoneNumber = ''
        }
        dispatch(setInvoiceData(invoiceValues))
        onSubmit()
    }

    const initialFormValues: InvoiceData = {
        city: userInvoiceData?.city || '',
        companyName: userInvoiceData?.companyName || '',
        email: userInvoiceData?.email || '',
        nip: userInvoiceData?.nip || '',
        phoneNumber: userInvoiceData?.phoneNumber || '',
        postalCode: userInvoiceData?.postalCode || '',
        regon: userInvoiceData?.regon || '',
        street: userInvoiceData?.street || '',
    }

    const validate = (values: NonNullable<InvoiceData>) => {
        const errors: InvoiceData = {}

        if (values.postalCode) {
            const postCodeError = validatePostCode(values.postalCode)
            if (postCodeError) errors.postalCode = postCodeError
        }

        if (values.phoneNumber) {
            if (values.phoneNumber !== '48' && values.phoneNumber !== '') {
                const phoneError = validatePhone(values.phoneNumber)
                if (phoneError) errors.phoneNumber = phoneError
            }
        }

        return errors
    }

    return (
        <Formik
            initialValues={initialFormValues}
            onSubmit={submitInvoice}
            validateOnMount
            enableReinitialize
            validate={validate}
            isInitialValid={false}
            validateOnBlur={true}
        >
            {({ isValid, values, errors, touched }) => (
                <Form className="c-form d-flex flex-column">
                    <p className="c-invoice_title t-text -f20 -f18md -wBold -mb24 -pb24">
                        Dane do faktury
                    </p>
                    <div className="c-form_row d-flex -fullWidth">
                        <div className="c-form_group d-flex flex-column -fullWidth">
                            <TextField
                                id="companyName"
                                label="Nazwa Firmy"
                                placeholder="Wpisz pełną nazwę firmy"
                                error={errors.companyName}
                                touched={touched.companyName || false}
                            />
                        </div>
                    </div>
                    <div className="c-form_row d-flex -fullWidth -mt24">
                        <div className="c-form_group d-flex flex-column -fullWidth -nip">
                            <TextField
                                id="nip"
                                label="NIP"
                                placeholder="np. 783 08 50 12"
                                error={errors.nip}
                                length={10}
                                type="number"
                                touched={touched.nip || false}
                            />
                        </div>
                    </div>
                    <div className="c-form_row d-flex -fullWidth -mt24">
                        <div className="c-form_group d-flex flex-column -fullWidth">
                            <TextField
                                id="regon"
                                label="REGON"
                                placeholder="np. 123456789"
                                //TODO change tel to number and fix it. Formik doesn't accept 0 as first number
                                type="tel"
                                error={errors.regon}
                                required={false}
                                touched={touched.regon || false}
                            />
                        </div>
                    </div>
                    <div className="c-form_row d-flex -fullWidth -mt24">
                        <div className="c-form_group d-flex flex-column -fullWidth">
                            <PhoneField
                                id="phoneNumber"
                                label="Numer kontaktowy"
                                error={errors.phoneNumber}
                                value={values.phoneNumber || ''}
                                touched={touched.phoneNumber || false}
                                required={false}
                            />
                        </div>
                    </div>
                    <div className="c-form_row d-flex -fullWidth -mt24">
                        <div className="c-form_group d-flex flex-column -fullWidth">
                            <TextField
                                id="email"
                                label="Adres e-mail"
                                placeholder="np. imię@adres.pl"
                                error={errors.email}
                                touched={touched.email || false}
                                type="email"
                                required={false}
                            />
                        </div>
                    </div>
                    <div className="c-form_row d-flex -fullWidth -mt24">
                        <div className="c-form_group d-flex flex-column -fullWidth">
                            <TextField
                                id="street"
                                label="Adres firmy"
                                placeholder="Ulica i numer"
                                error={errors.street}
                                touched={touched.street || false}
                            />
                        </div>
                    </div>
                    <div className="c-form_row d-flex flex-column flex-lg-row -mr20 -mr0md -mt24">
                        <div className="c-form_group d-flex flex-column -mr16 -mr0md">
                            <PostCodeField
                                id="postalCode"
                                label="Kod pocztowy"
                                //value={values.postalCode || ''}
                                //error={errors.postalCode}
                                //touched={touched.postalCode || false}
                            />
                        </div>
                        <div className="c-form_group d-flex flex-column -mt24md">
                            <TextField
                                id="city"
                                label="Miasto"
                                placeholder="np. Warszawa"
                                error={errors.city}
                                touched={touched.city || false}
                            />
                        </div>
                    </div>
                    <div className="c-form_row">
                        <Button
                            type="submit"
                            layout="primary"
                            css="c-stepContainer_button -mt32 -mt24md"
                            disabled={!isValid}
                        >
                            Kontynuuj
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default InvoiceForm
