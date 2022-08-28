import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import InputTextBoxE from "./InputTextBoxE";

export default {
  title: "Molecules/InputTextBox",
  component: InputTextBoxE,
} as ComponentMeta<typeof InputTextBoxE>;

export const Single: ComponentStoryObj<typeof InputTextBoxE> = {
  args: {
    title: "Title",
    multiLine: false,
    placeholder: "placeholder text",
    errorMessage: "",
    id: "inputTextBox-1",
  },
};

export const SingleWithError: ComponentStoryObj<typeof InputTextBoxE> = {
  args: {
    title: "Title",
    multiLine: false,
    placeholder: "placeholder text",
    errorMessage: "Error message",
    id: "inputTextBox-1",
  },
};

export const Multi: ComponentStoryObj<typeof InputTextBoxE> = {
  args: {
    title: "Title",
    multiLine: true,
    placeholder: "placeholder text",
    errorMessage: "",
    id: "inputTextBox-1",
  },
};

export const MultiWithError: ComponentStoryObj<typeof InputTextBoxE> = {
  args: {
    title: "Title",
    multiLine: true,
    placeholder: "placeholder text",
    errorMessage: "Error message",
    id: "inputTextBox-1",
  },
};
