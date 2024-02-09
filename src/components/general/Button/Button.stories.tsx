import { Button } from 'src/components/general/Button/Button'
import { type Meta, type StoryObj } from '@storybook/react'
import { Icon } from 'src/components/general/Icon/Icon'
import { faHamburger } from '@awesome.me/kit-f3b115a3e2/icons/classic/light'
import { userEvent } from '@storybook/test'

const meta: Meta<typeof Button> = {
  title: 'Aquarium/General/Button',
  component: props => <Button {...props}>Button Text</Button>,

  args: {
    block: false,
    danger: false,
    disabled: false,
    ghost: false,
    href: undefined,
    htmlType: "button",
    icon: undefined,
    loading: false,
    shape: "default",
    size: "middle",
    target: undefined,
    type: "primary",
    onClick: undefined,
  },

  argTypes: {
    shape: {
      control: "select",
      options: ["default", "circle", "round"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    type: {
      control: "select",
      options: ["primary", "dashed", "link", "text", "default"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>

/*
  Initial story templates generated by AI.
  Customize the stories based on specific requirements.
*/

export const Primary: Story = {
  play: async context => {
    const button = context.canvasElement.querySelector("button");
    await userEvent.click(button); // Click the button
  },
};

export const Default: Story = {
  args: {
    type: "default",
  },
};

export const Dashed: Story = {
  args: {
    type: "dashed",
  },
};

export const Text: Story = {
  args: {
    type: "text",
  },
};

export const Link: Story = {
  args: {
    type: "link",
  },
};

export const WithDanger: Story = {
  args: {
    danger: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Ghost: Story = {
  args: {
    ghost: true,
  },
};

export const Block: Story = {
  args: {
    block: true,
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Icon icon={faHamburger}/>,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Circle: Story = {
  args: {
    shape: "circle",
  },
};

export const Round: Story = {
  args: {
    shape: "round",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const PrimaryButtonWithClick: Story = {
  args: {
    onClick: e => {
      alert("Button Clicked");
    },
  },
}