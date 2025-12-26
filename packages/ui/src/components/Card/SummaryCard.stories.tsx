import type { Meta } from '@storybook/react';
import { SummaryCard, type SummaryCardProps } from './SummaryCard';
import { Clock, MapPin, StarFilled } from '@openai/apps-sdk-ui/components/Icon';

const meta: Meta<SummaryCardProps> = {
  title: 'Composed Components/Cards/SummaryCard',
  component: SummaryCard,
  tags: ['!dev'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    images: { description: 'Single image URL or array of image URLs', control: false },
    metadata: { description: 'Metadata items with icon and text', control: false },
    topOverlay: { description: 'Content to overlay on top of images', control: false },
    onButtonClick: { description: 'Callback when action button is clicked', control: false },
    onErrorRetry: { description: 'Callback when retry button is clicked', control: false },
    onImageLoad: { description: 'Callback when single image loads', control: false },
    onImageError: { description: 'Callback when single image fails to load', control: false },
    onImagesLoad: { description: 'Callback when carousel images load', control: false },
    onImagesError: { description: 'Callback when carousel images fail to load', control: false },
    variant: {
      description: 'Card layout variant',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      description: 'Card size variant',
      table: { defaultValue: { summary: 'default' } },
    },
    imageAspectRatio: {
      description: 'Image aspect ratio',
      table: { defaultValue: { summary: 'auto' } },
    },
    descriptionLines: {
      description: 'Max lines for description (1-3)',
      table: { defaultValue: { summary: '2' } },
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
    emptyTitle: {
      description: 'Empty state title',
      table: { defaultValue: { summary: 'No content' } },
    },
    badgeVariant: {
      description: 'Badge visual style',
      table: { defaultValue: { summary: 'soft' } },
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
  restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
  dessert: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80',
};

const CARD_WIDTH = 345;

// Base story
export const Base = (args: SummaryCardProps) => <SummaryCard {...args} />;

Base.args = {
  images: SAMPLE_IMAGES.restaurant,
  imageAspectRatio: '4/3',
  title: "Little Nona's",
  subtitle: '1427 Via Campania',
  badge: '9.2',
  description:
    'A tiny, brick-walled trattoria tucked down a side street near Washington Square Park.',
  descriptionLines: 2,
  buttonText: 'Reserve Table',
  onButtonClick: () => console.log('Reserve clicked'),
  style: { maxWidth: `${CARD_WIDTH}px` },
};

Base.parameters = {
  docs: {
    source: {
      code: `<SummaryCard
  images="/restaurant.jpg"
  imageAspectRatio="4/3"
  title="Little Nona's"
  subtitle="1427 Via Campania"
  badge="9.2"
  description="A tiny, brick-walled trattoria tucked down a side street."
  descriptionLines={2}
  buttonText="Reserve Table"
  onButtonClick={() => console.log('Reserve clicked')}
/>`,
    },
  },
};

// Image layouts
export const ImageLayouts = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <SummaryCard
      images={SAMPLE_IMAGES.restaurant}
      imageAspectRatio="4/3"
      title="Single Image"
      subtitle="Full-width display"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <SummaryCard
      images={[SAMPLE_IMAGES.pizza, SAMPLE_IMAGES.pasta, SAMPLE_IMAGES.salad]}
      title="Image Grid"
      subtitle="3-image grid layout"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
  </div>
);

ImageLayouts.parameters = {
  docs: {
    source: {
      code: `// Single image
<SummaryCard images="/restaurant.jpg" imageAspectRatio="4/3" />

// Image grid (3 images)
<SummaryCard images={['/pizza.jpg', '/pasta.jpg', '/salad.jpg']} />`,
    },
  },
};

// Image aspect ratios
export const ImageAspectRatios = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <SummaryCard
      images={SAMPLE_IMAGES.restaurant}
      imageAspectRatio="16/9"
      title="16:9 Widescreen"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <SummaryCard
      images={SAMPLE_IMAGES.restaurant}
      imageAspectRatio="4/3"
      title="4:3 Classic"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <SummaryCard
      images={SAMPLE_IMAGES.restaurant}
      imageAspectRatio="1/1"
      title="1:1 Square"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
  </div>
);

ImageAspectRatios.parameters = {
  docs: {
    source: {
      code: `<SummaryCard imageAspectRatio="16/9" /> // Widescreen
<SummaryCard imageAspectRatio="4/3" />  // Classic
<SummaryCard imageAspectRatio="1/1" />  // Square`,
    },
  },
};

// With badge
export const WithBadge = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <SummaryCard
      images={SAMPLE_IMAGES.restaurant}
      imageAspectRatio="4/3"
      title="Rating Badge"
      subtitle="Numeric rating"
      badge="9.2"
      badgeVariant="soft"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <SummaryCard
      images={SAMPLE_IMAGES.restaurant}
      imageAspectRatio="4/3"
      title="Status Badge"
      subtitle="Text status"
      badge="Open Now"
      badgeVariant="solid"
      badgeColor="success"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <SummaryCard
      images={SAMPLE_IMAGES.restaurant}
      imageAspectRatio="4/3"
      title="Featured Badge"
      subtitle="Highlighted item"
      badge="Featured"
      badgeVariant="solid"
      badgeColor="info"
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
  </div>
);

