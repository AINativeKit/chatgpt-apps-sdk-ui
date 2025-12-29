import type { Meta, StoryObj } from '@storybook/react';
import { ExpandableText } from './ExpandableText';

const meta: Meta<typeof ExpandableText> = {
  title: 'Utilities/ExpandableText',
  component: ExpandableText,
  tags: ['!dev'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      description: 'Text content to display',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    maxLines: {
      description: 'Maximum number of lines to show when collapsed',
      control: { type: 'number', min: 1, max: 10 },
      table: { type: { summary: 'number' }, defaultValue: { summary: '5' } },
    },
    expandLabel: {
      description: 'Label for expand button',
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'view more' } },
    },
    collapseLabel: {
      description: 'Label for collapse button',
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'view less' } },
    },
    className: {
      description: 'Additional CSS class name',
      control: false,
      table: { type: { summary: 'string' } },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ExpandableText>;

const shortText = 'This is a short piece of text that fits within the default line limit.';

const longText = `Award-winning Neapolitan pies in North Beach. A San Francisco institution serving authentic Italian pizza with locally-sourced ingredients. The wood-fired oven reaches temperatures of 900°F, creating the perfect char on our signature Margherita. Our dough is made fresh daily using imported Italian flour and aged for 72 hours. We source our tomatoes directly from San Marzano, Italy, and our mozzarella is made in-house every morning. The restaurant has been featured in numerous publications and has won multiple awards for its commitment to traditional Neapolitan pizza-making techniques.`;

export const Base: Story = {
  args: {
    text: longText,
    maxLines: 3,
  },
};

export const ShortText: Story = {
  args: {
    text: shortText,
    maxLines: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'When text fits within the line limit, the toggle button is hidden.',
      },
    },
  },
};

export const CustomLineClamp: Story = {
  args: {
    text: longText,
    maxLines: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Customize the number of visible lines with the `maxLines` prop.',
      },
    },
  },
};

export const CustomLabels: Story = {
  args: {
    text: longText,
    maxLines: 3,
    expandLabel: 'Read more',
    collapseLabel: 'Read less',
  },
  parameters: {
    docs: {
      description: {
        story: 'Customize the expand/collapse button labels.',
      },
    },
  },
};

export const SingleLine: Story = {
  args: {
    text: longText,
    maxLines: 1,
    expandLabel: 'more',
    collapseLabel: 'less',
  },
  parameters: {
    docs: {
      description: {
        story: 'Single line truncation with minimal labels.',
      },
    },
  },
};
