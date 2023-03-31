import React from 'react'
import { Story, Meta } from '@storybook/react'

import ConfirmationToast, { IConfirmationToastProps } from './ConfirmationToast'

export default {
    title: 'ConfirmationToast',
    component: ConfirmationToast,
} as Meta

const Template: Story<IConfirmationToastProps> = (args) => (
    <ConfirmationToast {...args} />
)

export const Default = Template.bind({})

Default.args = {
    toastContent: 'lorem ipsum',
    toastIcon: 'envelope',
}
