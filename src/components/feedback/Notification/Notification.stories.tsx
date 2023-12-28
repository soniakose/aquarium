import * as React from "react";
import { Meta } from "@storybook/react";
import { StoryObj } from "@storybook/react";
import { Notification } from "src/components/feedback/Notification/Notification";
import { Button } from "antd";

const meta: Meta<typeof Notification> = {
  title: "Aquarium/Feedback/Notification",
  component: Notification,

  args: {
    type: "info",
    children: <Button type="primary">Show Notification</Button>,
    message: "Message",
    description: "Description goes here",
    duration: 0,
    btn: undefined,
    className: undefined,
    closeIcon: true,
    icon: undefined,
    key: undefined,
    placement: "topRight",
    style: undefined,
    role: "alert",
    onClick: function() { alert("Notification Clicked"); },
    onClose: function() { alert("Notification Closed"); },
  },
  argTypes: {
    role: {
      control: "select",
      options: ["alert", "status"],
    },
    type: {
      control: "select",
      options: ["info", "warning", "success", "error"],
    },
  },
};
export default meta;


type Story = StoryObj<typeof Notification>


export const Primary: Story = {};

export const Short: Story = {
  args: {
    duration: 1,
  },
};

export const Info: Story = {
  args: {
    type: "info",
  },
};
export const Warning: Story = {
  args: {
    type: "warning",
  },
};
export const Success: Story = {
  args: {
    type: "success",
  },
};
export const Error: Story = {
  args: {
    type: "error",
  },
}; 