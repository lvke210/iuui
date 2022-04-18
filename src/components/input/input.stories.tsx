import Input from "./input";
import { ComponentMeta, ComponentStory } from "@storybook/react";
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Input",
  component: Input,
  argTypes: {
    disabled: {
      defaultValue: false,
      control: { type: "boolean" },
    },
  },
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Input>;
export const DefaultInput: ComponentStory<typeof Input> = (args: any) => (
  <>
    <Input {...args} />
  </>
);
