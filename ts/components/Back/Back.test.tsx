// import 'whatwg-fetch'
import React from 'react'
import { render, screen } from 'test-utils'

import Back from './Back'

const props = {
    label: 'Test',
}

test('component renders correctly', () => {
    render(<Back {...props} />)
    expect(screen.getByTestId('button')).toBeInTheDocument()
})
