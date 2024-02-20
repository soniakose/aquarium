import { type Meta, type StoryObj } from '@storybook/react'
import { Card } from 'src/components/data-display/Card/Card'
import { Button } from 'src/components'
import { ExampleStory } from 'src/utils/ExampleStory'
import { Col } from 'src/components'
import { Row } from 'src/components'
import { useState } from 'react'
import { Switch } from 'src/components'
import { Avatar } from 'src/components'
import { Skeleton } from 'src/components'
import MpLogo from 'src/assets/mpLogo.svg?react'

const meta: Meta<typeof Card> = {
  title: 'Aquarium/Data Display/Card',
  component: props => <Card {...props}>{props.children}</Card>,

  args: {
    actions: undefined,
    activeTabKey: undefined,
    bodyStyle: undefined,
    bordered: true,
    cover: undefined,
    defaultActiveTabKey: undefined,
    extra: undefined,
    headStyle: undefined,
    hoverable: false,
    loading: false,
    size: 'default',
    tabBarExtraContent: undefined,
    tabList: undefined,
    tabProps: undefined,
    title: 'Card Title',
    type: undefined,
    children: 'Card Content',
    onTabChange: key => {
      alert(`Tab Changed: ${key}`)
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'small'],
    },
  },
}
export default meta

type Story = StoryObj<typeof Card>

/*
  Initial story templates generated by AI.
  Customize the stories based on specific requirements.
*/

export const Primary: Story = {}

export const SmallSize: Story = {
  args: {
    size: 'small',
  },
}

export const NoBorder: Story = {
  args: {
    bordered: false,
  },
}

export const Hoverable: Story = {
  args: {
    hoverable: true,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const WithActions: Story = {
  args: {
    children: 'Custom Actions',
    actions: [<Button key="edit">Edit</Button>],
  },
}

export const WithTabs: Story = {
  args: {
    tabList: [
      { key: 'tab1', tab: 'Tab 1' },
      { key: 'tab2', tab: 'Tab 2' },
      { key: 'tab3', tab: 'Tab 3' },
    ],
  },
}

export const WithCover: Story = {
  args: {
    cover: <img alt="example" src="https://example.com/cover.jpg" />,
  },
}

export const CustomTitle: Story = {
  args: {
    title: <Button>Any React Component</Button>,
  },
}

export const InnerStyle: Story = {
  args: {
    type: 'inner',
  },
}

export const ExampleMeta: Story = {
  render: () => {
    return (
      <ExampleStory title="You can use Card.Meta to support more flexible content.">
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
          <Card.Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
      </ExampleStory>
    )
  },
}

export const ExampleColumn: Story = {
  render: () => {
    return (
      <ExampleStory title="Cards usually cooperate with grid column layout in overview page.">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </ExampleStory>
    )
  },
}

export const ExampleGrid: Story = {
  render: () => {
    const gridStyle: React.CSSProperties = {
      width: '25%',
      textAlign: 'center',
    }

    return (
      <ExampleStory title="Grid style card content.">
        <Card title="Card Title">
          <Card.Grid style={gridStyle}>Content</Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            Content
          </Card.Grid>
          <Card.Grid style={gridStyle}>Content</Card.Grid>
          <Card.Grid style={gridStyle}>Content</Card.Grid>
          <Card.Grid style={gridStyle}>Content</Card.Grid>
          <Card.Grid style={gridStyle}>Content</Card.Grid>
          <Card.Grid style={gridStyle}>Content</Card.Grid>
        </Card>
      </ExampleStory>
    )
  },
}

export const ExampleLoading: Story = {
  render: () => {
    const [loading, setLoading] = useState(true)
    const onChange = (checked: boolean) => {
      setLoading(!checked)
    }
    return (
      <ExampleStory title="Shows a loading indicator while the contents of the card is being fetched.">
        <>
          <Switch checked={!loading} onChange={onChange} />
          <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
            <Card.Meta
              avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
          <Card
            style={{ width: 300, marginTop: 16 }}
            actions={[
              <MpLogo key={1}/>,
              <MpLogo key={2}/>,
              <MpLogo key={3}/>,
            ]}
          >
            <Skeleton loading={loading} avatar>
              <Card.Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
                title="Card title"
                description="This is the description"
              />
            </Skeleton>
          </Card>
        </>
      </ExampleStory>
    )
  },
}

export const ExampleInnerCard: Story = {
  render: () => {
    return (
      <ExampleStory title="It can be placed inside the ordinary card to display the information of the multilevel structure.">
        <Card title="Card title">
          <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
            Inner Card content
          </Card>
          <Card style={{ marginTop: 16 }} type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
            Inner Card content
          </Card>
        </Card>
      </ExampleStory>
    )
  },
}

export const ExampleWithTabs: Story = {
  render: () => {
    const tabList = [
      {
        key: 'tab1',
        tab: 'tab1',
      },
      {
        key: 'tab2',
        tab: 'tab2',
      },
    ]

    const contentList: Record<string, React.ReactNode> = {
      tab1: <p>content1</p>,
      tab2: <p>content2</p>,
    }

    const tabListNoTitle = [
      {
        key: 'article',
        label: 'article',
      },
      {
        key: 'app',
        label: 'app',
      },
      {
        key: 'project',
        label: 'project',
      },
    ]

    const contentListNoTitle: Record<string, React.ReactNode> = {
      article: <p>article content</p>,
      app: <p>app content</p>,
      project: <p>project content</p>,
    }

    const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1')
    const [activeTabKey2, setActiveTabKey2] = useState<string>('app')

    const onTab1Change = (key: string) => {
      setActiveTabKey1(key)
    }
    const onTab2Change = (key: string) => {
      setActiveTabKey2(key)
    }

    return (
      <ExampleStory title="More content can be hosted.">
        <Card
          style={{ width: '100%' }}
          title="Card title"
          extra={<a href="#">More</a>}
          tabList={tabList}
          activeTabKey={activeTabKey1}
          onTabChange={onTab1Change}
        >
          {contentList[activeTabKey1]}
        </Card>
        <br />
        <br />
        <Card
          style={{ width: '100%' }}
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey2}
          tabBarExtraContent={<a href="#">More</a>}
          onTabChange={onTab2Change}
          tabProps={{
            size: 'middle',
          }}
        >
          {contentListNoTitle[activeTabKey2]}
        </Card>
      </ExampleStory>
    )
  },
}

export const ExampleContentConfiguration: Story = {
  render: () => {
    return (
      <ExampleStory title="A Card that supports cover, avatar, title and description.">
        <Card
          style={{ width: 300 }}
          cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
          actions={[
            <MpLogo key={1}/>,
            <MpLogo key={2}/>,
            <MpLogo key={3}/>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
            title="Card title"
            description="This is the description"
          />
        </Card>
      </ExampleStory>
    )
  },
}