import { type Meta } from '@storybook/react'
import { type StoryObj } from '@storybook/react'
import { GetAntdStyles } from 'src/utils/GetAntdStyles'

const meta: Meta<typeof GetAntdStyles> = {
  title: 'Aquarium/Other/GetAntdStyles',
  component: GetAntdStyles,
  args: {},
}
export default meta

type Story = StoryObj<typeof GetAntdStyles>

export const Primary: Story = {}
