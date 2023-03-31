// import 'whatwg-fetch'
import React from 'react'
import { render, screen } from 'test-utils'

import CloseButton from './CloseButton'

test('component renders correctly', () => {
    const props = {
        onClose: () => null,
    }
    render(<CloseButton {...props} />)
    expect(screen.getByTestId('closeButton')).toBeInTheDocument()
})
