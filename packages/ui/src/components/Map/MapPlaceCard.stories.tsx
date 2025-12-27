import type { Meta } from '@storybook/react';
import { MapPlaceCard, type MapPlaceCardProps } from './MapPlaceCard';
import { StarFilled, Clock } from '@openai/apps-sdk-ui/components/Icon';

const meta: Meta<MapPlaceCardProps> = {
  title: 'Components/Cards/MapPlaceCard',
  component: MapPlaceCard,
  tags: ['!dev'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    features: {
      description: 'Feature items with icon and label',
      control: false,
      table: { type: { summary: 'Feature[]' } },
    },
    onClick: {
      description: 'Callback when card is clicked',
      control: false,
      table: { type: { summary: '() => void' } },
    },
    onErrorRetry: {
      description: 'Callback when retry button is clicked',
      control: false,
      table: { type: { summary: '() => void' } },
    },
    onImageLoad: {
      description: 'Callback when image loads',
      control: false,
      table: { type: { summary: '() => void' } },
    },
    onImageError: {
      description: 'Callback when image fails to load',
      control: false,
      table: { type: { summary: '() => void' } },
    },
    variant: {
      description: 'Card layout variant',
      table: { type: { summary: "'carousel' | 'list'" }, defaultValue: { summary: 'carousel' } },
    },
    selected: {
      description: 'Whether the card is selected',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    loading: {
      description: 'Shows skeleton placeholder',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    error: {
      description: 'Shows error message when true',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    errorTitle: {
      description: 'Custom error title',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Failed to load' } },
    },
    emptyTitle: {
      description: 'Empty state title',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'No location' } },
    },
    badgeVariant: {
      description: 'Badge visual style',
      table: { type: { summary: "'solid' | 'soft'" }, defaultValue: { summary: 'soft' } },
    },
    badgeSize: {
      description: 'Badge size',
      table: { type: { summary: "'sm' | 'md' | 'lg'" }, defaultValue: { summary: 'sm' } },
    },
    badgePill: {
      description: 'Use pill-shaped badge',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    badgeColor: {
      description: 'Badge color variant',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'secondary' } },
    },
    badgePosition: {
      description: 'Badge position on the image',
      table: { type: { summary: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'" }, defaultValue: { summary: 'top-right' } },
    },
    imageLoading: {
      description: 'Image loading strategy',
      table: { type: { summary: "'eager' | 'lazy'" }, defaultValue: { summary: 'lazy' } },
    },
    titleLines: {
      description: 'Max lines for title (1-3)',
      table: { type: { summary: '1 | 2 | 3' }, defaultValue: { summary: '1' } },
    },
    subtitleLines: {
      description: 'Max lines for subtitle (1-3)',
      table: { type: { summary: '1 | 2 | 3' }, defaultValue: { summary: '1' } },
    },
  },
};

export default meta;

// Sample data
const SAMPLE_IMAGE = 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=200&q=80';
const SAMPLE_FEATURES = [
  { icon: <StarFilled />, label: '4.8' },
  { label: 'Free' },
  { icon: <Clock />, label: 'Open 6am-1am' },
];

const CARD_MAX_WIDTH = 400;

// Base story
export const Base = (args: MapPlaceCardProps) => <MapPlaceCard {...args} />;

Base.args = {
  image: SAMPLE_IMAGE,
  title: 'Central Park',
  subtitle: 'New York, NY',
  features: SAMPLE_FEATURES,
  style: { maxWidth: `${CARD_MAX_WIDTH}px` },
};

Base.parameters = {
  docs: {
    source: {
      code: `<MapPlaceCard
  image="/central-park.jpg"
  title="Central Park"
  subtitle="New York, NY"
  features={[
    { icon: <StarFilled />, label: '4.8' },
    { label: 'Free' },
    { icon: <Clock />, label: 'Open 6am-1am' },
  ]}
/>`,
    },
  },
};

// Variants
export const Variants = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <div>
      <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
        Carousel variant (subtle selection)
      </p>
      <MapPlaceCard
        image={SAMPLE_IMAGE}
        title="Central Park"
        subtitle="New York, NY"
        features={SAMPLE_FEATURES}
        variant="carousel"
        selected
        style={{ maxWidth: `${CARD_MAX_WIDTH}px` }}
      />
    </div>
    <div>
      <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
        List variant (prominent selection)
      </p>
      <MapPlaceCard
        image={SAMPLE_IMAGE}
        title="Central Park"
        subtitle="New York, NY"
        features={SAMPLE_FEATURES}
        variant="list"
        selected
        style={{ maxWidth: `${CARD_MAX_WIDTH}px` }}
      />
    </div>
  </div>
);

Variants.parameters = {
  docs: {
    source: {
      code: `{/* Carousel variant - subtle selection */}
<MapPlaceCard variant="carousel" selected />

{/* List variant - prominent selection */}
<MapPlaceCard variant="list" selected />`,
    },
  },
};

// With badge
export const WithBadge = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      maxWidth: `${CARD_MAX_WIDTH}px`,
    }}
  >
    <MapPlaceCard
      image={SAMPLE_IMAGE}
      title="Central Park"
      subtitle="New York, NY"
      features={SAMPLE_FEATURES}
      badge="New"
      badgeColor="info"
    />
    <MapPlaceCard
      image="https://images.unsplash.com/photo-1431274172761-fca41d930114?w=200&q=80"
      title="Golden Gate Bridge"
      subtitle="San Francisco, CA"
      features={[{ icon: <StarFilled />, label: '4.9' }, { label: '$10' }]}
      badge="Popular"
      badgeColor="discovery"
    />
    <MapPlaceCard
      image="https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=200&q=80"
      title="Griffith Observatory"
      subtitle="Los Angeles, CA"
      features={[{ icon: <StarFilled />, label: '4.7' }, { label: 'Free' }]}
      badge="Closest"
      badgeColor="success"
    />
  </div>
);

