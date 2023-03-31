import React, { ReactElement } from 'react'
import { Field } from 'formik'
import { ErrorField } from 'utils/helpers'
import {
    validateLength,
    validateMaxCharacters,
    validateMinCharacters,
    validateNotEmpty,
    validateRegon,
    validateEmail,
} from './helpers'
interface ITextFieldProps {
    id: string
    label: string
    placeholder: string
    error?: ErrorField | string
    type?: string
    required?: boolean
    touched?: boolean
    min?: number
    max?: number
    length?: number
}

const TextField = ({
    id,
    label,
    placeholder,
    error,
    type = 'text',
    required = true,
    touched,
    min,
    max,
    length,
}: ITextFieldProps): ReactElement => {
    const isError = touched !== undefined ? touched && error : error

    const validateField = (value: string | number) => {
        let error
        if (required) error = validateNotEmpty(value)
        if (min && !error) error = validateMinCharacters(value, min)
        if (max && !error) error = validateMaxCharacters(value, max)
        if (length && !error) error = validateLength(value, length)
        if (id === 'regon' && !error) error = validateRegon(value)
        if (id === 'email' && !error) error = validateEmail(value)

        return error
    }

    return (
        <>
            <label
                className="t-text -f12 -wNormal -cCinder c-form_label"
                htmlFor={id}
            >
                {label} {!required && '(opcjonalnie)'}
            </label>

            <Field
                className={`t-text -f16 c-form_field -bgWhite -mt8 ${
                    isError ? '-error' : ''
                }`}
                id={id}
                name={id}
                placeholder={placeholder}
                type={type}
                validate={validateField}
                onWheel={(e: { target: HTMLInputElement }) => e.target.blur()}
            />

            {isError && (
                <span className="c-form_error">
                    {typeof error === 'string' ? error : error?.message}
                </span>
            )}
        </>
    )
}

export default TextField
