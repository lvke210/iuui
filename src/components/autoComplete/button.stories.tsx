import AutoCompltet from "./autoComplete";
import { ComponentMeta, ComponentStory } from "@storybook/react";
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "AutoCompltet",
  component: AutoCompltet,
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
} as ComponentMeta<typeof AutoCompltet>;
export const Primary: ComponentStory<typeof AutoCompltet> = (args: any) => (
  <>
    <AutoCompltet fetchSuggestions={() => []} />
  </>
);
