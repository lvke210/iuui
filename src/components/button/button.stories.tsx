import Button from "./button";
import { ComponentMeta, ComponentStory } from "@storybook/react";
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Button",
  component: Button,
  argTypes: {
    onClick: { action: "clicked" },
    btnType: {
      defaultValue: "primary",
      options: ["primary", "default", "danger", "warning"],
      control: { type: "select" },
    },
    size: {
      defaultValue: "normal",
      options: ["normal", "large", "small"],
      control: { type: "radio" },
    },
    disabled: {
      defaultValue: false,
      control: { type: "boolean" },
    },
  },
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Button>;
export const Primary: ComponentStory<typeof Button> = (args: any) => (
  <>
    <Button {...args}>button</Button>
    <br />
    <Button btnType="primary">button</Button>
    <Button btnType="default">button</Button>
    <Button btnType="danger">button</Button>
    <Button size="large">button</Button>
    <Button size="small">button</Button>
    <Button disabled={true}>button</Button>
  </>
);
