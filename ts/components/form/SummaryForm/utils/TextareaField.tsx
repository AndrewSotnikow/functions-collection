import React, { ReactElement } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { Field, FieldProps } from 'formik'
import { ErrorField } from 'utils/helpers'
import { validateMaxCharacters } from './helpers'
interface ITextareaProps {
    id: string
    label: string
    placeholder: string
    max: number
    required?: boolean
    error?: ErrorField | string
}

const TextareaField = ({
    id,
    label,
    placeholder,
    required,
    max,
    error,
}: ITextareaProps): ReactElement => {
    const backendError = error

    const validateField = (value: string | number) => {
        let error
        if (max && !error) error = validateMaxCharacters(value, max)
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
            <Field validate={validateField} name={id} id={id}>
                {({ form, field: { value }, meta: { error } }: FieldProps) => {
                    const { setFieldValue, handleBlur } = form
                    const frontendError = error as string | { message: string }
                    const errorSource = frontendError || backendError
                    return (
                        <>
                            <TextareaAutosize
                                className={`t-text -f16 c-form_field -bgWhite -mt8 ${
                                    frontendError ? '-error' : ''
                                } ${!value && '-initialTextareaHeight'}`}
                                id={id}
                                name={id}
                                onBlur={handleBlur}
                                value={value}
                                placeholder={placeholder}
                                onChange={({ target }) => {
                                    if (target.value !== value) {
                                        setFieldValue(id, target.value)
                                    }
                                }}
                            />
                            {errorSource && (
                                <span className="c-form_error">
                                    {typeof errorSource === 'string'
                                        ? errorSource
                                        : errorSource?.message}
                                </span>
                            )}
                        </>
                    )
                }}
            </Field>
        </>
    )
}

export default TextareaField
