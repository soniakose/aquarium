import { type Meta, type StoryObj } from '@storybook/react'
import { Spin } from 'src/components/feedback/Spin/Spin'
import { ExampleStory } from 'src/utils/ExampleStory'
import { Flex } from 'src/components'
import { Switch } from 'src/components'
import { Alert } from 'src/components'
import { Margin } from 'src/styles/style'
import { useState } from 'react'
import { Button } from 'src/components'

const meta: Meta<typeof Spin> = {
  title: 'Aquarium/Feedback/Spin',
  component: Spin,

  args: {},
}
export default meta

type Story = StoryObj<typeof Spin>

export const Primary: Story = {}

export const ExampleSize: Story = {
  render: () => {
    return (
      <ExampleStory title="A small Spin is used for loading text, default sized Spin for loading a card-level block, and large Spin used for loading a page.">
        <Flex align="center" gap="middle">
          <Spin size="small" />
          <Spin />
          <Spin size="large" />
        </Flex>
      </ExampleStory>
    )
  },
}

export const ExampleEmbedded: Story = {
  render: () => {
    const [loading, setLoading] = useState<boolean>(false)
    return (
      <ExampleStory title="Embedding content into Spin will set it into loading state.">
        <Spin spinning={loading}>
          <Alert
            type="info"
            message="Alert message title"
            description="Further details about the context of this alert."
          />
        </Spin>
        <div style={{ marginTop: Margin }}>
          Loading state：
          <Switch checked={loading} onChange={setLoading} />
        </div>
      </ExampleStory>
    )
  },
}

export const ExampleCustomizedDescription: Story = {
  render: () => {
    return (
      <ExampleStory title="Adds subtext">
        <Flex gap={50} vertical>
          <Flex gap={100}>
            <Spin tip="Loading" size="small">
              <div className="content" />
            </Spin>
            <Spin tip="Loading">
              <div className="content" />
            </Spin>
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </Flex>
          <Spin tip="Loading...">
            <Alert
              message="Alert message title"
              description="Further details about the context of this alert."
              type="info"
            />
          </Spin>
        </Flex>
      </ExampleStory>
    )
  },
}

export const ExampleDelay: Story = {
  render: () => {
    const [loading, setLoading] = useState<boolean>(false)
    return (
      <ExampleStory title="Specifies a delay for loading state. If spinning ends during delay, loading status won't appear.">
        <Spin spinning={loading} delay={500}>
          <Alert
            type="info"
            message="Alert message title"
            description="Further details about the context of this alert."
          />
        </Spin>
        <div style={{ marginTop: Margin }}>
          Loading state：
          <Switch checked={loading} onChange={setLoading} />
        </div>
      </ExampleStory>
    )
  },
}

export const ExampleFullscreen: Story = {
  render: () => {
    const [spinning, setSpinning] = useState<boolean>(false)

    const showLoader = () => {
      setSpinning(true)
      setTimeout(() => {
        setSpinning(false)
      }, 3000)
    }
    return (
      <ExampleStory title="The fullscreen mode is perfect for creating page loaders. It adds a dimmed overlay with a centered spinner.">
        <Button onClick={showLoader}>Show fullscreen for 3s</Button>
        <Spin spinning={spinning} fullscreen />
      </ExampleStory>
    )
  },
}