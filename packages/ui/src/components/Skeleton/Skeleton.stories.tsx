import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { ImageSkeleton } from './ImageSkeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['!dev'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    width: {
      description: 'Width of the skeleton (number for px, string for CSS value)',
      control: 'text',
      table: { type: { summary: 'string | number' } },
    },
    height: {
      description: 'Height of the skeleton (number for px, string for CSS value)',
      control: 'text',
      table: { type: { summary: 'string | number' }, defaultValue: { summary: '1em' } },
    },
    borderRadius: {
      description: 'Border radius override',
      control: 'text',
      table: { type: { summary: 'string | number' } },
    },
    className: {
      description: 'Additional CSS class name',
      control: false,
      table: { type: { summary: 'string' } },
    },
    style: {
      description: 'Additional inline styles',
      control: false,
      table: { type: { summary: 'CSSProperties' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Base: Story = {
  args: {
    width: 200,
    height: 20,
  },
};

export const TextLines: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 300 }}>
      <Skeleton width="100%" height={16} />
      <Skeleton width="100%" height={16} />
      <Skeleton width="60%" height={16} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple skeleton lines simulating text content.',
      },
    },
  },
};

export const Avatar: Story = {
  args: {
    width: 48,
    height: 48,
    borderRadius: '50%',
  },
  parameters: {
    docs: {
      description: {
        story: 'Circular skeleton for avatar placeholders.',
      },
    },
  },
};

export const Card: Story = {
  render: () => (
    <div style={{
      width: 300,
      padding: 16,
      border: '1px solid var(--color-border-subtle)',
      borderRadius: 12,
    }}>
      <Skeleton width="100%" height={160} borderRadius={8} />
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Skeleton width="70%" height={20} />
        <Skeleton width="100%" height={14} />
        <Skeleton width="80%" height={14} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card skeleton with image and text placeholders.',
      },
    },
  },
};

export const ImageSkeletonBase: Story = {
  render: () => (
    <ImageSkeleton width={300} height={200} borderRadius={8} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'ImageSkeleton with centered image icon.',
      },
    },
  },
};

export const ImageSkeletonCustomIcon: Story = {
  render: () => (
    <ImageSkeleton width={300} height={200} borderRadius={8} iconSize={48} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'ImageSkeleton with larger icon size.',
      },
    },
  },
};

export const ListItem: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: 350,
      padding: 12,
    }}>
      <Skeleton width={56} height={56} borderRadius={8} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Skeleton width="70%" height={16} />
        <Skeleton width="50%" height={14} />
      </div>
      <Skeleton width={32} height={32} borderRadius={8} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'List item skeleton with thumbnail, text, and action.',
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Full-width skeleton for responsive layouts.',
      },
    },
  },
};
