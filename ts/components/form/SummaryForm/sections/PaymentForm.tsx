import React, { ReactElement, useState } from 'react'
import { Field, FieldProps, Form, Formik } from 'formik'
import Button from '../../Button/Button'
import Checkbox from '../../Checkbox/Checkbox'
import { useOrder } from '../../../hooks/order'
import { validateNotEmpty } from '../utils/helpers'
import { isTabletRes } from '../../../../utils/helpers'
import { useAppSelector } from '../../../redux/hooks'
import { useDataset } from '../../../hooks/useDataset'

const PaymentForm = (): ReactElement => {
    const { placeOrder, orderErrorMessage, isProcessing } = useOrder()
    const cart = useAppSelector((state) => state.cart)
    const regulationsUrl = useDataset('regulationsUrl')
    const policyUrl = useDataset('policyUrl')
    const [isSending, setIsSending] = useState(false)
    const cartData = cart.data

    const totalPrice = cartData ? cartData.totalPrice : 0

    const CheckboxComponent = ({ form }: FieldProps) => {
        const { setFieldValue } = form
        const onValueChange = (checkbox: boolean) => {
            setFieldValue('checkbox', checkbox)
        }

        return (
            <div className="d-flex align-items-center">
                <Checkbox
                    id="accept"
                    label={
                        (isTabletRes() &&
                            'Akceptuję regulamin oraz politykę prywatności') ||
                        ''
                    }
                    checked={form.values.checkbox}
                    setValue={onValueChange}
                    isValid={true}
                />
                <span className="c-label t-text -f14 d-none d-lg-block">
                    Akceptuję{' '}
                    <a className="c-link" href={regulationsUrl}>
                        regulamin
                    </a>{' '}
                    oraz{' '}
                    <a className="c-link" href={policyUrl}>
                        politykę prywatności
                    </a>
                </span>
            </div>
        )
    }

    const handleSubmitForm = () => {
        setIsSending(true)
        placeOrder()
    }

    const renderSubmitButton = (parameters: {
        className: string
        isValid: boolean
    }) => {
        const { className, isValid } = parameters

        return (
            <>
                {orderErrorMessage && (
                    <div className="t-text -cErrorInfo -mb8 -tCenterMd">
                        {orderErrorMessage}
                    </div>
                )}
                {totalPrice !== 0 ? (
                    <Button
                        type="submit"
                        layout="primary"
                        css={className}
                        disabled={!isValid}
                        loading={isProcessing || isSending}
                    >
                        <>
                            Zamawiam i płacę{' '}
                            <img
                                alt="PayU logo"
                                src={`${
                                    !isValid
                                        ? '/build/images/components/summary/payu-gray.svg'
                                        : '/build/images/components/summary/payu.svg'
                                }`}
                            ></img>
                        </>
                    </Button>
                ) : (
                    <Button
                        layout="primary"
                        type="submit"
                        disabled={!isValid}
                        loading={isProcessing}
                    >
                        Potwierdzam zamówienie
                    </Button>
                )}
            </>
        )
    }

    return (
        <Formik
            initialValues={{
                checkbox: false,
            }}
            initialErrors={{ checkbox: 'Empty field' }}
            onSubmit={handleSubmitForm}
        >
            {({ isValid }) => (
                <Form className="c-form d-flex flex-column">
                    <div className="d-flex justify-content-between flex-column flex-lg-row">
                        <Field
                            component={CheckboxComponent}
                            validate={validateNotEmpty}
                            name="checkbox"
                        />
                        <Button
                            css="c-form_statute -f14 -mt24md -tCenter d-block d-lg-none"
                            type="link"
                            target="_blank"
                            layout="secondary"
                            href={regulationsUrl}
                        >
                            Czytaj regulamin i politykę prywatności
                        </Button>
                    </div>

                    {!isTabletRes() && (
                        <div className="-mt24 -mt24md d-flex flex-column">
                            {renderSubmitButton({
                                isValid,
                                className:
                                    'c-stepContainer_button d-none d-lg-flex -pay',
                            })}
                        </div>
                    )}

                    {isTabletRes() && (
                        <div className="c-mobileSummaryButton d-block d-lg-none -bgWhite -mt8">
                            <div className="-tCenter">
                                <span className="t-text -f16 -cCinder">
                                    Razem:{' '}
                                </span>
                                <span className="t-text -f16 -wBold">
                                    {totalPrice}zł
                                </span>
                            </div>

                            <div className="-mt16md">
                                {renderSubmitButton({
                                    isValid,
                                    className:
                                        'c-stepContainer_button d-flex d-lg-none -pay -fullWidth',
                                })}
                            </div>
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    )
}

export default PaymentForm
