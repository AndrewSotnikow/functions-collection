import React from 'react'
import { Story, Meta } from '@storybook/react'

import FoldableText, { IFoldableTextProps } from './FoldableText'

export default {
    title: 'Creator/Step 1/FoldableText',
    component: FoldableText,
} as Meta

const Template: Story<IFoldableTextProps> = (props) => (
    <FoldableText {...props} />
)

export const Default = Template.bind({})

Default.args = {
    short: 'Lorem ipsum',
    long: 'Lorem ipsum dolor sum amet',
}
