import type { Meta, StoryObj } from '@storybook/react';
import { PhotoCarousel } from './PhotoCarousel';
import { Overlay } from '../Overlay';

const meta: Meta<typeof PhotoCarousel> = {
  title: 'Media/PhotoCarousel',
  component: PhotoCarousel,
  tags: ['!dev'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    images: {
      description: 'Array of image URLs to display',
      control: false,
      table: { type: { summary: 'string[]' } },
    },
    topOverlay: {
      description: 'Optional overlay content on top of photos (e.g., branding)',
      control: false,
      table: { type: { summary: 'React.ReactNode' } },
    },
    aspectRatio: {
      description: 'CSS aspect ratio for photos',
      control: 'select',
      options: ['16/9', '4/3', '1/1', '21/9'],
      table: { type: { summary: 'string' }, defaultValue: { summary: '16/9' } },
    },
    showDots: {
      description: 'Show navigation dots',
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    showArrows: {
      description: 'Show previous/next arrow buttons',
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    onPhotoChange: {
      description: 'Callback when photo index changes',
      control: false,
      table: { type: { summary: '(index: number) => void' } },
    },
    loading: {
      description: 'Loading state',
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    error: {
      description: 'Error state',
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    className: {
      description: 'Additional CSS class name',
      control: false,
      table: { type: { summary: 'string' } },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PhotoCarousel>;

const sampleImages = [
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&h=450&fit=crop',
];

export const Base: Story = {
  args: {
    images: sampleImages,
    aspectRatio: '16/9',
  },
};

export const SquareAspect: Story = {
  args: {
    images: sampleImages,
    aspectRatio: '1/1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Square aspect ratio for Instagram-style photos.',
      },
    },
  },
};

export const WithBranding: Story = {
  args: {
    images: sampleImages,
    aspectRatio: '16/9',
    topOverlay: (
      <Overlay background="#0066CC" height={32} position="top" align="center">
        <span style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>Brand Name</span>
      </Overlay>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'PhotoCarousel with branded overlay on top.',
      },
    },
  },
};

export const NoNavigation: Story = {
  args: {
    images: sampleImages,
    aspectRatio: '16/9',
    showDots: false,
    showArrows: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hide navigation dots and arrows for cleaner look.',
      },
    },
  },
};

export const SingleImage: Story = {
  args: {
    images: [sampleImages[0]],
    aspectRatio: '16/9',
  },
  parameters: {
    docs: {
      description: {
        story: 'Single image hides navigation controls automatically.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    images: sampleImages,
    aspectRatio: '16/9',
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state while photos are being fetched.',
      },
    },
  },
};

export const Error: Story = {
  args: {
    images: sampleImages,
    aspectRatio: '16/9',
    error: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Error state when photos fail to load.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    images: [],
    aspectRatio: '16/9',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no photos are available.',
      },
    },
  },
};

export const WideAspect: Story = {
  args: {
    images: sampleImages,
    aspectRatio: '21/9',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ultra-wide cinematic aspect ratio.',
      },
    },
  },
};
