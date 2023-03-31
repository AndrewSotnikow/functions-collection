import React from 'react'
import { Story, Meta } from '@storybook/react'

import Modal, { IModalProps } from './Modal'

export default {
    title: 'Modal',
    component: Modal,
} as Meta

const Template: Story<IModalProps> = (args) => <Modal {...args} />

export const Default = Template.bind({})

Default.args = {
    // children: <div className="c-testDiv "></div>,
}
