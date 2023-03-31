import React from 'react'
import { Story, Meta } from '@storybook/react'

import Checkbox, { ICheckboxProps } from './Checkbox'

export default {
    title: 'Form/Checkbox',
    component: Checkbox,
} as Meta

const Template: Story<ICheckboxProps> = (args) => <Checkbox {...args} />

export const Default = Template.bind({})

Default.args = {
    id: 'checkbox',
    label: 'checkbox',
    checked: true,
}
