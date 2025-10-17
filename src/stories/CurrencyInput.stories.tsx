import type { Meta, StoryObj } from "@storybook/react";
import CurrencyInput, {
  CurrencyInputProps,
} from "../components/CurrencyInput/CurrencyInput";

const meta = {
  title: "Form/CurrencyInput",
  component: CurrencyInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    currency: {
      control: "select",
      options: ["real", "dollar", "euro"],
    },
    icon: {
      control: "boolean",
    },
    label: {
      control: "text",
      description: "Defines the place holder for the input",
    },
    disabled: { control: "boolean", description: "Disables the input" },
    defaultValue: {
      control: "number",
      description: "Defines the initial value",
    },
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
    label: "Currency Input",
    icon: false,
    currency: "dollar",
    disabled: false,
    defaultValue: undefined,
    variant: undefined,
  },
} as Meta<typeof CurrencyInput>;

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

export const Orange: Story = {
  args: {
    variant: "orange",
  },
};

export const Amber: Story = {
  args: {
    variant: "amber",
  },
};

export const Yellow: Story = {
  args: {
    variant: "yellow",
  },
};

export const Green: Story = {
  args: {
    variant: "green",
  },
};

export const Teal: Story = {
  args: {
    variant: "teal",
  },
};

export const Cyan: Story = {
  args: {
    variant: "cyan",
  },
};

export const Blue: Story = {
  args: {
    variant: "blue",
  },
};

export const Indigo: Story = {
  args: {
    variant: "indigo",
  },
};

export const Purple: Story = {
  args: {
    variant: "purple",
  },
};
