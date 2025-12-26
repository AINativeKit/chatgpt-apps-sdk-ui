import type { Meta } from '@storybook/react';
import { ImageCard, type ImageCardProps } from './ImageCard';
import {
  PlusCircleAdd,
  UserHeart,
  InfoCircle,
} from '@openai/apps-sdk-ui/components/Icon';

const meta: Meta<ImageCardProps> = {
  title: 'Composed Components/Cards/ImageCard',
  component: ImageCard,
  tags: ['!dev'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    image: { control: false },
    actionIcon: { control: false },
    onAction: { control: false },
    onClick: { control: false },
    onImageLoad: { control: false },
    onImageError: { control: false },
    onErrorRetry: { control: false },
    imagePosition: {
      description: 'Image alignment within container',
      table: { defaultValue: { summary: 'center' } },
    },
    size: {
      description: 'Card size variant',
      table: { defaultValue: { summary: 'default' } },
    },
    loading: {
      description: 'Shows skeleton placeholder',
      table: { defaultValue: { summary: 'false' } },
    },
    error: {
      description: 'Shows error message when true',
      table: { defaultValue: { summary: 'false' } },
    },
    errorTitle: {
      description: 'Custom error title',
      table: { defaultValue: { summary: 'Failed to load' } },
    },
    badgePosition: {
      description: 'Badge position on the image',
      table: { defaultValue: { summary: 'top-right' } },
    },
    badgeVariant: {
      description: 'Badge visual style',
      table: { defaultValue: { summary: 'solid' } },
    },
    emptyTitle: {
      description: 'Empty state title',
      table: { defaultValue: { summary: 'No image' } },
    },
    badgeSize: {
      description: 'Badge size',
      table: { defaultValue: { summary: 'sm' } },
    },
    badgePill: {
      description: 'Use pill-shaped badge',
      table: { defaultValue: { summary: 'true' } },
    },
    badgeColor: {
      description: 'Badge color variant',
      table: { defaultValue: { summary: 'secondary' } },
    },
    titleLines: {
      description: 'Max lines for title (1-3)',
      table: { defaultValue: { summary: '1' } },
    },
    subtitleLines: {
      description: 'Max lines for subtitle (1-3)',
      table: { defaultValue: { summary: '1' } },
    },
    imageLoading: {
      description: 'Image loading strategy',
      table: { defaultValue: { summary: 'lazy' } },
    },
    elevationLevel: {
      description: 'Shadow elevation level (0-3)',
      table: { defaultValue: { summary: '1' } },
    },
  },
};

export default meta;

// Sample images
const SAMPLE_IMAGES = {
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&auto=format&fit=crop',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
  dessert: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&auto=format&fit=crop',
};

const CARD_WIDTH = 345;

// Base story
export const Base = (args: ImageCardProps) => <ImageCard {...args} />;

Base.args = {
  image: SAMPLE_IMAGES.pizza,
  title: 'Margherita Pizza',
  subtitle: 'Classic Italian',
  actionIcon: <PlusCircleAdd />,
  actionLabel: 'Add to cart',
  style: { maxWidth: `${CARD_WIDTH}px` },
};

Base.parameters = {
  docs: {
    source: {
      code: `<ImageCard
  image="/path/to/image.jpg"
  title="Margherita Pizza"
  subtitle="Classic Italian"
  actionIcon={<PlusCircleAdd />}
  actionLabel="Add to cart"
/>`,
    },
  },
};

// Image positions
export const ImagePositions = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <ImageCard
      image={SAMPLE_IMAGES.pasta}
      imagePosition="center"
      title="Center Position"
      subtitle="Default focal point"
      actionIcon={<PlusCircleAdd />}
      actionLabel="Add"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ImageCard
      image={SAMPLE_IMAGES.salad}
      imagePosition="top"
      title="Top Position"
      subtitle="Focuses on top"
      actionIcon={<PlusCircleAdd />}
      actionLabel="Add"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ImageCard
      image={SAMPLE_IMAGES.dessert}
      imagePosition="bottom"
      title="Bottom Position"
      subtitle="Focuses on bottom"
      actionIcon={<PlusCircleAdd />}
      actionLabel="Add"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
  </div>
);

ImagePositions.parameters = {
  docs: {
    source: {
      code: `// Center position (default)
<ImageCard imagePosition="center" {...props} />

// Top position
<ImageCard imagePosition="top" {...props} />

// Bottom position
<ImageCard imagePosition="bottom" {...props} />`,
    },
  },
};

