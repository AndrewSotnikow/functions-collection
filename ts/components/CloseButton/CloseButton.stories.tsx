import React from 'react'
import { Story, Meta } from '@storybook/react'

import CloseButton, { ICloseButtonProps } from './CloseButton'

export default {
    title: 'CloseButton',
    component: CloseButton,
} as Meta

const Template: Story<ICloseButtonProps> = (args) => <CloseButton {...args} />

export const Default = Template.bind({})

Default.args = {
    onClose: () => null,
}
