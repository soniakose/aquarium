import { Meta } from "@storybook/react";
import { StoryObj } from "@storybook/react";
import { Tag } from "src/components/data-display/Tag/Tag";
import { Divider, Flex, Icon, Space } from "src/components";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ExampleStory } from "src/utils/ExampleStory";
import { useState } from "react";
import { JustifyCenter } from "src/components/layout/Flex/Flex.stories";
import { userEvent } from "@storybook/test";

const meta: Meta<typeof Tag> = {
  title: "Aquarium/Data Display/Tag",
  component: (props) => <Tag {...props}>Tag</Tag>,

  args: {
    closeIcon: false,
    color: "",
    icon: null,
    bordered: true,
    onClose: (e) => {
      alert("Tag Closed");
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const Primary: Story = {};

export const WithCustomCloseIcon: Story = {
  args: {
    closeIcon: true,
  },
};

export const WithColor: Story = {
  args: {
    color: "#3498db",
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Icon icon={faUser} />,
  },
};

export const WithoutBorder: Story = {
  args: {
    bordered: false,
  },
};

export const WithOnCloseCallback: Story = {
  args: {
    closeIcon: true,
    onClose: (e) => {
      alert("Tag Closed");
    },
  },
};

export const ExampleCheckableTagPrimary: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);

    return (
      <>
        <ExampleStory title="Basic checkable usage">
          <Flex justify="center">
            <Tag.CheckableTag
              checked={checked}
              bordered
              onChange={(checked) => {
                alert(`Tag ${checked ? "Checked" : "Unchecked"}`);
                setChecked((curr) => !curr);
              }}
            >
              Tag
            </Tag.CheckableTag>
          </Flex>
        </ExampleStory>
      </>
    );
  },
  play: async (context) => {
    const tag = context.canvasElement.querySelector(
      ".ant-tag.ant-tag-checkable"
    );
    expect(tag).not.toBeNull();
    expect(tag?.classList.contains("ant-tag-checkable-checked")).toBeTruthy();
    await userEvent.click(tag);
    expect(tag?.classList.contains("ant-tag-checkable-checked")).toBeFalsy();
  },
};

export const ExampleColors: Story = {
  render: () => {
    return (
      <>
        <Divider orientation="left">Presets</Divider>
        <Space size={[0, 8]} wrap>
          <Tag color="magenta">magenta</Tag>
          <Tag color="red">red</Tag>
          <Tag color="volcano">volcano</Tag>
          <Tag color="orange">orange</Tag>
          <Tag color="gold">gold</Tag>
          <Tag color="lime">lime</Tag>
          <Tag color="green">green</Tag>
          <Tag color="cyan">cyan</Tag>
          <Tag color="blue">blue</Tag>
          <Tag color="geekblue">geekblue</Tag>
          <Tag color="purple">purple</Tag>
        </Space>
        <Divider orientation="left">Custom</Divider>
        <Space size={[0, 8]} wrap>
          <Tag color="#f50">#f50</Tag>
          <Tag color="#2db7f5">#2db7f5</Tag>
          <Tag color="#87d068">#87d068</Tag>
          <Tag color="#108ee9">#108ee9</Tag>
        </Space>
      </>
    );
  },
};