// Content variations
export const ContentVariations = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <ImageCard image={SAMPLE_IMAGES.pizza} style={{ maxWidth: `${CARD_WIDTH}px` }} />
    <ImageCard
      image={SAMPLE_IMAGES.pasta}
      title="With Title Only"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ImageCard
      image={SAMPLE_IMAGES.salad}
      actionIcon={<UserHeart />}
      actionLabel="Add to favorites"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ImageCard
      image={SAMPLE_IMAGES.pizza}
      title="Full Content"
      subtitle="Title, subtitle, and action"
      actionIcon={<PlusCircleAdd />}
      actionLabel="Add to cart"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
  </div>
);

ContentVariations.parameters = {
  docs: {
    source: {
      code: `// Image only
<ImageCard image="/image.jpg" />

// With title
<ImageCard image="/image.jpg" title="With Title Only" />

// With action button
<ImageCard
  image="/image.jpg"
  actionIcon={<UserHeart />}
  actionLabel="Add to favorites"
/>

// Full content
<ImageCard
  image="/image.jpg"
  title="Full Content"
  subtitle="Title, subtitle, and action"
  actionIcon={<PlusCircleAdd />}
  actionLabel="Add to cart"
/>`,
    },
  },
};

// Compact size
export const CompactSize = (args: ImageCardProps) => <ImageCard {...args} />;

CompactSize.args = {
  image: SAMPLE_IMAGES.dessert,
  title: 'Compact Layout',
  subtitle: '240×240 footprint',
  actionIcon: <PlusCircleAdd />,
  actionLabel: 'Add to cart',
  size: 'compact',
  style: { maxWidth: '240px' },
};

CompactSize.parameters = {
  docs: {
    source: {
      code: `<ImageCard
  image="/image.jpg"
  title="Compact Layout"
  subtitle="240×240 footprint"
  size="compact"
/>`,
    },
  },
};

// Loading state
export const Loading = (args: ImageCardProps) => <ImageCard {...args} />;

Loading.args = {
  image: SAMPLE_IMAGES.pizza,
  title: 'Loading Card',
  subtitle: 'Classic Italian',
  actionIcon: <PlusCircleAdd />,
  actionLabel: 'Add to cart',
  loading: true,
  style: { maxWidth: `${CARD_WIDTH}px` },
};

Loading.parameters = {
  docs: {
    source: {
      code: `<ImageCard
  image="/image.jpg"
  title="Loading Card"
  loading
/>`,
    },
  },
};

// Error state
export const Error = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <ImageCard
      image={SAMPLE_IMAGES.pizza}
      title="Default Error"
      subtitle="Classic Italian"
      error
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ImageCard
      image={SAMPLE_IMAGES.pizza}
      title="With Retry"
      subtitle="Custom error message"
      error
      errorTitle="Failed to load"
      errorMessage="Unable to load this image. Please try again."
      onErrorRetry={() => console.log('Retry clicked')}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
  </div>
);

Error.parameters = {
  docs: {
    source: {
      code: `// Default error
<ImageCard image="/image.jpg" error />

// Custom error with retry
<ImageCard
  image="/image.jpg"
  error
  errorTitle="Failed to load"
  errorMessage="Unable to load this image. Please try again."
  onErrorRetry={() => handleRetry()}
/>`,
    },
  },
};

// Empty state
export const Empty = (args: ImageCardProps) => <ImageCard {...args} />;

Empty.args = {
  image: '',
  emptyTitle: 'No image',
  emptyMessage: 'Upload an image to get started',
  style: { maxWidth: `${CARD_WIDTH}px` },
};

Empty.parameters = {
  docs: {
    source: {
      code: `<ImageCard
  image=""
  emptyTitle="No image"
  emptyMessage="Upload an image to get started"
/>`,
    },
  },
};

// Badge support
export const WithBadge = (args: ImageCardProps) => <ImageCard {...args} />;

WithBadge.args = {
  image: SAMPLE_IMAGES.pizza,
  title: 'With Badge',
  subtitle: 'Status indicator',
  badge: 'New',
  badgeVariant: 'solid',
  badgeColor: 'info',
  actionIcon: <PlusCircleAdd />,
  actionLabel: 'Add to cart',
  style: { maxWidth: `${CARD_WIDTH}px` },
};

WithBadge.parameters = {
  docs: {
    source: {
      code: `<ImageCard
  image="/image.jpg"
  title="With Badge"
  badge="New"
  badgeVariant="solid"
  badgeColor="info"
/>`,
    },
  },
};

