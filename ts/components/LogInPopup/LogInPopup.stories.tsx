import React from 'react'
import { Meta } from '@storybook/react'

import LogInPopup from './LogInPopup'

export default {
    title: 'LogInPopup',
    component: LogInPopup,
} as Meta

const onSuccessLogin = () => {
    console.log('Zalogowany')
}
const onSuccessReset = () => {
    console.log('Hasło zresetowane')
}
const onClose = () => {
    console.log('Modal logowania zamknięty')
}

const Template = () => (
    <LogInPopup
        onSuccessLogin={onSuccessLogin}
        onSuccessReset={onSuccessReset}
        onClose={onClose}
        resetProps={{
            token: '123',
            email: 'test@test.pl',
        }}
    />
)

export const Default = Template.bind({})

Default.args = {}
