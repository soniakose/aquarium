import { type Meta, type StoryObj } from '@storybook/react'
import { Mentions } from 'src/components/data-entry/Mentions/Mentions'
import { ExampleStory } from 'src/utils/ExampleStory'
import { Flex } from 'src/components'
import { useCallback } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { Form } from 'src/components'
import { Button } from 'src/components'
import { Space } from 'antd'
import MpLogo from 'src/assets/svg/mpLogo.svg?react'

const meta: Meta<typeof Mentions> = {
  title: 'Aquarium/Data Entry/Mentions',
  component: Mentions,

  args: {},
}
export default meta

type Story = StoryObj<typeof Mentions>

/*
  Initial story templates generated by AI.
  Customize the stories based on specific requirements.
*/

export const Primary: Story = {
  args: {
    allowClear: false,
    autoFocus: false,
    autoSize: false,
    defaultValue: '',
    filterOption: false,
    notFoundContent: 'Not Found',
    placement: 'bottom',
    prefix: '@',
    split: ' ',
    status: undefined,
    validateSearch: undefined,
    value: '',
    variant: 'outlined',
    options: [
      { value: 'JohnDoe', label: 'John Doe' },
      { value: 'JaneDoe', label: 'Jane Doe' },
      { value: 'BobSmith', label: 'Bob Smith' },
    ],
    getPopupContainer: () => document.body,
    onBlur: () => {},
    onChange: text => {
      console.log(`Text Changed: ${text}`)
    },
    onFocus: () => {},
    onResize: ({ width, height }) => {
      console.log(`Textarea Resized: Width - ${width}, Height - ${height}`)
    },
    onSearch: (text, prefix) => {
      alert(`Search Triggered: Text - ${text}, Prefix - ${prefix}`)
    },
    onSelect: (option, prefix) => {
      alert(`Option Selected: ${option.value}, Prefix - ${prefix}`)
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'borderless', 'filled'],
    },
    status: {
      control: 'select',
      options: ['error', 'warning'],
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom'],
    },
  },
}

export const Clearable: Story = {
  args: {
    allowClear: true,
  },
}

export const AutoFocus: Story = {
  args: {
    autoFocus: true,
  },
}

export const AutoSize: Story = {
  args: {
    autoSize: true,
  },
}

export const CustomNotFoundContent: Story = {
  args: {
    notFoundContent: 'No Matches Found',
  },
}

export const Borderless: Story = {
  args: {
    variant: 'borderless',
  },
}

export const Warning: Story = {
  args: {
    status: 'warning',
  },
}

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Custom Placeholder...',
  },
}

export const ExampleBasic: Story = {
  render: () => {
    return (
      <ExampleStory title="Basic Usage">
        <Mentions
          style={{ width: '100%' }}
          onChange={value => {
            console.log('Change:', value)
          }}
          onSelect={console.log}
          defaultValue="@afc163"
          options={[
            {
              value: 'afc163',
              label: 'afc163',
            },
            {
              value: 'zombieJ',
              label: 'zombieJ',
            },
            {
              value: 'yesmeck',
              label: 'yesmeck',
            },
          ]}
        />
      </ExampleStory>
    )
  },
}

export const ExampleVariants: Story = {
  render: () => {
    return (
      <ExampleStory title="Variants of Mentions">
        <Flex vertical gap={12}>
          <Mentions placeholder="Outlined" />
          <Mentions placeholder="Filled" variant="filled" />
          <Mentions placeholder="Borderless" variant="borderless" />
        </Flex>
      </ExampleStory>
    )
  },
}

type ItemType = {
  login: string
  avatar_url: string
}

