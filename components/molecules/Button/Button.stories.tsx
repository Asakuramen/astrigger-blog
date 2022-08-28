import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import Button from "./Button";

export default {
  title: "Molecules/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const Primary: ComponentStoryObj<typeof Button> = {
  args: {
    children: "button text",
    disabled: false,
    styleType: "primary",
  },
};

export const Secondary: ComponentStoryObj<typeof Button> = {
  args: {
    children: "button text",
    disabled: false,
    styleType: "secondary",
  },
};

export const Danger: ComponentStoryObj<typeof Button> = {
  args: {
    children: "button text",
    disabled: false,
    styleType: "danger",
  },
};

export const Disabled: ComponentStoryObj<typeof Button> = {
  args: {
    children: "loading ...",
    disabled: true,
    styleType: "disabled",
  },
};
