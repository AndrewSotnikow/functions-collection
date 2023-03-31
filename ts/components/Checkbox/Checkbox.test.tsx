// import 'whatwg-fetch'
import React from 'react'
import { render, screen } from 'test-utils'
import Checkbox from './Checkbox'

const props = {
    id: 'checkbox',
    label: 'checkbox',
    checked: true,
    setValue: () => {
        return true
    },
}

test('component renders correctly', () => {
    render(<Checkbox {...props} />)
    expect(screen.getByTestId('checkbox')).toBeInTheDocument()
})
