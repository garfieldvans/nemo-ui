import type { Meta, StoryObj } from "@storybook/react";

import { Input, Textarea } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "outlined", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    color: {
      control: "select",
      options: ["primary", "neutral", "success", "warning", "error"],
    },
    fullWidth: {
      control: "boolean",
    },
    status: {
      control: "select",
      options: ["default", "error", "warning", "success"],
    },
    floatingLabel: {
      control: "boolean",
    },
    clearable: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    type: "email",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    helperText: "Must be at least 8 characters",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    value: "invalid-email",
    error: "Please enter a valid email address",
  },
};

export const WithWarning: Story = {
  args: {
    label: "Warning Input",
    placeholder: "Warning state",
    warning: "This field needs attention",
  },
};

export const WithSuccess: Story = {
  args: {
    label: "Success Input",
    placeholder: "Success state",
    success: "Data is valid",
    value: "valid@email.com",
  },
};

export const Filled: Story = {
  args: {
    label: "Filled Input",
    placeholder: "Filled variant",
    variant: "filled",
  },
};

export const Ghost: Story = {
  args: {
    label: "Ghost Input",
    placeholder: "Ghost variant",
    variant: "ghost",
  },
};

export const Small: Story = {
  args: {
    label: "Small Input",
    placeholder: "Small size",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    label: "Large Input",
    placeholder: "Large size",
    size: "lg",
  },
};

export const FullWidth: Story = {
  args: {
    label: "Full Width",
    placeholder: "Full width input",
    fullWidth: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    leftIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
};

export const WithRightIcon: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    rightIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
};

export const Clearable: Story = {
  args: {
    label: "Clearable Input",
    placeholder: "Type and clear",
    clearable: true,
    defaultValue: "Try clearing me",
  },
};

export const FloatingLabel: Story = {
  args: {
    label: "Floating Label",
    placeholder: " ",
    floatingLabel: true,
  },
};

export const WithPrefix: Story = {
  args: {
    label: "With Prefix",
    placeholder: "000",
    prefix: "$",
  },
};

export const WithSuffix: Story = {
  args: {
    label: "With Suffix",
    placeholder: "Search...",
    suffix: <span>@domain.com</span>,
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    label: "Both Prefix & Suffix",
    placeholder: "Amount",
    prefix: "IDR",
    suffix: ".00",
  },
};

export const RequiredField: Story = {
  args: {
    label: "Required Field",
    placeholder: "Required",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Disabled",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: "Readonly Input",
    value: "Cannot edit this",
    readOnly: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <Input label="Filled" placeholder="Filled variant" variant="filled" />
      <Input label="Outlined" placeholder="Outlined variant" variant="outlined" />
      <Input label="Ghost" placeholder="Ghost variant" variant="ghost" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <Input label="Small" placeholder="Small size" size="sm" />
      <Input label="Medium" placeholder="Medium size" size="md" />
      <Input label="Large" placeholder="Large size" size="lg" />
    </div>
  ),
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <Input label="Default" placeholder="Default state" />
      <Input label="Error" placeholder="Error state" error="Something went wrong" />
      <Input label="Warning" placeholder="Warning state" warning="Please check" />
      <Input label="Success" placeholder="Success state" success="All good" value="valid@email.com" />
    </div>
  ),
};

type TextareaStory = StoryObj<typeof Textarea>;

export const TextareaDefault: TextareaStory = {
  args: {
    placeholder: "Enter your message...",
    rows: 4,
  },
};

export const TextareaWithLabel: TextareaStory = {
  args: {
    label: "Message",
    placeholder: "Enter your message...",
    rows: 4,
  },
};

export const TextareaWithHelperText: TextareaStory = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself",
    helperText: "Maximum 500 characters",
    rows: 4,
  },
};

export const TextareaWithError: TextareaStory = {
  args: {
    label: "Message",
    placeholder: "Enter your message...",
    value: "short",
    error: "Message must be at least 10 characters",
    rows: 4,
  },
};

export const TextareaWithMaxLength: TextareaStory = {
  args: {
    label: "With Character Count",
    placeholder: "Max 100 characters",
    maxLength: 100,
    showCount: true,
    rows: 3,
  },
};

export const TextareaFilled: TextareaStory = {
  args: {
    label: "Filled Textarea",
    placeholder: "Filled variant",
    variant: "filled",
    rows: 4,
  },
};

export const TextareaGhost: TextareaStory = {
  args: {
    label: "Ghost Textarea",
    placeholder: "Ghost variant",
    variant: "ghost",
    rows: 4,
  },
};

export const TextareaSmall: TextareaStory = {
  args: {
    label: "Small Textarea",
    placeholder: "Small size",
    size: "sm",
    rows: 3,
  },
};

export const TextareaLarge: TextareaStory = {
  args: {
    label: "Large Textarea",
    placeholder: "Large size",
    size: "lg",
    rows: 5,
  },
};

export const TextareaClearable: TextareaStory = {
  args: {
    label: "Clearable Textarea",
    placeholder: "Type and clear",
    clearable: true,
    defaultValue: "Try clearing me",
    rows: 3,
  },
};

export const TextareaFloatingLabel: TextareaStory = {
  args: {
    label: "Floating Label",
    placeholder: " ",
    floatingLabel: true,
    rows: 3,
  },
};

export const TextareaWithLeftIcon: TextareaStory = {
  args: {
    label: "With Icon",
    placeholder: "Add a note...",
    leftIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    rows: 4,
  },
};

export const TextareaDisabled: TextareaStory = {
  args: {
    label: "Disabled Textarea",
    placeholder: "Disabled",
    disabled: true,
    rows: 3,
  },
};

export const TextareaReadOnly: TextareaStory = {
  args: {
    label: "Readonly Textarea",
    value: "This is readonly content",
    readOnly: true,
    rows: 3,
  },
};

export const TextareaAllVariants: TextareaStory = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "400px" }}>
      <Textarea label="Filled" placeholder="Filled variant" variant="filled" rows={3} />
      <Textarea label="Outlined" placeholder="Outlined variant" variant="outlined" rows={3} />
      <Textarea label="Ghost" placeholder="Ghost variant" variant="ghost" rows={3} />
    </div>
  ),
};

export const TextareaAllSizes: TextareaStory = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "400px" }}>
      <Textarea label="Small" placeholder="Small size" size="sm" rows={3} />
      <Textarea label="Medium" placeholder="Medium size" size="md" rows={3} />
      <Textarea label="Large" placeholder="Large size" size="lg" rows={3} />
    </div>
  ),
};

export const TextareaAllStatuses: TextareaStory = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "400px" }}>
      <Textarea label="Default" placeholder="Default state" rows={3} />
      <Textarea label="Error" placeholder="Error state" error="Something went wrong" rows={3} />
      <Textarea label="Warning" placeholder="Warning state" warning="Please check" rows={3} />
      <Textarea label="Success" placeholder="Success state" success="All good" rows={3} />
    </div>
  ),
};