import { Box } from '@mui/material'
import * as React from 'react'
import { ReactNode } from 'react'
import { ReactComponent as ArrowLeft } from '../../assets/icons/paginationArrowLeft.svg'
import { ReactComponent as ArrowRight } from '../../assets/icons/paginationArrowRight.svg'

interface VerticalScrollProps {
    children: ReactNode
    handleLeftDirection: () => void
    handleRightDirection: () => void
    isRightArrowDisplayed?: boolean
    isLeftArrowDisplayed?: boolean
    topPosition?: string
    leftPosition?: string
    rightPosition?: string
}

const PaginationArrows = ({
    children,
    handleLeftDirection,
    handleRightDirection,
    isRightArrowDisplayed = true,
    isLeftArrowDisplayed = true,
    topPosition,
    leftPosition,
    rightPosition,
}: VerticalScrollProps) => {
    const arrowButton = {
        position: 'absolute',
        top: topPosition ? topPosition : '56px',
        backgroundColor: 'secondary.main',
        borderRadius: '50%',
        zIndex: 99999,
        '&:hover': {
            cursor: 'pointer',
        },
    }

    const leftArrow = {
        left: leftPosition ? leftPosition : '32px',
    }

    const rightArrow = {
        right: rightPosition ? rightPosition : '42px',
    }

    return (
        <Box position="relative">
            {isLeftArrowDisplayed && (
                <Box
                    sx={{ ...arrowButton, ...leftArrow }}
                    onClick={() => handleLeftDirection()}>
                    <ArrowLeft />
                </Box>
            )}
            {children}
            {isRightArrowDisplayed && (
                <Box
                    sx={{ ...arrowButton, ...rightArrow }}
                    onClick={() => handleRightDirection()}>
                    <ArrowRight />
                </Box>
            )}
        </Box>
    )
}

export default PaginationArrows
