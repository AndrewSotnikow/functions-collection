// import 'whatwg-fetch'
import React from 'react'
import { render, screen } from 'test-utils'
import StepContainer from './StepContainer'

const props = {
    title: 'Title',
    step: 1,
    signin: false,
    children: <>Children</>,
    visible: true,
}

test('component renders correctly', () => {
    render(<StepContainer {...props} />)
    expect(screen.getByTestId('StepContainer')).toBeInTheDocument()
})
