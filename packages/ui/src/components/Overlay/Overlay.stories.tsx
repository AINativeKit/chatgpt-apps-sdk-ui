import type { Meta, StoryObj } from '@storybook/react';
import { Overlay } from './Overlay';

const meta: Meta<typeof Overlay> = {
  title: 'Utilities/Overlay',
  component: Overlay,
  tags: ['!dev'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    background: {
      description: 'Background style (dark, light, transparent, or custom CSS color)',
      control: 'select',
      options: ['dark', 'light', 'transparent', '#0066CC', 'rgba(255, 0, 0, 0.5)'],
      table: { type: { summary: "'dark' | 'light' | 'transparent' | string" }, defaultValue: { summary: 'dark' } },
    },
    height: {
      description: 'Height of the overlay',
      control: { type: 'number', min: 20, max: 200 },
      table: { type: { summary: 'number | string' }, defaultValue: { summary: '56' } },
    },
    position: {
      description: 'Position of the overlay within the parent container',
      control: 'select',
      options: ['top', 'bottom'],
      table: { type: { summary: "'top' | 'bottom'" }, defaultValue: { summary: 'bottom' } },
    },
    align: {
      description: 'Horizontal alignment of content',
      control: 'select',
      options: ['left', 'center', 'right'],
      table: { type: { summary: "'left' | 'center' | 'right'" }, defaultValue: { summary: 'center' } },
    },
    padding: {
      description: 'Padding inside the overlay',
      control: { type: 'number', min: 0, max: 32 },
      table: { type: { summary: 'number' }, defaultValue: { summary: '8' } },
    },
    children: {
      description: 'Content to render inside the overlay',
      control: false,
      table: { type: { summary: 'React.ReactNode' } },
    },
    className: {
      description: 'Additional CSS class name',
      control: false,
      table: { type: { summary: 'string' } },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 400, height: 250, borderRadius: 12, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=250&fit=crop"
          alt="Pizza"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Overlay>;

export const Base: Story = {
  args: {
    background: 'dark',
    height: 56,
    align: 'center',
    children: <span style={{ color: 'white', fontWeight: 600 }}>Overlay Content</span>,
  },
};

export const Light: Story = {
  args: {
    background: 'light',
    height: 56,
    align: 'center',
    children: <span style={{ color: '#333', fontWeight: 600 }}>Light Overlay</span>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Semi-transparent light background for dark images.',
      },
    },
  },
};

export const BrandColor: Story = {
  args: {
    background: '#0066CC',
    height: 48,
    align: 'center',
    children: <span style={{ color: 'white', fontWeight: 600, fontSize: 14 }}>Brand Name</span>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom brand color background.',
      },
    },
  },
};

export const LeftAligned: Story = {
  args: {
    background: 'dark',
    height: 48,
    align: 'left',
    padding: 16,
    children: <span style={{ color: 'white' }}>Left aligned content</span>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Content aligned to the left with custom padding.',
      },
    },
  },
};

export const TopPosition: Story = {
  args: {
    background: 'dark',
    height: 48,
    position: 'top',
    align: 'center',
    children: <span style={{ color: 'white', fontWeight: 600 }}>Top Overlay</span>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Overlay positioned at the top of the container.',
      },
    },
  },
};

export const WithLogo: Story = {
  args: {
    background: 'transparent',
    height: 40,
    position: 'top',
    align: 'center',
    children: (
      <div style={{
        background: 'white',
        padding: '4px 12px',
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 600,
      }}>
        LOGO
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Transparent overlay with a logo badge at the top.',
      },
    },
  },
};

export const GradientOverlay: Story = {
  args: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
    height: 80,
    align: 'left',
    padding: 16,
    children: (
      <div style={{ color: 'white', alignSelf: 'flex-end' }}>
        <div style={{ fontWeight: 600 }}>Title Text</div>
        <div style={{ fontSize: 12, opacity: 0.8 }}>Subtitle</div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Gradient background for fade-out effect.',
      },
    },
  },
};
