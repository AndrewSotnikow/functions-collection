import React from 'react'
import { Story, Meta } from '@storybook/react'

import Button, { IButtonProps } from './Button'

export default {
    title: 'Button + Link',
    component: Button,
} as Meta

const Template: Story<IButtonProps> = (args) => (
    <Button {...args}>Wróć do góry</Button>
)

export const Default = Template.bind({})

Default.args = {
    layout: 'primary',
    type: 'button',
}

const CartTemplate: Story<IButtonProps> = (args) => (
    <Button {...args}>
        <span className="c-quantity">0</span>
    </Button>
)

export const Cart = CartTemplate.bind({})

Cart.args = {
    layout: 'rounded',
    type: 'button',
    css: '-cart',
}