WithBadge.parameters = {
  docs: {
    source: {
      code: `// Rating badge
<SummaryCard badge="9.2" badgeVariant="soft" />

// Status badge
<SummaryCard badge="Open Now" badgeVariant="solid" badgeColor="success" />

// Featured badge
<SummaryCard badge="Featured" badgeVariant="solid" badgeColor="info" />`,
    },
  },
};

// With metadata
export const WithMetadata = (args: SummaryCardProps) => <SummaryCard {...args} />;

WithMetadata.args = {
  images: SAMPLE_IMAGES.restaurant,
  imageAspectRatio: '4/3',
  title: "Little Nona's",
  subtitle: 'Italian Restaurant',
  description: 'Authentic Italian cuisine in a cozy atmosphere.',
  metadata: [
    { icon: <StarFilled />, label: '4.8' },
    { icon: <Clock />, label: '30 min' },
    { icon: <MapPin />, label: '0.5 mi' },
  ],
  buttonText: 'View Details',
  style: { maxWidth: `${CARD_WIDTH}px` },
};

WithMetadata.parameters = {
  docs: {
    source: {
      code: `import { StarFilled, Clock, MapPin } from '@openai/apps-sdk-ui/components/Icon';

<SummaryCard
  images="/restaurant.jpg"
  title="Little Nona's"
  metadata={[
    { icon: <StarFilled />, label: '4.8' },
    { icon: <Clock />, label: '30 min' },
    { icon: <MapPin />, label: '0.5 mi' },
  ]}
/>`,
    },
  },
};

// Compact size - shows both sizes with buttons for comparison
export const CompactSize = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <div>
      <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
        Default size (button: 44px)
      </p>
      <SummaryCard
        images={SAMPLE_IMAGES.restaurant}
        imageAspectRatio="4/3"
        title="Little Nona's"
        subtitle="Italian • $$"
        badge="9.2"
        buttonText="Reserve"
        style={{ maxWidth: '320px' }}
      />
    </div>
    <div>
      <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
        Compact size (button: 36px)
      </p>
      <SummaryCard
        images={SAMPLE_IMAGES.restaurant}
        imageAspectRatio="4/3"
        title="Little Nona's"
        subtitle="Italian • $$"
        badge="9.2"
        size="compact"
        buttonText="Reserve"
        style={{ maxWidth: '280px' }}
      />
    </div>
  </div>
);

CompactSize.parameters = {
  docs: {
    source: {
      code: `{/* Default size - 44px button */}
<SummaryCard
  images="/restaurant.jpg"
  title="Little Nona's"
  buttonText="Reserve"
/>

{/* Compact size - 36px button */}
<SummaryCard
  images="/restaurant.jpg"
  title="Little Nona's"
  size="compact"
  buttonText="Reserve"
/>`,
    },
  },
};

// Flat variant
export const FlatVariant = (args: SummaryCardProps) => <SummaryCard {...args} />;

FlatVariant.args = {
  images: SAMPLE_IMAGES.restaurant,
  imageAspectRatio: '4/3',
  title: "Little Nona's",
  subtitle: '1427 Via Campania',
  description: 'A tiny, brick-walled trattoria with authentic Italian cuisine.',
  variant: 'flat',
  buttonText: 'Reserve',
  style: { maxWidth: `${CARD_WIDTH}px` },
};

FlatVariant.parameters = {
  docs: {
    source: {
      code: `<SummaryCard
  images="/restaurant.jpg"
  title="Little Nona's"
  variant="flat"
  buttonText="Reserve"
/>`,
    },
  },
};

// Loading state
export const Loading = (args: SummaryCardProps) => <SummaryCard {...args} />;

Loading.args = {
  images: SAMPLE_IMAGES.restaurant,
  imageAspectRatio: '4/3',
  title: "Little Nona's",
  subtitle: '1427 Via Campania',
  badge: '9.2',
  description: 'Loading card content...',
  descriptionLines: 2,
  buttonText: 'Reserve Table',
  loading: true,
  style: { maxWidth: `${CARD_WIDTH}px` },
};

