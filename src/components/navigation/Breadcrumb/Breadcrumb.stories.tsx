import { type Meta, type StoryObj } from '@storybook/react'
import { Center, Icon } from 'src/components'
import { Breadcrumb } from 'src/components/navigation/Breadcrumb/Breadcrumb'
import { PaddingXs } from 'src/styles/style'
import { ExampleStory } from 'src/utils/ExampleStory'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Navigation/Breadcrumb',
  component: Breadcrumb,

  args: {
    separator: '/',
    items: [{ title: 'Home' }, { title: 'Category' }, { title: 'Subcategory' }, { title: 'Current Page' }],
  },
}
export default meta

type Story = StoryObj<typeof Breadcrumb>

/*
  Initial story templates generated by AI.
  Customize the stories based on specific requirements.
*/

export const Primary: Story = {}

export const WithCustomSeparator: Story = {
  args: {
    separator: '>',
  },
}

export const WithLongItemLabels: Story = {
  args: {
    items: [
      { title: 'Very Long Label 1' },
      { title: 'Very Long Label 2' },
      { title: 'Current Page with a Very Long Label' },
    ],
  },
}

export const WithCustomItemRender: Story = {
  args: {
    separator: '>',
    items: [{ title: 'Page 1' }, { title: 'Page 2' }, { title: 'Current Page' }],
    itemRender: (item, index, items) => (
      <span style={{ color: item.title === items[1].title ? 'red' : 'black' }}>{item.title}</span>
    ),
  },
}

export const ExampleBasic: Story = {
  render: () => {
    return (
      <ExampleStory title="The simplest use.">
        <Breadcrumb
          items={[
            {
              title: 'Home',
            },
            {
              title: <a href="">Application Center</a>,
            },
            {
              title: <a href="">Application List</a>,
            },
            {
              title: 'An Application',
            },
          ]}
        />
      </ExampleStory>
    )
  },
}

export const ExampleIcon: Story = {
  render: () => {
    return (
      <ExampleStory title="The icon should be placed in front of the text.">
        <Breadcrumb
          items={[
            {
              href: '',
              title: <Icon name="alicorn" />,
            },
            {
              href: '',
              title: (
                <Center>
                  <Icon name="mpLogo" size="sm" />
                  <span style={{ paddingLeft: PaddingXs }}>Application List</span>
                </Center>
              ),
            },
            {
              title: 'Application',
            },
          ]}
        />
      </ExampleStory>
    )
  },
}

export const ExampleSeperator: Story = {
  render: () => {
    return (
      <ExampleStory title="The separator can be customized">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: 'Home',
            },
            {
              title: 'Application Center',
              href: '',
            },
            {
              title: 'Application List',
              href: '',
            },
            {
              title: 'An Application',
            },
          ]}
        />
      </ExampleStory>
    )
  },
}

export const ExampleDropdown: Story = {
  render: () => {
    const menuItems = [
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            General
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            Layout
          </a>
        ),
      },
      {
        key: '3',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            Navigation
          </a>
        ),
      },
    ]

    return (
      <ExampleStory title="Breadcrumbs support drop down menu.">
        <Breadcrumb
          items={[
            {
              title: 'Ant Design',
            },
            {
              title: <a href="">Component</a>,
            },
            {
              title: <a href="">General</a>,
              menu: { items: menuItems },
            },
            {
              title: 'Button',
            },
          ]}
        />
      </ExampleStory>
    )
  },
}

export const ExampleIndependentSeparators: Story = {
  render: () => {
    return (
      <ExampleStory title="Customize separator for each item.">
        <Breadcrumb
          separator=""
          items={[
            {
              title: 'Location',
            },
            {
              type: 'separator',
              separator: ':',
            },
            {
              href: '',
              title: 'Application Center',
            },
            {
              type: 'separator',
            },
            {
              href: '',
              title: 'Application List',
            },
            {
              type: 'separator',
            },
            {
              title: 'An Application',
            },
          ]}
        />
      </ExampleStory>
    )
  },
}
