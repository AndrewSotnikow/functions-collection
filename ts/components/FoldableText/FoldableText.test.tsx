// import 'whatwg-fetch'
import React from 'react'
import { render, screen } from 'test-utils'

import FoldableText from './FoldableText'

const props = { short: 'Lorem ipsum', long: 'Lorem ipsum dolor sum amet' }

test('component renders correctly', () => {
    render(<FoldableText {...props} />)
    expect(screen.getByTestId('foldableText')).toBeInTheDocument()
})