// Badge variants
export const BadgeVariants = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <ImageCard
      image={SAMPLE_IMAGES.pizza}
      title="Success Color"
      subtitle="Green for positive states"
      badge="In Stock"
      badgeVariant="solid"
      badgeColor="success"
      actionIcon={<PlusCircleAdd />}
      actionLabel="Add to cart"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ImageCard
      image={SAMPLE_IMAGES.pasta}
      title="Warning Color"
      subtitle="Orange for caution"
      badge="Low Stock"
      badgeVariant="solid"
      badgeColor="warning"
      actionIcon={<PlusCircleAdd />}
      actionLabel="Add to cart"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ImageCard
      image={SAMPLE_IMAGES.salad}
      title="Top Left Position"
      subtitle="Positioned top-left"
      badge="Sale"
      badgeVariant="soft"
      badgePosition="top-left"
      actionIcon={<PlusCircleAdd />}
      actionLabel="Add to cart"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ImageCard
      image={SAMPLE_IMAGES.dessert}
      title="Numeric Badge"
      subtitle="With pill shape"
      badge={12}
      badgeVariant="solid"
      badgePill
      actionIcon={<PlusCircleAdd />}
      actionLabel="Add to cart"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
  </div>
);

BadgeVariants.parameters = {
  docs: {
    source: {
      code: `// Success color
<ImageCard badge="In Stock" badgeVariant="solid" badgeColor="success" />

// Warning color
<ImageCard badge="Low Stock" badgeVariant="solid" badgeColor="warning" />

// Top-left position
<ImageCard badge="Sale" badgeVariant="soft" badgePosition="top-left" />

// Numeric with pill shape
<ImageCard badge={12} badgeVariant="solid" badgePill />`,
    },
  },
};

// Interactive
export const Interactive = (args: ImageCardProps) => <ImageCard {...args} />;

Interactive.args = {
  image: SAMPLE_IMAGES.pizza,
  title: 'Interactive Card',
  subtitle: 'Hover to see effect',
  actionIcon: <PlusCircleAdd />,
  actionLabel: 'Add to cart',
  interactive: true,
  onClick: () => console.log('Card clicked'),
  style: { maxWidth: `${CARD_WIDTH}px` },
};

Interactive.parameters = {
  docs: {
    source: {
      code: `<ImageCard
  image="/image.jpg"
  title="Interactive Card"
  subtitle="Hover to see effect"
  interactive
  onClick={() => console.log('Card clicked')}
/>`,
    },
  },
};

// Multi-line text
export const MultiLineText = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <ImageCard
      image={SAMPLE_IMAGES.pizza}
      title="This is a very long title that should wrap to two lines on smaller cards"
      titleLines={2}
      actionIcon={<PlusCircleAdd />}
      actionLabel="Add"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ImageCard
      image={SAMPLE_IMAGES.pasta}
      title="Long Title"
      subtitle="This is a very long subtitle that should wrap to two lines when there's enough text"
      subtitleLines={2}
      actionIcon={<PlusCircleAdd />}
      actionLabel="Add"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
  </div>
);

MultiLineText.parameters = {
  docs: {
    source: {
      code: `// 2-line title
<ImageCard
  title="This is a very long title that wraps"
  titleLines={2}
/>

// 2-line subtitle
<ImageCard
  title="Short Title"
  subtitle="This is a very long subtitle that wraps"
  subtitleLines={2}
/>`,
    },
  },
};

// Custom sizing
export const CustomSizing = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <ImageCard
      image={SAMPLE_IMAGES.dessert}
      title="16:9 Wide Card"
      subtitle="Custom aspect ratio"
      actionIcon={<InfoCircle />}
      actionLabel="Learn more"
      minHeight={200}
      aspectRatio="16 / 9"
      style={{ maxWidth: '360px' }}
    />
    <ImageCard
      image={SAMPLE_IMAGES.pizza}
      title="Square Card"
      subtitle="1:1 aspect ratio"
      actionIcon={<PlusCircleAdd />}
      actionLabel="Add"
      aspectRatio="1 / 1"
      style={{ maxWidth: '280px' }}
    />
  </div>
);

CustomSizing.parameters = {
  docs: {
    source: {
      code: `// 16:9 aspect ratio
<ImageCard
  image="/image.jpg"
  title="16:9 Wide Card"
  minHeight={200}
  aspectRatio="16 / 9"
/>

// Square aspect ratio
<ImageCard
  image="/image.jpg"
  title="Square Card"
  aspectRatio="1 / 1"
/>`,
    },
  },
};

