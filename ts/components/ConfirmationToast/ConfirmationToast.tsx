import React, { ReactElement } from 'react'
import './ConfirmationToast.scss'

export interface IConfirmationToastProps {
    onClose?: () => void
    toastContent: string
    toastIcon: 'tada' | 'envelope'
}

const ConfirmationToast = ({
    onClose,
    toastContent,
    toastIcon,
}: IConfirmationToastProps): ReactElement => {
    return (
        <div className="c-confirmationToast">
            <div className="c-confirmationToast_inner d-flex flex-column justify-content-between">
                <div className="c-confirmationToast_icon">
                    <img
                        src={`/build/images/toast/${toastIcon}.svg`}
                        alt={`${toastIcon}`}
                    />
                </div>
                <button
                    className="c-confirmationToast_button"
                    onClick={onClose}
                >
                    <span className="icon-x -s16 -wBold"></span>
                </button>

                <p className="c-confirmationToast_text t-text -f12 -wNormal -mt12">
                    {toastContent}
                </p>
            </div>
        </div>
    )
}

export default ConfirmationToast
