import React, { ReactElement, useEffect } from 'react'
import CloseButton from '../CloseButton/CloseButton'
import './Modal.scss'

export interface IModalProps {
    children: React.ReactChild | JSX.Element[]
    opened: boolean
    onClose?: () => void
    closeOnOutsideClick?: boolean
}

const Modal = ({
    children,
    opened,
    onClose,
    closeOnOutsideClick = true,
}: IModalProps): ReactElement => {
    useEffect(() => {
        if (opened) {
            document.documentElement.classList.add('-modal-open')
        }
    }, [opened])

    const handleClose = () => {
        document.documentElement.classList.remove('-modal-open')
        onClose && onClose()
    }

    const handleCloseOnOutsideClick = (e: React.MouseEvent) => {
        if (e.target !== e.currentTarget) return

        handleClose()
    }

    return (
        <>
            {opened && (
                <div
                    className="c-modal -creator -mobileView"
                    data-testid="modal"
                    onClick={(e) =>
                        closeOnOutsideClick && handleCloseOnOutsideClick(e)
                    }
                >
                    <div className="c-modal_content d-flex flex-column align-items-center">
                        <div className="d-flex justify-content-end -fullWidth">
                            {onClose && <CloseButton onClose={handleClose} />}
                        </div>
                        <>{children}</>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal
