import { Button } from '@mui/material'
import { t } from 'i18next'
import React, { SetStateAction } from 'react'

interface ReadMoreProps {
    text: string
    isFolded: boolean
    setIsFolded: React.Dispatch<SetStateAction<boolean>>
}

const ReadMore = ({ text, isFolded, setIsFolded }: ReadMoreProps) => {
    const toggleReadMore = () => {
        setIsFolded(!isFolded)
    }
    return (
        <div>
            <p>
                {text.length > 200 && isFolded
                    ? text
                    : `${text.slice(0, 100)} ${text.length > 200 ? '...' : ''}`}
            </p>
            {text.length > 200 && (
                <Button
                    onClick={toggleReadMore}
                    sx={{
                        fontSize: '11px',
                        color: 'white',
                        padding: '8px 0',
                        textAlign: 'left',
                        minWidth: 'unset',
                    }}>
                    {isFolded ? t('readLess') : t('readMore')}
                </Button>
            )}
        </div>
    )
}

export default ReadMore