WithBadge.parameters = {
  docs: {
    source: {
      code: `<MapPlaceCard badge="New" badgeColor="info" />
<MapPlaceCard badge="Popular" badgeColor="discovery" />
<MapPlaceCard badge="Closest" badgeColor="success" />`,
    },
  },
};

// Loading state
export const Loading = (args: MapPlaceCardProps) => <MapPlaceCard {...args} />;

Loading.args = {
  image: SAMPLE_IMAGE,
  title: 'Central Park',
  subtitle: 'New York, NY',
  loading: true,
  style: { maxWidth: `${CARD_MAX_WIDTH}px` },
};

Loading.parameters = {
  docs: {
    source: {
      code: `<MapPlaceCard loading />`,
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
    <MapPlaceCard error style={{ maxWidth: `${CARD_MAX_WIDTH}px` }} />
    <MapPlaceCard
      error
      errorTitle="Failed to load"
      errorMessage="Unable to retrieve location details"
      onErrorRetry={() => console.log('Retry clicked')}
      style={{ maxWidth: `${CARD_MAX_WIDTH}px` }}
    />
  </div>
);

Error.parameters = {
  docs: {
    source: {
      code: `// Default error
<MapPlaceCard error />

// Custom error with retry
<MapPlaceCard
  error
  errorTitle="Failed to load"
  errorMessage="Unable to retrieve location details"
  onErrorRetry={() => handleRetry()}
/>`,
    },
  },
};

// Empty state
export const Empty = (args: MapPlaceCardProps) => <MapPlaceCard {...args} />;

Empty.args = {
  emptyTitle: 'No location selected',
  emptyMessage: 'Choose a location to view details',
  style: { maxWidth: `${CARD_MAX_WIDTH}px` },
};

Empty.parameters = {
  docs: {
    source: {
      code: `<MapPlaceCard
  emptyTitle="No location selected"
  emptyMessage="Choose a location to view details"
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
      <MapPlaceCard loading style={{ maxWidth: `${CARD_MAX_WIDTH}px` }} />
    </div>
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Error
      </div>
      <MapPlaceCard
        error
        errorMessage="Failed to load location"
        onErrorRetry={() => console.log('Retry')}
        style={{ maxWidth: `${CARD_MAX_WIDTH}px` }}
      />
    </div>
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Empty
      </div>
      <MapPlaceCard
        emptyTitle="No location"
        emptyMessage="Select a place"
        style={{ maxWidth: `${CARD_MAX_WIDTH}px` }}
      />
    </div>
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Normal
      </div>
      <MapPlaceCard
        image={SAMPLE_IMAGE}
        title="Central Park"
        subtitle="New York, NY"
        features={SAMPLE_FEATURES}
        style={{ maxWidth: `${CARD_MAX_WIDTH}px` }}
      />
    </div>
  </div>
);

States.parameters = {
  docs: {
    source: {
      code: `// Loading state
<MapPlaceCard loading />

// Error state
<MapPlaceCard error errorMessage="Failed to load" onErrorRetry={() => retry()} />

// Empty state
<MapPlaceCard emptyTitle="No location" />

// Normal state
<MapPlaceCard image="/img.jpg" title="Central Park" />`,
    },
  },
};

// Real-world example
export const RealWorld = () => (
  <div
    style={{
      backgroundColor: 'var(--color-surface-secondary)',
      padding: '24px',
      borderRadius: '12px',
      maxWidth: '500px',
    }}
  >
    <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Nearby Locations</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <MapPlaceCard
        image={SAMPLE_IMAGE}
        title="Central Park"
        subtitle="New York, NY"
        features={SAMPLE_FEATURES}
        badge="Closest"
        badgeColor="success"
        onClick={() => console.log('Central Park clicked')}
      />
      <MapPlaceCard
        image="https://images.unsplash.com/photo-1431274172761-fca41d930114?w=200&q=80"
        title="Golden Gate Bridge"
        subtitle="San Francisco, CA"
        features={[{ icon: <StarFilled />, label: '4.9' }, { label: '$10' }, { label: '2.5 mi' }]}
        onClick={() => console.log('Golden Gate clicked')}
      />
      <MapPlaceCard
        image="https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=200&q=80"
        title="Griffith Observatory"
        subtitle="Los Angeles, CA"
        features={[{ icon: <StarFilled />, label: '4.7' }, { label: 'Free' }]}
        onClick={() => console.log('Griffith clicked')}
      />
    </div>
  </div>
);

RealWorld.parameters = {
  docs: {
    source: {
      code: `<div className="location-list">
  <MapPlaceCard
    image="/central-park.jpg"
    title="Central Park"
    subtitle="New York, NY"
    features={[
      { icon: <StarFilled />, label: '4.8' },
      { label: 'Free' },
    ]}
    badge="Closest"
    badgeColor="success"
    onClick={() => handleSelect('central-park')}
  />
  {/* Additional locations... */}
</div>`,
    },
  },
};
