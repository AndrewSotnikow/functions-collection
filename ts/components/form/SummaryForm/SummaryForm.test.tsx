// import 'whatwg-fetch'
import React from 'react'
import { render, screen } from 'test-utils'

import SummaryForm from './SummaryForm'

test.skip('component renders correctly', () => {
    render(<SummaryForm />)
    expect(screen.getByTestId('SummaryForm')).toBeInTheDocument()
})
