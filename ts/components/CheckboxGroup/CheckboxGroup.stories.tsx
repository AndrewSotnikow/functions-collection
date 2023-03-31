import React from 'react'
import { Story, Meta } from '@storybook/react'

import CheckboxGroup, { ICheckboxGroupProps } from './CheckboxGroup'

export default {
    title: 'CheckboxGroup',
    component: CheckboxGroup,
} as Meta

const Template: Story<ICheckboxGroupProps> = (props) => (
    <CheckboxGroup {...props} />
)

export const Default = Template.bind({})

Default.args = {
    options: [
        { id: 'Gluten', text: 'Gluten', price: 5 },
        { id: 'Nabiał', text: 'Nabiał', price: 5 },
        { id: 'Ryby', text: 'Ryby', price: 5 },
        { id: 'Wieprzowina', text: 'Wieprzowina', price: 5 },
    ],
    title: 'Popularne alergeny',
    value: ['Ryby'],
}
