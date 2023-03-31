import React from 'react'
import { Story, Meta } from '@storybook/react'

import StepContainer, { IStepContainerProps } from './StepContainer'

export default {
    title: 'Creator/Step 2/StepContainer',
    component: StepContainer,
} as Meta

const Template: Story<IStepContainerProps> = (props) => (
    <StepContainer {...props}></StepContainer>
)

export const Default = Template.bind({})

Default.args = {
    title: 'Dane osobowe',
    step: 1,
    signin: false,
}