export const ExampleAsync: Story = {
  render: () => {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState<ItemType[]>([])
    const ref = useRef<string>()
    const loadGithubUsers = (key: string) => {
      if (!key) {
        setUsers([])
        return
      }
      void fetch(`https://api.github.com/search/users?q=${key}`)
        .then(async res => await res.json())
        .then(({ items = [] }: { items: ItemType[] }) => {
          if (ref.current !== key) return
          setLoading(false)
          setUsers(items.slice(0, 10) ?? [])
        })
    }
    const debounceLoadGithubUsers = useCallback(loadGithubUsers, [])
    const onSearch = (search: string) => {
      console.log('Search:', search)
      ref.current = search
      setLoading(!!search)
      setUsers([])
      debounceLoadGithubUsers(search)
    }
    return (
      <ExampleStory title="Async loading from github [begin with @] ">
        <Mentions
          style={{ width: '100%' }}
          loading={loading}
          onSearch={onSearch}
          options={users.map(({ login, avatar_url: avatar }) => ({
            key: login,
            value: login,
            className: 'antd-demo-dynamic-option',
            label: (
              <>
                <img src={avatar} alt={login} />
                <span>{login}</span>
              </>
            ),
          }))}
        />
      </ExampleStory>
    )
  },
}

export const ExampleForm: Story = {
  render: () => {
    const [form] = Form.useForm()

    const onReset = () => {
      form.resetFields()
    }

    const onFinish = async () => {
      try {
        const values = await form.validateFields()
        console.log('Submit:', values)
      } catch (errInfo) {
        console.log('Error:', errInfo)
      }
    }

    const checkMention = async (_: any, value: string) => {
      const mentions = Mentions.getMentions(value)

      if (mentions.length < 2) {
        throw new Error('More than one must be selected!')
      }
    }
    return (
      <ExampleStory title="Controlled mode, for example, to work with Form.">
        <Form
          form={form}
          layout="horizontal"
          onFinish={() => {
            void onFinish()
          }}>
          <Form.Item
            name="coders"
            label="Top coders"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            rules={[{ validator: checkMention }]}>
            <Mentions
              rows={1}
              options={[
                {
                  value: 'afc163',
                  label: 'afc163',
                },
                {
                  value: 'zombieJ',
                  label: 'zombieJ',
                },
                {
                  value: 'yesmeck',
                  label: 'yesmeck',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="bio"
            label="Bio"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            rules={[{ required: true }]}>
            <Mentions
              rows={3}
              placeholder="You can use @ to ref user here"
              options={[
                {
                  value: 'afc163',
                  label: 'afc163',
                },
                {
                  value: 'zombieJ',
                  label: 'zombieJ',
                },
                {
                  value: 'yesmeck',
                  label: 'yesmeck',
                },
              ]}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
            <Space wrap>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </ExampleStory>
    )
  },
}

export const ExampleDisabledOrReadOnly: Story = {
  render: () => {
    const options = ['afc163', 'zombiej', 'yesmeck'].map(value => ({
      value,
      key: value,
      label: value,
    }))
    return (
      <ExampleStory title="Configure disabled and readOnly.">
        <>
          <div style={{ marginBottom: 10 }}>
            <Mentions style={{ width: '100%' }} placeholder="this is disabled Mentions" disabled options={options} />
          </div>
          <Mentions style={{ width: '100%' }} placeholder="this is readOnly Mentions" readOnly options={options} />
        </>
      </ExampleStory>
    )
  },
}

export const ExampleClearIcon: Story = {
  render: () => {
    const [value, setValue] = useState('hello world')
    return (
      <ExampleStory title="Customize clear button.">
        <>
          <Mentions value={value} onChange={setValue} allowClear />
          <br />
          <br />
          <Mentions value={value} onChange={setValue} allowClear={{ clearIcon: <MpLogo /> }} />
          <br />
          <br />
          <Mentions value={value} onChange={setValue} allowClear rows={3} />
        </>
      </ExampleStory>
    )
  },
}

export const ExampleStatus: Story = {
  render: () => {
    const onChange = (value: string) => {
      console.log('Change:', value)
    }

    const options = [
      {
        value: 'afc163',
        label: 'afc163',
      },
      {
        value: 'zombieJ',
        label: 'zombieJ',
      },
      {
        value: 'yesmeck',
        label: 'yesmeck',
      },
    ]

    return (
      <ExampleStory title="Add status to Mentions with status, which could be error or warning。">
        <Space direction="vertical">
          <Mentions
            onChange={onChange}
            onSelect={console.log}
            defaultValue="@afc163"
            status="error"
            options={options}
          />
          <Mentions
            onChange={onChange}
            onSelect={console.log}
            defaultValue="@afc163"
            status="warning"
            options={options}
          />
        </Space>
      </ExampleStory>
    )
  },
}
