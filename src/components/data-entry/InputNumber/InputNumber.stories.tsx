import { Meta } from "@storybook/react";
import { StoryObj } from "@storybook/react";
import { InputNumber } from "src/components/data-entry/InputNumber/InputNumber";

const meta: Meta<typeof InputNumber> = {
  title: "Aquarium/Data Entry/InputNumber",
  component: InputNumber,

  args: {
    addonAfter: undefined,
    addonBefore: undefined,
    autoFocus: false,
    bordered: true,
    changeOnBlur: true,
    controls: true,
    decimalSeparator: ".",
    placeholder: "Enter a number",
    defaultValue: undefined,
    disabled: false,
    formatter: undefined,
    keyboard: true,
    max: Number.MAX_SAFE_INTEGER,
    min: Number.MIN_SAFE_INTEGER,
    parser: undefined,
    precision: undefined,
    readOnly: false,
    status: undefined,
    prefix: undefined,
    size: "middle",
    step: 1,
    stringMode: false,
    value: undefined,
    onChange: (value) => alert("InputNumber changed: " + value),
    onPressEnter: (e) => console.log("Enter key pressed:", e),
    onStep: (value, info) => console.log("Step:", value, info),
  },

  argTypes: {
    size: {
      control: "select",
      options: ["large", "middle", "small"],
    },
    status: {
      control: "select",
      options: ["error", "warning"],
    },
  },
};
export default meta;


type Story = StoryObj<typeof InputNumber>

/*
  Initial story templates generated by AI.
  Customize the stories based on specific requirements.
*/

export const Primary: Story = {
  args: {},
};


export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const Warning: Story = {
  args: {
    status: "warning",
  },
};

export const Error: Story = {
  args: {
    status: "error",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 42,
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: 123,
  },
};

export const $Prefix: Story = {
  args: {
    prefix: "$",
  },
};
export const StringMode: Story = {
  args: {
    stringMode: true,
    value: "42.50",
  },
};

export const WithControlsAndPrecision: Story = {
  args: {
    controls: true,
    precision: 2,
  },
};

export const DecimalSeparatorComma: Story = {
  args: {
    decimalSeparator: ",",
  },
};

export const WithFormatter: Story = {
  args: {
    formatter: (value, info) => `$${value}`,
  },
};

export const MinMaxConstraints: Story = {
  args: {
    min: 10,
    max: 100,
  },
};

export const Step0_5: Story = {
  args: {
    step: 0.5,
  },
};