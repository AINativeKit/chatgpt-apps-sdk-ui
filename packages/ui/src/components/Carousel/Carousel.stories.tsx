import type { Meta } from '@storybook/react';
import { Carousel, type CarouselProps } from './Carousel';
import { ImageCard } from '../Card/ImageCard';
import { SummaryCard } from '../Card/SummaryCard';

const meta: Meta<CarouselProps> = {
  title: 'Composed Components/Carousels',
  component: Carousel,
  tags: ['!dev'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    children: { description: 'Carousel slide elements', control: false },
    onSlideChange: { description: 'Callback when active slide changes', control: false },
    onApi: { description: 'Callback to receive Embla API instance', control: false },
    onErrorRetry: { description: 'Callback when retry button is clicked', control: false },
    emptyState: { description: 'Custom empty state component', control: false },
    align: {
      description: 'Alignment of slides within the viewport',
      table: { defaultValue: { summary: 'center' } },
    },
    loop: {
      description: 'Enable infinite looping',
      table: { defaultValue: { summary: 'false' } },
    },
    showNavigation: {
      description: 'Show navigation buttons (prev/next arrows)',
      table: { defaultValue: { summary: 'true' } },
    },
    showEdgeGradients: {
      description: 'Show edge gradient overlays',
      table: { defaultValue: { summary: 'false' } },
    },
    gap: {
      description: 'Gap between slides',
      table: { defaultValue: { summary: 'var(32px)' } },
    },
    flushStart: {
      description: 'Remove leading offset so first slide is flush with viewport start',
      table: { defaultValue: { summary: 'false' } },
    },
    startInset: {
      description: 'Custom left inset inside the carousel container',
      table: { defaultValue: { summary: '0' } },
    },
    viewportPadding: {
      description: 'Custom viewport padding (top and bottom)',
      table: { defaultValue: { summary: '0' } },
    },
    dragFree: {
      description: 'Enable drag-free scrolling without snapping',
      table: { defaultValue: { summary: 'true' } },
    },
    startIndex: {
      description: 'Initial slide index to start at',
      table: { defaultValue: { summary: '0' } },
    },
    loading: {
      description: 'Renders skeleton slides while loading',
      table: { defaultValue: { summary: 'false' } },
    },
    loadingSlides: {
      description: 'Number of skeleton slides when loading',
      table: { defaultValue: { summary: '6' } },
    },
    error: {
      description: 'Shows error message when true',
      table: { defaultValue: { summary: 'false' } },
    },
    errorTitle: {
      description: 'Custom error title',
      table: { defaultValue: { summary: 'Failed to load items' } },
    },
    emptyTitle: {
      description: 'Empty state title when no children',
      table: { defaultValue: { summary: 'No items' } },
    },
  },
};

export default meta;

const sampleImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop',
];

const pepperoniImage =
  'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&auto=format&fit=crop';

// Base example
export const Base = () => {
  return (
    <Carousel>
      {sampleImages.map((image, index) => (
        <div key={index} style={{ width: '320px', flexShrink: 0 }}>
          <ImageCard
            image={image}
            title={`Destination ${index + 1}`}
            subtitle="Beautiful scenery"
            size="compact"
          />
        </div>
      ))}
    </Carousel>
  );
};

Base.parameters = {
  docs: {
    description: {
      story:
        'Basic carousel with ImageCard components. Each slide needs explicit width and `flexShrink: 0`.',
    },
    source: {
      code: `<Carousel>
  {images.map((image, i) => (
    <div key={i} style={{ width: '320px', flexShrink: 0 }}>
      <ImageCard image={image} title="Title" size="compact" />
    </div>
  ))}
</Carousel>`,
    },
  },
};

// Left-aligned
export const AlignStart = () => {
  return (
    <Carousel align="start" flushStart>
      {sampleImages.map((image, index) => (
        <div key={index} style={{ width: '240px', flexShrink: 0 }}>
          <ImageCard image={image} title={`Item ${index + 1}`} size="compact" />
        </div>
      ))}
    </Carousel>
  );
};

