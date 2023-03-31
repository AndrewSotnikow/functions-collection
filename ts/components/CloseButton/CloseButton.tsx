import React, { ReactElement } from 'react'
import './CloseButton.scss'

export interface ICloseButtonProps {
    onClose: () => void
}

const CloseButton = ({ onClose }: ICloseButtonProps): ReactElement => {
    return (
        <button
            className="c-closeButton"
            data-testid="closeButton"
            onClick={onClose}
        >
            <span className="icon-x -s24 -cWhite"></span>
        </button>
    )
}

export default CloseButton
