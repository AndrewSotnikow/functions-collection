import React, { ReactElement, useState } from 'react'
import { Field, FieldProps } from 'formik'
import { ErrorField } from 'utils/helpers'
import { validateMinCharacters, validateNotEmpty } from './helpers'

interface IPasswordFieldProps {
    id: string
    label: string
    error?: ErrorField | string
    touched?: boolean
    infoText?: string
}

const PasswordField = ({
    id,
    label,
    error,
    touched,
    infoText,
}: IPasswordFieldProps): ReactElement => {
    const [showHidePassword, changeShowHidePassword] = useState(false)
    const isError = touched !== undefined ? touched && error : error

    const validateField = (value: string | number) => {
        let error
        error = validateNotEmpty(value)
        error = validateMinCharacters(value, 8)

        return error
    }

    const validateLoginPasswordField = (value: string | number) => {
        const error = validateNotEmpty(value)

        return error
    }

    return (
        <>
            <label
                className="t-text -f12 -wNormal -cCinder c-form_label"
                htmlFor={id}
            >
                {label}
            </label>
            <Field
                className="form-control rounded-0"
                id={id}
                name={id}
                validate={
                    id === 'password'
                        ? validateLoginPasswordField
                        : validateField
                }
            >
                {({ field }: FieldProps) => {
                    return (
                        <div
                            className={`c-form_field d-flex -fullWidth  -bgWhite -mt8 -password ${
                                isError ? '-error' : ''
                            }`}
                        >
                            <input
                                type={showHidePassword ? 'text' : 'password'}
                                {...field}
                                className="t-text -f16 -about -fullWidth"
                                placeholder="Podaj swoje hasło"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    changeShowHidePassword(!showHidePassword)
                                }
                            >
                                {showHidePassword ? (
                                    <span className="icon-eye-crossed"></span>
                                ) : (
                                    <span className="icon-eye"></span>
                                )}
                            </button>
                        </div>
                    )
                }}
            </Field>

            {infoText && (
                <p className="t-text -f12 -wNormal -cCinder c-form_label -mt8">
                    {infoText}
                </p>
            )}

            {isError && (
                <span className="c-form_error">
                    {typeof error === 'string' ? error : error?.message}
                </span>
            )}
        </>
    )
}

export default PasswordField
