import Alert from "./alert";
import { ComponentMeta, ComponentStory } from "@storybook/react";
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Alert",
  component: Alert,
  argTypes: {
    onClick: { action: "clicked" },
    visible: {
      defaultValue: true,
      control: { type: "boolean" },
    },
    showClocseIcon: {
      defaultValue: true,
      control: { type: "boolean" },
    },
    title: {
      defaultValue: "title",
      control: { type: "text" },
    },

    type: {
      defaultValue: "default",
      options: ["success", "default", "danger", "warning"],
      control: "select",
    },
  },
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Alert>;

export const DefaultAlert: ComponentStory<typeof Alert> = (args: any) => {
  return (
    <>
      <Alert
        {...args}
        onCancel={() => {
          console.log(this);
        }}
      >
        Alert
      </Alert>
    </>
  );
};
