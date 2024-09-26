import { type Meta, type StoryObj } from '@storybook/react'
import { Switch } from 'src/components'
import { Empty } from 'src/components/data-display/Empty/Empty'
import { ExampleStory } from 'src/utils/ExampleStory'
import { Divider } from 'src/components'
import { ConfigProvider } from 'src/components'
import { Space } from 'src/components'
import { Select } from 'src/components'
import { TreeSelect } from 'src/components'
import { Cascader } from 'src/components'
import { Transfer } from 'src/components'
import { Table } from 'src/components'
import { List } from 'src/components'
import { useState } from 'react'

const meta: Meta<typeof Empty> = {
  title: 'Components/Data Display/Empty',
  component: Empty,

  args: {
    description: 'Default Message',
    image: Empty.PRESENTED_IMAGE_DEFAULT,
    imageStyle: undefined,
  },
}
export default meta

type Story = StoryObj<typeof Empty>

/*
  Initial story templates generated by AI.
  Customize the stories based on specific requirements.
*/

export const Primary: Story = {}

export const CustomDescription: Story = {
  args: {
    description: 'Custom description for empty state',
  },
}

export const CustomImageStyle: Story = {
  args: {
    imageStyle: { width: '60px', height: '60px' },
  },
}

export const NoImage: Story = {
  args: {
    image: null,
  },
}

export const AltImage: Story = {
  args: {
    image: Empty.PRESENTED_IMAGE_SIMPLE,
    imageStyle: { width: '100px', height: '62px' },
  },
}

export const CustomDescriptionAndImage: Story = {
  args: {
    description: (
      <>
        <p>This is a custom description for the empty state.</p>
        <b>
          Feel free to add <i>formatted</i> content here.
        </b>
      </>
    ),
    imageStyle: { width: '200px', height: '200px' },
  },
}

export const NoDescription: Story = {
  args: {
    description: '',
  },
}

export const CustomImageAndStyle: Story = {
  args: {
    description: 'No data available',
    imageStyle: {
      borderRadius: '50%',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    },
  },
}

export const NoImageAndNoDescription: Story = {
  args: {
    description: null,
    image: null,
  },
}

export const ExampleGlobalEmpty: Story = {
  render: () => {
    const customizeRenderEmpty = () => (
      <div style={{ textAlign: 'center' }}>
        {'{Icon}'}
        <p>Data Not Found</p>
      </div>
    )

    const style: React.CSSProperties = { width: 200 }
    const [customize, setCustomize] = useState(true)

    return (
      <ExampleStory title="Set global Empty style.">
        <>
          <Switch unCheckedChildren="default" checkedChildren="customize" checked={customize} onChange={setCustomize} />
          <Divider />
          <ConfigProvider renderEmpty={customize ? customizeRenderEmpty : undefined}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <h4>Select</h4>
              <Select style={style} />
              <h4>TreeSelect</h4>
              <TreeSelect style={style} treeData={[]} />
              <h4>Cascader</h4>
              <Cascader style={style} options={[]} showSearch />
              <h4>Transfer</h4>
              <Transfer />
              <h4>Table</h4>
              <Table
                style={{ marginTop: 8 }}
                columns={[
                  { title: 'Name', dataIndex: 'name', key: 'name' },
                  { title: 'Age', dataIndex: 'age', key: 'age' },
                ]}
              />
              <h4>List</h4>
              <List />
            </Space>
          </ConfigProvider>
        </>
      </ExampleStory>
    )
  },
}
