import type { Meta, StoryObj } from "@storybook/react";
import PasswordInput, {
  PasswordInputProps,
} from "../components/PasswordInput/PasswordInput";

const meta = {
  title: "Form/PasswordInput",
  component: PasswordInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Defines the place holder for the input",
    },
    disabled: { control: "boolean", description: "Disables the input" },
    defaultValue: { control: "text", description: "Defines the initial value" },
    variant: {
      control: "select",
      options: [
        "floating",
        "red",
        "orange",
        "amber",
        "yellow",
        "green",
        "teal",
        "cyan",
        "blue",
        "indigo",
        "purple",
      ],
    },
  },
  args: {
    label: "Password Input",
    disabled: false,
    defaultValue: undefined,
    variant: undefined,
  },
} as Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Floating: Story = {
  args: {
    variant: "floating",
  },
};

export const Red: Story = {
  args: {
    variant: "red",
  },
};
