import { type Meta, type StoryObj } from '@storybook/react'
import { Collapse } from 'src/components/data-display/Collapse/Collapse'
import { ExampleStory } from 'src/utils/ExampleStory'
import { type ICollapseProps } from 'src/components/data-display/Collapse/Collapse'
import { Divider, Space } from 'src/components'
import { SplitIcon } from 'src/components'
import { theme } from 'antd'
import { Select } from 'src/components'
import { useState } from 'react'
import { GearIcon } from 'src/components'

const meta: Meta<typeof Collapse> = {
  title: 'Aquarium/Data Display/Collapse',
  component: Collapse,

  args: {},
}
export default meta

type Story = StoryObj<typeof Collapse>

export const Primary: Story = {}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

export const ExampleBasic: Story = {
  render: () => {
    const items: ICollapseProps['items'] = [
      {
        key: '1',
        label: 'This is panel header 1',
        children: <p>{text}</p>,
      },
      {
        key: '2',
        label: 'This is panel header 2',
        children: <p>{text}</p>,
      },
      {
        key: '3',
        label: 'This is panel header 3',
        children: <p>{text}</p>,
      },
    ]
    const onChange = (key: string | string[]) => {
      console.log(key)
    }

    return (
      <ExampleStory title="By default, any number of panels can be expanded at a time. The first panel is expanded in this example.">
        <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
      </ExampleStory>
    )
  },
}

export const ExampleSize: Story = {
  render: () => {
    return (
      <ExampleStory
        title={
          <>
            Supports a default collapse size as well as a large and small size.
            <br />
            If a large or small collapse is desired, set the size property to either large or small respectively. Omit
            the size property for a collapse with the default size.
          </>
        }
      >
        <Divider orientation="left">Default Size</Divider>
        <Collapse items={[{ key: '1', label: 'This is default size panel header', children: <p>{text}</p> }]} />
        <Divider orientation="left">Small Size</Divider>
        <Collapse
          size="small"
          items={[{ key: '1', label: 'This is small size panel header', children: <p>{text}</p> }]}
        />
        <Divider orientation="left">Large Size</Divider>
        <Collapse
          size="large"
          items={[{ key: '1', label: 'This is large size panel header', children: <p>{text}</p> }]}
        />
      </ExampleStory>
    )
  },
}

export const ExampleAccordion: Story = {
  render: () => {
    const items: ICollapseProps['items'] = [
      {
        key: '1',
        label: 'This is panel header 1',
        children: <p>{text}</p>,
      },
      {
        key: '2',
        label: 'This is panel header 2',
        children: <p>{text}</p>,
      },
      {
        key: '3',
        label: 'This is panel header 3',
        children: <p>{text}</p>,
      },
    ]
    return (
      <ExampleStory title="In accordion mode, only one panel can be expanded at a time.">
        <Collapse accordion items={items} />
      </ExampleStory>
    )
  },
}

export const ExampleNestedPanel: Story = {
  render: () => {
    const itemsNest: ICollapseProps['items'] = [
      {
        key: '1',
        label: 'This is panel nest panel',
        children: <p>{text}</p>,
      },
    ]

    const items: ICollapseProps['items'] = [
      {
        key: '1',
        label: 'This is panel header 1',
        children: <Collapse defaultActiveKey="1" items={itemsNest} />,
      },
      {
        key: '2',
        label: 'This is panel header 2',
        children: <p>{text}</p>,
      },
      {
        key: '3',
        label: 'This is panel header 3',
        children: <p>{text}</p>,
      },
    ]
    const onChange = (key: string | string[]) => {
      console.log(key)
    }

    return (
      <ExampleStory title="Collapse is nested inside the Collapse.">
        <Collapse onChange={onChange} items={items} />
      </ExampleStory>
    )
  },
}

export const ExampleBorderless: Story = {
  render: () => {
    const collapseText = (
      <p style={{ paddingLeft: 24 }}>
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
        guest in many households across the world.
      </p>
    )
    const items: ICollapseProps['items'] = [
      {
        key: '1',
        label: 'This is panel header 1',
        children: collapseText,
      },
      {
        key: '2',
        label: 'This is panel header 2',
        children: collapseText,
      },
      {
        key: '3',
        label: 'This is panel header 3',
        children: collapseText,
      },
    ]
    return (
      <ExampleStory title="A borderless style of Collapse.">
        <Collapse items={items} bordered={false} defaultActiveKey={['1']} />
      </ExampleStory>
    )
  },
}

