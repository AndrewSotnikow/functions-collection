import React, { ReactElement } from 'react'

export interface IButtonProps {
    label: string
    type?: 'button' | 'link'
    layout?: 'primary' | 'text'
    link?: string
    disabled?: boolean
}

const Button = ({
    label,
    type = 'button',
    layout,
    link,
    disabled = false,
}: IButtonProps): ReactElement => {
    const classes = `c-btn ${layout && `-${layout}`} ${disabled && '-disabled'}`

    switch (type) {
        case 'link':
            return (
                <a href={link} className={classes} data-testid="button">
                    {label}
                </a>
            )
        default:
            return (
                <button
                    className={classes}
                    data-testid="button"
                    disabled={disabled}
                >
                    {label}
                </button>
            )
    }
}

export default Button
