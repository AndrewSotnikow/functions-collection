import { Box, Typography, useTheme } from '@mui/material'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { ExtendedEpgElement } from 'types/epg/Epg'
import ChannelGuideView from '../ChannelGuideView'
import debounce from 'utils/helpers/debounce'
import useSearchByChannelName from 'hooks/useSearchByChannelName'
import { useTranslation } from 'react-i18next'
import useResizeHook from 'hooks/useResizeHook'
import PaginationArrows from 'components/shared/PaginationArrows'
interface VerticalScrollProps {
    data: ExtendedEpgElement[]
}

const VerticalScroll = ({ data }: VerticalScrollProps) => {
    const [addElementsAmount, setAddElementsAmount] = useState(3)
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(addElementsAmount)
    const [initialX, setInitialX] = useState<number | null>(null)

    const { width, ref: epgContainerRef } = useResizeHook<HTMLDivElement>()
    const epgElement = epgContainerRef.current
    const theme = useTheme()

    const { filteredArray } = useSearchByChannelName(
        typeof data,
        data,
        'channelName'
    )
    const { t } = useTranslation()

    const slicedEpgData: ExtendedEpgElement[] = filteredArray.slice(
        startIndex,
        endIndex
    )

    useEffect(() => {
        if (width < 1100 && width !== 0) {
            setAddElementsAmount(2)
            setEndIndex(addElementsAmount)
        } else {
            setAddElementsAmount(3)
            setEndIndex(addElementsAmount)
        }
    }, [width])

    useEffect(() => {
        setStartIndex(0)
        setEndIndex(addElementsAmount)
    }, [filteredArray])

    const detectMouseDirection = (
        initialX: number,
        currentX: number
    ): 'left' | 'right' | null => {
        const threshold = 50

        if (currentX - initialX > threshold) {
            return 'right'
        }

        if (initialX - currentX > threshold) {
            return 'left'
        }

        return null
    }

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            setInitialX(event.clientX)
        }

        const handleMouseUp = () => {
            setInitialX(null)
        }

        const handleMouseMove = debounce((event: MouseEvent) => {
            if (initialX !== null) {
                const currentX = event.clientX
                const direction = detectMouseDirection(initialX, currentX)
                if (direction === 'left') handleRightDirection()
                else if (direction === 'right') handleLeftDirection()
            }
        }, 100)

        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mousemove', handleMouseMove)

        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [initialX])

    const handleRightDirection = () => {
        if (epgElement && endIndex < filteredArray.length) {
            setEndIndex((prev) => prev + addElementsAmount)
            setStartIndex((prev) => prev + addElementsAmount)
        }
        //loop
        else {
            setEndIndex(addElementsAmount)
            setStartIndex(0)
        }
    }
    const handleLeftDirection = () => {
        if (epgElement && startIndex >= addElementsAmount) {
            setEndIndex((prev) => prev - addElementsAmount)
            setStartIndex((prev) => prev - addElementsAmount)
        }
        //loop
        else {
            setEndIndex(filteredArray.length)
            setStartIndex(filteredArray.length - addElementsAmount)
        }
    }

    const containerStyle = {
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        flex: 'none',
        scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth',
        flexFlow: 'row nowrap',
        cursor: 'grab',
        justifyContent: 'left',
        marginTop: '20px',
        userSelect: 'none',
        height: '100%',
        borderLeft: `1px solid ${theme.palette.custom.darkGray}`,
    }

    const noResultsInfoStyle = {
        marginTop: '50px',
        textAlign: 'center',
        maxWidth: { xs: '294px', lg: '440px' },
    }

    return (
        <Box height="100%">
            {slicedEpgData.length ? (
                <PaginationArrows
                    handleLeftDirection={handleLeftDirection}
                    handleRightDirection={handleRightDirection}>
                    <Box ref={epgContainerRef} sx={containerStyle} dir="ltr">
                        {slicedEpgData.map(
                            (channel: ExtendedEpgElement, key) => (
                                <ChannelGuideView key={key} channel={channel} />
                            )
                        )}
                    </Box>
                </PaginationArrows>
            ) : (
                <Box width="100%" display="flex" justifyContent="center">
                    <Typography sx={noResultsInfoStyle}>
                        {t('lackOfSearchResults')}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default VerticalScroll
