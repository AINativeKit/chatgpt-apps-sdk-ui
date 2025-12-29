import type { Meta, StoryObj } from '@storybook/react';
import { Features } from './Features';
import { StarFilled, Clock, MapPin, CheckCircleFilled } from '@openai/apps-sdk-ui/components/Icon';

const meta: Meta<typeof Features> = {
  title: 'Utilities/Features',
  component: Features,
  tags: ['!dev'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    items: {
      description: 'Array of feature items (strings or objects with icon and label)',
      control: false,
      table: { type: { summary: 'FeatureItem[]' } },
    },
    separator: {
      description: 'Separator character between items',
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: '•' } },
    },
    className: {
      description: 'Additional CSS class name',
      control: false,
      table: { type: { summary: 'string' } },
    },
    style: {
      description: 'Inline styles',
      control: false,
      table: { type: { summary: 'CSSProperties' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Features>;

export const Base: Story = {
  args: {
    items: ['Neapolitan', 'Wood-fired', 'Fresh ingredients'],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { icon: <StarFilled />, label: '4.8' },
      { icon: <Clock />, label: 'Open now' },
      { icon: <MapPin />, label: 'North Beach' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Features with icons from @openai/apps-sdk-ui.',
      },
    },
  },
};

export const Mixed: Story = {
  args: {
    items: [
      { icon: <StarFilled />, label: '4.8' },
      '$$$',
      'Neapolitan',
      { icon: <CheckCircleFilled />, label: 'Verified' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Mix of icon-label objects and plain strings.',
      },
    },
  },
};

export const CustomSeparator: Story = {
  args: {
    items: ['Feature 1', 'Feature 2', 'Feature 3'],
    separator: '|',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use a custom separator character.',
      },
    },
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ icon: <StarFilled />, label: '4.8 rating' }],
  },
  parameters: {
    docs: {
      description: {
        story: 'Single item displays without separator.',
      },
    },
  },
};

export const PriceAndRating: Story = {
  args: {
    items: [
      { icon: <StarFilled />, label: '4.8' },
      { label: '$$$' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Common pattern for price and rating display.',
      },
    },
  },
};
