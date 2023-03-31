import React, { ReactElement, useRef } from 'react'

import './Checkbox.scss'

export interface ICheckboxProps {
    id: string
    label?: string
    disabled?: boolean
    isValid?: boolean
    validationText?: string
    price?: number
    checked: boolean
    setValue: (id: boolean) => void
}

const Checkbox = ({
    id,
    label,
    disabled,
    isValid,
    validationText,
    price,
    checked,
    setValue,
}: ICheckboxProps): ReactElement => {
    const disabledClass = `${disabled ? ' -disabled' : ''}`
    const isValidClass = `${!isValid ? ' -isInvalid' : ''}`

    const extraClass = `${disabledClass + isValidClass}`
    const thisInput = useRef<HTMLInputElement>(null)

    return (
        <div
            className={`f-group -checkbox${extraClass}`}
            data-testid="checkbox"
        >
            <span className="f-group_inner">
                <input
                    id={id}
                    type="checkbox"
                    disabled={disabled}
                    ref={thisInput}
                    checked={checked}
                    onChange={() => setValue(!checked)}
                />

                <label className="-cCinder" htmlFor={id}>
                    {label} {price && <span>+{price}zł</span>}
                </label>
            </span>

            {!isValid && (
                <span className="f-group_bottom">
                    <span className="f-group_error">{validationText}</span>
                </span>
            )}
        </div>
    )
}

export default Checkbox
