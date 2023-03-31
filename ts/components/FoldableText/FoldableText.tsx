import React, { ReactElement, useState } from 'react'
import parse from 'html-react-parser'

import './FoldableText.scss'

export interface IFoldableTextProps {
    short: string
    long: string
}

const FoldableText = ({ short, long }: IFoldableTextProps): ReactElement => {
    const [folded, setFolded] = useState(true)

    return (
        <div
            className="c-foldableText t-text -f16_28"
            data-testid="foldableText"
        >
            {parse(folded ? short : long)}
            <button
                className="c-foldableText_trigger c-link -primary t-text -f16_28"
                onClick={() => setFolded(!folded)}
            >
                {folded ? 'czytaj więcej' : 'zwiń'}
            </button>
        </div>
    )
}

export default FoldableText