Loading.parameters = {
  docs: {
    source: {
      code: `<SummaryCard
  images="/restaurant.jpg"
  title="Little Nona's"
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
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <SummaryCard error style={{ maxWidth: `${CARD_WIDTH}px` }} />
    <SummaryCard
      error
      errorTitle="Failed to load"
      errorMessage="Unable to fetch restaurant details. Please try again."
      onErrorRetry={() => console.log('Retry clicked')}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
  </div>
);

Error.parameters = {
  docs: {
    source: {
      code: `// Default error
<SummaryCard error />

// Custom error with retry
<SummaryCard
  error
  errorTitle="Failed to load"
  errorMessage="Unable to fetch restaurant details."
  onErrorRetry={() => handleRetry()}
/>`,
    },
  },
};

// Empty state
export const Empty = (args: SummaryCardProps) => <SummaryCard {...args} />;

Empty.args = {
  emptyTitle: 'No restaurant found',
  emptyMessage: 'Try adjusting your search criteria',
  style: { maxWidth: `${CARD_WIDTH}px` },
};

Empty.parameters = {
  docs: {
    source: {
      code: `<SummaryCard
  emptyTitle="No restaurant found"
  emptyMessage="Try adjusting your search criteria"
/>`,
    },
  },
};

// With overlay
export const WithOverlay = (args: SummaryCardProps) => <SummaryCard {...args} />;

WithOverlay.args = {
  images: SAMPLE_IMAGES.restaurant,
  imageAspectRatio: '4/3',
  title: "Little Nona's",
  subtitle: '1427 Via Campania',
  topOverlay: (
    <SummaryCard.Overlay background="dark" height={40} align="center">
      <span style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>Featured Partner</span>
    </SummaryCard.Overlay>
  ),
  style: { maxWidth: `${CARD_WIDTH}px` },
};

WithOverlay.parameters = {
  docs: {
    source: {
      code: `<SummaryCard
  images="/restaurant.jpg"
  topOverlay={
    <SummaryCard.Overlay background="dark" height={40} align="center">
      <span style={{ color: 'white' }}>Featured Partner</span>
    </SummaryCard.Overlay>
  }
/>`,
    },
  },
};

// All states showcase
export const States = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Loading
      </div>
      <SummaryCard
        images={SAMPLE_IMAGES.restaurant}
        imageAspectRatio="4/3"
        title="Loading State"
        descriptionLines={2}
        loading
        style={{ maxWidth: `${CARD_WIDTH}px` }}
      />
    </div>
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Error
      </div>
      <SummaryCard
        error
        errorMessage="Failed to load restaurant"
        onErrorRetry={() => console.log('Retry')}
        style={{ maxWidth: `${CARD_WIDTH}px` }}
      />
    </div>
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Empty
      </div>
      <SummaryCard
        emptyTitle="No results"
        emptyMessage="Try a different search"
        style={{ maxWidth: `${CARD_WIDTH}px` }}
      />
    </div>
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Normal
      </div>
      <SummaryCard
        images={SAMPLE_IMAGES.restaurant}
        imageAspectRatio="4/3"
        title="Little Nona's"
        subtitle="Italian Restaurant"
        badge="9.2"
        buttonText="Reserve"
        style={{ maxWidth: `${CARD_WIDTH}px` }}
      />
    </div>
  </div>
);

States.parameters = {
  docs: {
    source: {
      code: `// Loading state
<SummaryCard loading />

// Error state
<SummaryCard error errorMessage="Failed to load" onErrorRetry={() => retry()} />

// Empty state
<SummaryCard emptyTitle="No results" />

// Normal state
<SummaryCard images="/img.jpg" title="Title" badge="9.2" />`,
    },
  },
};

// Real-world example
export const RealWorld = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <SummaryCard
      images={SAMPLE_IMAGES.restaurant}
      imageAspectRatio="4/3"
      title="Little Nona's"
      subtitle="1427 Via Campania"
      badge="9.2"
      description="A tiny, brick-walled trattoria tucked down a side street near Washington Square Park."
      descriptionLines={2}
      metadata={[
        { icon: <Clock />, label: '30 min' },
        { icon: <MapPin />, label: '0.5 mi' },
      ]}
      buttonText="Reserve Table"
      onButtonClick={() => console.log('Reserve clicked')}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <SummaryCard
      images={[SAMPLE_IMAGES.pizza, SAMPLE_IMAGES.pasta, SAMPLE_IMAGES.salad]}
      title="Today's Specials"
      subtitle="Fresh from our kitchen"
      description="Our chef has prepared three amazing dishes for you today."
      buttonText="View Menu"
      onButtonClick={() => console.log('View menu')}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
  </div>
);

RealWorld.parameters = {
  docs: {
    source: {
      code: `<SummaryCard
  images="/restaurant.jpg"
  imageAspectRatio="4/3"
  title="Little Nona's"
  subtitle="1427 Via Campania"
  badge="9.2"
  description="A tiny, brick-walled trattoria..."
  metadata={[
    { icon: <Clock />, label: '30 min' },
    { icon: <MapPin />, label: '0.5 mi' },
  ]}
  buttonText="Reserve Table"
  onButtonClick={() => handleReserve()}
/>`,
    },
  },
};
