import React from 'react'
import { Meta } from '@storybook/react'

import SummaryForm from './SummaryForm'

export default {
    title: 'creator/Step 2/SummaryForm',
    component: SummaryForm,
} as Meta

const Template = () => <SummaryForm />

export const Default = Template.bind({})

Default.args = {
    className: 'undefined',
}
