// import 'whatwg-fetch'
import React from 'react'
import { render, screen } from 'test-utils'
import CheckboxGroup from './CheckboxGroup'

const props = {
    options: [
        { id: 'Gluten', text: 'Gluten', price: 5 },
        { id: 'Nabiał', text: 'Nabiał', price: 5 },
        { id: 'Ryby', text: 'Ryby', price: 5 },
        { id: 'Wieprzowina', text: 'Wieprzowina', price: 5 },
    ],
    title: 'Popularne alergeny',
    value: ['Ryby'],
    id: 'CheckboxGroup',
    setValue: () => {
        return true
    },
}

test('component renders correctly', () => {
    render(<CheckboxGroup {...props} />)
    expect(screen.getByTestId('checkboxGroup')).toBeInTheDocument()
})
