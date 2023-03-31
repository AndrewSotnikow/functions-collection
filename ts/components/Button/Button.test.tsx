// import 'whatwg-fetch'
import React from 'react'
import { render, screen } from 'test-utils'

import Button from './Button'

test('component renders correctly', () => {
    render(<Button>TExt</Button>)
    expect(screen.getByTestId('button')).toBeInTheDocument()
})
