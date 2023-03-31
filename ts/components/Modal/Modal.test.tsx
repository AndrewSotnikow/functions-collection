// import 'whatwg-fetch'
import React from 'react'
import { render, screen } from 'test-utils'

import Modal from './Modal'

test('component renders correctly', () => {
    const props = {
        children: <div>test modal</div>,
        opened: true,
        onClose: () => false,
    }
    render(<Modal {...props} />)
    expect(screen.getByTestId('modal')).toBeInTheDocument()
})
