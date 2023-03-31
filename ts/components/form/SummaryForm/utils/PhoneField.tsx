import React, { ReactElement } from 'react'
import { Field, FieldProps } from 'formik'
import { ErrorField } from 'utils/helpers'
import { validateNotEmpty } from './helpers'
import PhoneInput from 'react-phone-input-2'

interface IPhoneFieldProps {
    id: string
    label: string
    value: string
    error?: ErrorField | string
    touched?: boolean
    required?: boolean
}

const PhoneField = ({
    id,
    label,
    error,
    value,
    touched,
    required = true,
}: IPhoneFieldProps): ReactElement => {
    const isError = touched !== undefined ? touched && error : error
    const masks = {
        pl: '... ... ...',
    }
    return (
        <>
            <label
                className="t-text -f12 -wNormal -cCinder c-form_label"
                htmlFor={id}
            >
                {label} {!required && '(opcjonalnie)'}
            </label>

            <Field validate={required && validateNotEmpty} name={id} id={id}>
                {({ form }: FieldProps) => {
                    const { setFieldValue, handleBlur } = form
                    return (
                        <PhoneInput
                            masks={masks}
                            country={'pl'}
                            regions={'eu-union'}
                            onChange={(phone) => setFieldValue(id, phone)}
                            containerClass={`t-text -f16 c-form_field -bgWhite -mt8 ${
                                isError ? '-error' : ''
                            }`}
                            buttonClass="dropDown"
                            inputClass="inputClass"
                            value={value}
                            onBlur={handleBlur}
                            inputProps={{ id }}
                            preferredCountries={['pl']}
                            countryCodeEditable={false}
                        />
                    )
                }}
            </Field>

            {isError && (
                <span className="c-form_error">
                    {typeof error === 'string' ? error : error?.message}
                </span>
            )}
        </>
    )
}

export default PhoneField

export const validatePhone = (value: string): string | null => {
    let error = null

    const digits = [...value].filter((char) => !isNaN(+char))

    if (digits.length < 11) {
        error = 'Nieprawidłowy numer telefonu'
    }

    return error
}
