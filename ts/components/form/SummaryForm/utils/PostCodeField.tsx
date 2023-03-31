import React, { ReactElement, useEffect } from 'react'
import { Field, FieldProps, useFormikContext } from 'formik'
import { useGetOrderDeliveryPriceByPostCodeAndCartIdQuery } from '../../../../creator/redux/api-slice/hooks'
import { useAppSelector } from '../../../../creator/redux/hooks'
import MaskedInput from 'react-maskedinput'

interface IPostCodeFieldProps {
    id: string
    label: string
    isDeliveryValidation?: boolean
    onDeliveryValidation?: (deliveryPrice: number | null) => void
}

const PostCodeField = ({
    id,
    label,
    isDeliveryValidation = false,
    onDeliveryValidation,
}: IPostCodeFieldProps): ReactElement => {
    const { values, setFieldTouched, setFieldError } =
        useFormikContext<Record<string, unknown>>()

    const value = values[id]

    const postCodeError = validatePostCode(value as string)
    const cartId = useAppSelector((state) => state.cart.cartId)

    const {
        data: apiData,
        error: apiError,
        isError: isApiError,
        isSuccess: isApiSuccess,
    } = useGetOrderDeliveryPriceByPostCodeAndCartIdQuery(
        { postCode: value as string, cartId: cartId || '' },
        {
            skip:
                !isDeliveryValidation ||
                !cartId ||
                typeof postCodeError === 'string' ||
                value === '',
        }
    )

    useEffect(() => {
        if (!isApiError) {
            return
        }

        //@ts-expect-error TODO: provide better type for error
        if (apiError?.data?.code === 401) {
            return
        }

        onDeliveryValidation?.(null)

        setFieldTouched('postalCode', true, false)

        //@ts-expect-error TODO: provide better type for error
        setFieldError('postalCode', apiError?.data?.errors[0]?.message)
    }, [apiError, isApiError])

    useEffect(() => {
        if (!isApiSuccess) {
            return
        }

        onDeliveryValidation?.(apiData?.price || null)
    }, [isApiSuccess, apiData])

    return (
        <>
            <label
                className="t-text -f12 -wNormal -cCinder c-form_label"
                htmlFor={id}
            >
                {label}
            </label>

            <Field
                validate={(value: string) => {
                    return isApiError
                        ? //@ts-expect-error TODO: provide better type for error
                          apiError?.data?.errors[0]?.message
                        : validatePostCode(value)
                }}
                name={id}
                id={id}
            >
                {({
                    form,
                    field: { value },
                    meta: { error, touched },
                }: FieldProps) => {
                    const { setFieldValue, handleBlur } = form

                    const isError = touched && error

                    const resolvedError = error as string | { message: string }
                    return (
                        <>
                            <MaskedInput
                                mask="11-111"
                                name={id}
                                className={`t-text -f16 c-form_field -bgWhite -mt8 ${
                                    isError ? '-error' : ''
                                }`}
                                placeholder="__-___"
                                value={value}
                                onChange={({ target }) => {
                                    if (target.value !== value) {
                                        setFieldValue(
                                            'postalCode',
                                            target.value
                                        )
                                    }
                                }}
                                onBlur={handleBlur}
                            />
                            {isError && (
                                <span className="c-form_error">
                                    {typeof resolvedError === 'string'
                                        ? resolvedError
                                        : resolvedError?.message}
                                </span>
                            )}
                        </>
                    )
                }}
            </Field>
        </>
    )
}

export default PostCodeField

export const validatePostCode = (value: string): string | null => {
    let error = null

    const digits = [...value].filter((char) => !isNaN(+char))

    if (digits.length < 5) {
        error = 'Nieprawidłowy kod pocztowy'
    }

    return error
}