export const ExampleCustomPanel: Story = {
  render: () => {
    const getItems: (panelStyle: React.CSSProperties) => ICollapseProps['items'] = panelStyle => [
      {
        key: '1',
        label: 'This is panel header 1',
        children: <p>{text}</p>,
        style: panelStyle,
      },
      {
        key: '2',
        label: 'This is panel header 2',
        children: <p>{text}</p>,
        style: panelStyle,
      },
      {
        key: '3',
        label: 'This is panel header 3',
        children: <p>{text}</p>,
        style: panelStyle,
      },
    ]

    const { token } = theme.useToken()

    const panelStyle: React.CSSProperties = {
      marginBottom: 24,
      background: token.colorFillAlter,
      borderRadius: token.borderRadiusLG,
      border: 'none',
    }
    return (
      <ExampleStory title="Customize the background, border, margin styles and icon for each panel.">
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <SplitIcon rotate={isActive ? 90 : 0} />}
          style={{ background: token.colorBgContainer }}
          items={getItems(panelStyle)}
        />
      </ExampleStory>
    )
  },
}

export const ExampleNoArrow: Story = {
  render: () => {
    const items: ICollapseProps['items'] = [
      {
        key: '1',
        label: 'This is panel header with arrow icon',
        children: <p>{text}</p>,
      },
      {
        key: '2',
        label: 'This is panel header with no arrow icon',
        children: <p>{text}</p>,
        showArrow: false,
      },
    ]

    const onChange = (key: string | string[]) => {
      console.log(key)
    }

    return (
      <ExampleStory title="You can hide the arrow icon by passing showArrow={false} to CollapsePanel component.">
        <Collapse defaultActiveKey={['1']} onChange={onChange} items={items} />
      </ExampleStory>
    )
  },
}

export const ExampleExtraNode: Story = {
  render: () => {
    const { Option } = Select

    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

    type ExpandIconPosition = 'start' | 'end'

    const [expandIconPosition, setExpandIconPosition] = useState<ExpandIconPosition>('start')

    const onPositionChange = (newExpandIconPosition: ExpandIconPosition) => {
      setExpandIconPosition(newExpandIconPosition)
    }

    const onChange = (key: string | string[]) => {
      console.log(key)
    }

    const genExtra = () => (
      <GearIcon
        onClick={event => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation()
        }}
      />
    )

    const items: ICollapseProps['items'] = [
      {
        key: '1',
        label: 'This is panel header 1',
        children: <div>{text}</div>,
        extra: genExtra(),
      },
      {
        key: '2',
        label: 'This is panel header 2',
        children: <div>{text}</div>,
        extra: genExtra(),
      },
      {
        key: '3',
        label: 'This is panel header 3',
        children: <div>{text}</div>,
        extra: genExtra(),
      },
    ]

    return (
      <ExampleStory title={<> </>}>
        <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition} items={items} />
        <br />
        <span>Expand Icon Position: </span>
        <Select value={expandIconPosition} style={{ margin: '0 8px' }} onChange={onPositionChange}>
          <Option value="start">start</Option>
          <Option value="end">end</Option>
        </Select>
      </ExampleStory>
    )
  },
}

export const ExampleGhostCollaps: Story = {
  render: () => {
    const items: ICollapseProps['items'] = [
      {
        key: '1',
        label: 'This is panel header 1',
        children: <p>{text}</p>,
      },
      {
        key: '2',
        label: 'This is panel header 2',
        children: <p>{text}</p>,
      },
      {
        key: '3',
        label: 'This is panel header 3',
        children: <p>{text}</p>,
      },
    ]
    return (
      <ExampleStory title="Making collapse's background to transparent.">
        <Collapse defaultActiveKey={['1']} ghost items={items} />
      </ExampleStory>
    )
  },
}

export const ExampleCollapsible: Story = {
  render: () => {
    return (
      <ExampleStory title="Specify the trigger area of collapsible by collapsible.">
        <Space direction="vertical">
          <Collapse
            collapsible="header"
            defaultActiveKey={['1']}
            items={[
              {
                key: '1',
                label: 'This panel can only be collapsed by clicking text',
                children: <p>{text}</p>,
              },
            ]}
          />
          <Collapse
            collapsible="icon"
            defaultActiveKey={['1']}
            items={[
              {
                key: '1',
                label: 'This panel can only be collapsed by clicking icon',
                children: <p>{text}</p>,
              },
            ]}
          />
          <Collapse
            collapsible="disabled"
            items={[
              {
                key: '1',
                label: "This panel can't be collapsed",
                children: <p>{text}</p>,
              },
            ]}
          />
        </Space>
      </ExampleStory>
    )
  },
}