AlignStart.parameters = {
  docs: {
    description: {
      story: 'Left-aligned with `flushStart` for edge-to-edge layouts.',
    },
    source: {
      code: `<Carousel align="start" flushStart>
  {/* slides */}
</Carousel>`,
    },
  },
};

// Infinite loop
export const InfiniteLoop = () => {
  return (
    <Carousel loop>
      {sampleImages.map((image, index) => (
        <div key={index} style={{ width: '240px', flexShrink: 0 }}>
          <ImageCard image={image} title={`Loop ${index + 1}`} size="compact" />
        </div>
      ))}
    </Carousel>
  );
};

InfiniteLoop.parameters = {
  docs: {
    description: {
      story: 'Seamless infinite looping for continuous browsing.',
    },
    source: {
      code: `<Carousel loop>
  {/* slides */}
</Carousel>`,
    },
  },
};

// Touch-only (no nav buttons)
export const NoNavigation = () => {
  return (
    <Carousel showNavigation={false}>
      {sampleImages.map((image, index) => (
        <div key={index} style={{ width: '240px', flexShrink: 0 }}>
          <ImageCard image={image} title={`Swipe ${index + 1}`} subtitle="Drag to navigate" size="compact" />
        </div>
      ))}
    </Carousel>
  );
};

NoNavigation.parameters = {
  docs: {
    description: {
      story: 'Hide navigation buttons for touch-only interfaces.',
    },
    source: {
      code: `<Carousel showNavigation={false}>
  {/* slides */}
</Carousel>`,
    },
  },
};

// With SummaryCards
export const WithSummaryCards = () => {
  return (
    <Carousel>
      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} style={{ width: '356px', flexShrink: 0 }}>
          <SummaryCard
            images={[pepperoniImage, pepperoniImage, pepperoniImage]}
            title={`Restaurant ${index}`}
            subtitle="Italian cuisine"
            badge="4.8"
            description="Fresh ingredients and authentic recipes from Naples."
            buttonText="Order now"
            onButtonClick={() => console.log(`Order ${index}`)}
          />
        </div>
      ))}
    </Carousel>
  );
};

WithSummaryCards.parameters = {
  docs: {
    description: {
      story: 'Carousel works with any card type. SummaryCards work well at 356px width.',
    },
    source: {
      code: `<Carousel>
  {items.map((item, i) => (
    <div key={i} style={{ width: '356px', flexShrink: 0 }}>
      <SummaryCard {...item} />
    </div>
  ))}
</Carousel>`,
    },
  },
};

// Loading state
export const Loading = () => {
  return (
    <Carousel loading>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{ width: '240px', flexShrink: 0 }}>
          <ImageCard loading image="" title="" subtitle="" size="compact" />
        </div>
      ))}
    </Carousel>
  );
};

Loading.parameters = {
  docs: {
    description: {
      story:
        'Pass `loading` to both Carousel and cards for seamless skeleton loading. Use `loadingSlides` for fallback skeletons when no children.',
    },
    source: {
      code: `<Carousel loading>
  {items.map((_, i) => (
    <div key={i} style={{ width: '240px', flexShrink: 0 }}>
      <ImageCard loading image="" title="" size="compact" />
    </div>
  ))}
</Carousel>`,
    },
  },
};

// Error state
export const Error = () => {
  return (
    <Carousel
      error
      errorTitle="Failed to load"
      errorMessage="Please check your connection and try again."
      onErrorRetry={() => alert('Retry clicked')}
    />
  );
};

Error.parameters = {
  docs: {
    description: {
      story: 'Display an error state with optional retry button.',
    },
    source: {
      code: `<Carousel
  error
  errorTitle="Failed to load"
  errorMessage="Please try again."
  onErrorRetry={() => refetch()}
/>`,
    },
  },
};

// Empty state
export const Empty = () => {
  return (
    <Carousel emptyTitle="No items found" emptyMessage="Try adjusting your search filters.">
      {[]}
    </Carousel>
  );
};

Empty.parameters = {
  docs: {
    description: {
      story: 'Show an empty state when no items exist. Use `emptyState` prop for custom content.',
    },
    source: {
      code: `<Carousel
  emptyTitle="No results"
  emptyMessage="Try a different search."
>
  {[]}
</Carousel>`,
    },
  },
};
