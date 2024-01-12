import * as React from "react";
import { Meta } from "@storybook/react";
import { StoryObj } from "@storybook/react";
import { Menu } from "src/components/navigation/Menu/Menu";
import { Icon } from "src/components/general/Icon/Icon";
import { faIcons } from "@fortawesome/free-solid-svg-icons";
import { MenuProps } from "antd";

const items: MenuProps['items'] = [
  {
    label: 'Navigation One',
    key: 'mail',
  },
  {
    label: 'Navigation Two',
    key: 'app',
    disabled: true,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: 'Navigation Four - Link',
    key: 'alipay',
  },
];


const meta: Meta<typeof Menu> = {
  title: "Aquarium/Navigation/Menu",
  component:props=><> <Menu {...props}>  {props.children}  </Menu></>,

  args: {
    children:<>Button</>,
    items,
    defaultOpenKeys: [],
    defaultSelectedKeys: [],
    expandIcon: undefined,
    forceSubMenuRender: false,
    inlineCollapsed: false,
    inlineIndent: 24,
    mode: "vertical",
    multiple: false,
    // openKeys: [],
    overflowedIndicator: <>...</>,
    selectable: true,
    selectedKeys: ['mail'],
    style: undefined,
    subMenuCloseDelay: 0.1,
    subMenuOpenDelay: 0,
    theme: "light",
    triggerSubMenuAction: "hover",
    onClick: ({ item, key, keyPath, domEvent }) => { alert(`Clicked on ${item}`); },
    onDeselect: ({ item, key, keyPath, selectedKeys, domEvent }) => { alert(`Deselected ${item}`); },
    onOpenChange: (openKeys: string[]) => { console.log(`Opened or Closed Sub-menus: ${openKeys.join(", ")}`); },
    onSelect: ({ item, key, keyPath, selectedKeys, domEvent }) => { alert(`Selected ${item}`); },
  },

  argTypes: {
    mode: {
      control: "select",
      options: ["vertical", "horizontal", "inline"],
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
    },
    triggerSubMenuAction: {
      control: "select",
      options: ["hover", "click"],
    },
  },
};
export default meta;


type Story = StoryObj<typeof Menu>


/*
  Initial story templates generated by AI.
  Customize the stories based on specific requirements.
*/

export const Primary: Story = {};

export const Inline: Story = {
  args: {
    mode: "inline",
  },
};

export const Horizontal: Story = {
  args: {
    mode: "horizontal",
  },
};

export const MultipleSelection: Story = {
  args: {
    multiple: true,
  },
};

export const CustomExpandIcon: Story = {
  args: {
    expandIcon: (props) => <Icon icon={faIcons}/>,
  },
};

export const InlineCollapsedState: Story = {
  args: {
    inlineCollapsed: true,
  },
};

export const Dark: Story = {
  args: {
    theme: "dark",
  },
};

export const CustomStyle: Story = {
  args: {
    style: { backgroundColor: "#f0f0f0" },
  },
};

export const WithSubMenuDelay: Story = {
  args: {
    subMenuOpenDelay: 0.2,
    subMenuCloseDelay: 0.2,
  },
};