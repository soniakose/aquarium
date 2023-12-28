import * as React from "react";
import { Meta } from "@storybook/react";
import { StoryObj } from "@storybook/react";
import { Breadcrumb } from "src/components/navigation/Breadcrumb/Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Aquarium/Navigation/Breadcrumb",
  component: Breadcrumb,

  args: {
    separator: "/",
    items: [
      { title: "Home" },
      { title: "Category" },
      { title: "Subcategory" },
      { title: "Current Page" },
    ],
  },
};
export default meta;


type Story = StoryObj<typeof Breadcrumb>


/*
  Initial story templates generated by AI.
  Customize the stories based on specific requirements.
*/

export const Primary: Story = {};

export const WithCustomSeparator: Story = {
  args: {
    separator: ">",
  },
};

export const WithLongItemLabels: Story = {
  args: {
    items: [
      { title: "Very Long Label 1" },
      { title: "Very Long Label 2" },
      { title: "Current Page with a Very Long Label" },
    ],
  },
};

export const WithCustomItemRender: Story = {
  args: {
    separator: ">",
    items: [
      { title: "Page 1" },
      { title: "Page 2" },
      { title: "Current Page" },
    ],
    itemRender: (item, index, items) => (
      <span style={{ color: item.title === items[1].title ? "red" : "black" }}>{item.title}</span>
    ),
  },
};