// Elevation levels
export const ElevationLevels = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <ImageCard
      image={SAMPLE_IMAGES.pizza}
      title="Elevation 0"
      subtitle="Flat, no shadow"
      elevationLevel={0}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ImageCard
      image={SAMPLE_IMAGES.pizza}
      title="Elevation 1"
      subtitle="Default shadow"
      elevationLevel={1}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ImageCard
      image={SAMPLE_IMAGES.pizza}
      title="Elevation 3"
      subtitle="Higher elevation"
      elevationLevel={3}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
  </div>
);

ElevationLevels.parameters = {
  docs: {
    source: {
      code: `<ImageCard elevationLevel={0} /> // No shadow
<ImageCard elevationLevel={1} /> // Default
<ImageCard elevationLevel={3} /> // Higher elevation`,
    },
  },
};

// Image callbacks
export const WithImageCallbacks = (args: ImageCardProps) => <ImageCard {...args} />;

WithImageCallbacks.args = {
  image: SAMPLE_IMAGES.pasta,
  title: 'With Callbacks',
  subtitle: 'Check console for events',
  onImageLoad: () => console.log('Image loaded'),
  onImageError: () => console.error('Image failed'),
  style: { maxWidth: `${CARD_WIDTH}px` },
};

WithImageCallbacks.parameters = {
  docs: {
    source: {
      code: `<ImageCard
  image="/image.jpg"
  onImageLoad={() => console.log('Image loaded')}
  onImageError={() => console.error('Image failed')}
/>`,
    },
  },
};

// All states showcase
export const States = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Loading
      </div>
      <ImageCard
        image={SAMPLE_IMAGES.pizza}
        title="Loading State"
        loading
        style={{ maxWidth: `${CARD_WIDTH}px` }}
      />
    </div>
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Error
      </div>
      <ImageCard
        image={SAMPLE_IMAGES.pizza}
        title="Error State"
        error
        errorMessage="Failed to load"
        style={{ maxWidth: `${CARD_WIDTH}px` }}
      />
    </div>
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Empty
      </div>
      <ImageCard
        image=""
        emptyTitle="No image"
        emptyMessage="Upload an image"
        style={{ maxWidth: `${CARD_WIDTH}px` }}
      />
    </div>
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Normal
      </div>
      <ImageCard
        image={SAMPLE_IMAGES.pizza}
        title="Normal State"
        subtitle="Content displays normally"
        actionIcon={<PlusCircleAdd />}
        actionLabel="Add"
        style={{ maxWidth: `${CARD_WIDTH}px` }}
      />
    </div>
  </div>
);

States.parameters = {
  docs: {
    source: {
      code: `// Loading state
<ImageCard image="/image.jpg" loading />

// Error state
<ImageCard image="/image.jpg" error errorMessage="Failed to load" />

// Empty state
<ImageCard image="" emptyTitle="No image" />

// Normal state
<ImageCard
  image="/image.jpg"
  title="Normal State"
  subtitle="Content displays normally"
/>`,
    },
  },
};

// Real-world example
export const RealWorld = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <ImageCard
      image={SAMPLE_IMAGES.pizza}
      title="Margherita Pizza"
      subtitle="Tomato, mozzarella, basil"
      badge="Popular"
      badgeVariant="solid"
      badgeColor="info"
      actionIcon={<PlusCircleAdd />}
      actionLabel="Add to cart"
      interactive
      onClick={() => console.log('Added pizza')}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ImageCard
      image={SAMPLE_IMAGES.pasta}
      title="Spaghetti Carbonara"
      subtitle="Eggs, bacon, parmesan"
      actionIcon={<PlusCircleAdd />}
      actionLabel="Add to cart"
      interactive
      onClick={() => console.log('Added pasta')}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ImageCard
      image={SAMPLE_IMAGES.salad}
      title="Caesar Salad"
      subtitle="Romaine, croutons, dressing"
      badge="Healthy"
      badgeVariant="solid"
      badgeColor="success"
      actionIcon={<PlusCircleAdd />}
      actionLabel="Add to cart"
      interactive
      onClick={() => console.log('Added salad')}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ImageCard
      image={SAMPLE_IMAGES.dessert}
      title="Tiramisu"
      subtitle="Coffee-flavored dessert"
      actionIcon={<UserHeart />}
      actionLabel="Add to favorites"
      interactive
      onClick={() => console.log('Added dessert')}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
  </div>
);

RealWorld.parameters = {
  docs: {
    source: {
      code: `<ImageCard
  image="/pizza.jpg"
  title="Margherita Pizza"
  subtitle="Tomato, mozzarella, basil"
  badge="Popular"
  badgeVariant="solid"
  badgeColor="info"
  actionIcon={<PlusCircleAdd />}
  actionLabel="Add to cart"
  interactive
  onClick={() => handleAddToCart()}
/>`,
    },
  },
};
