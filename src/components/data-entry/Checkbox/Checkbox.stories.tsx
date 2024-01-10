import { Meta } from "@storybook/react";
import { StoryObj } from "@storybook/react";
import { Checkbox } from "src/components/data-entry/Checkbox/Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Aquarium/Data Entry/Checkbox",
  component: Checkbox,

  args: {
    autoFocus: false,
    checked: false,
    defaultChecked: false,
    disabled: false,
    indeterminate: false,
  },
};
export default meta;


type Story = StoryObj<typeof Checkbox>

/*
  Initial story templates generated by AI.
  Customize the stories based on specific requirements.
*/

export const Primary: Story = {};

export const WithAutoFocus: Story = {
  args: {
    autoFocus: true,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const DefaultChecked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const WithOnChange: Story = {
  args: {
    onChange: (e) => alert("Checkbox Changed"),
  },
};