import React from 'react'

import './Button.scss'

interface IButtonProps {
    href?: string
    loading?: boolean
    disabled?: boolean
    children: React.ReactChild
    css?: string
    target?: '_blank'
    onClick?: () => void
    noArrow?: boolean
}

export interface IButton extends IButtonProps {
    layout?:
        | 'primary'
        | 'primary2'
        | 'secondary'
        | 'borderLess'
        | 'add'
        | 'add2'
        | 'add3'
        | 'cart'
    type: 'button' | 'submit'
}

interface ILink extends IButtonProps {
    layout?: 'primary' | 'secondary'
    type: 'link'
}

const Button = ({
    layout = 'primary',
    loading = false,
    disabled = false,
    type,
    href,
    children,
    css,
    onClick,
    target,
    noArrow = false,
}: IButton | ILink): JSX.Element => {
    const baseClass = type !== 'link' ? 'c-btn' : 'c-link'
    const layoutClass = ` -${layout}`
    const disabledClass = `${disabled ? ' -disabled' : ''}`
    const loadingClass = `${loading ? ' -loading -disabled' : ''}`
    const extraClass = `${layoutClass + loadingClass + disabledClass}`

    const btnContent = (
        <>
            {(layout === 'add' || layout === 'add2' || layout === 'add3') && (
                <span className="icon-plus"></span>
            )}

            {children}

            {!noArrow &&
                (loading ? (
                    <span className="icon-loading"></span>
                ) : (
                    <span className="icon-arrow"></span>
                ))}
        </>
    )

    return type !== 'link' ? (
        href ? (
            <a
                className={baseClass + ` ${css || ''}` + extraClass}
                data-testid="button"
                onClick={onClick}
                href={href}
                target={target}
                rel={target ? 'noopener' : ''}
            >
                {btnContent}
            </a>
        ) : (
            <button
                className={baseClass + ` ${css || ''}` + extraClass}
                data-testid="button"
                disabled={disabled && disabled}
                onClick={onClick}
                type={type === 'submit' ? 'submit' : 'button'}
            >
                {btnContent}
            </button>
        )
    ) : (
        <a
            onClick={onClick}
            href={href}
            className={baseClass + ` ${css || ''}` + extraClass}
            data-testid="button"
            target={target}
            rel={target ? 'noopener' : ''}
        >
            {children}
        </a>
    )
}

export default Button
