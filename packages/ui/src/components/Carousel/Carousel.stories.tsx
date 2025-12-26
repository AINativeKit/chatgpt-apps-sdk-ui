import React from 'react';
import type { Meta } from '@storybook/react';
import { Carousel, type CarouselProps } from './Carousel';
import { ImageCard } from '../Card/ImageCard';
import { SummaryCard } from '../Card/SummaryCard';
import { ListCard } from '../Card/ListCard';

const meta: Meta<CarouselProps> = {
  title: 'Composed Components/Carousels',
  component: Carousel,
  tags: ['!dev'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    children: { control: false },
    onSlideChange: { control: false },
    onApi: { control: false },
    onErrorRetry: { control: false },
    emptyState: { control: false },
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

// Base example with ImageCards
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
      story: 'Basic carousel with ImageCard components. Each slide needs explicit width and `flexShrink: 0`.',
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

// Alignment options
export const AlignStart = () => {
  return (
    <Carousel align="start">
      {sampleImages.map((image, index) => (
        <div key={index} style={{ width: '240px', flexShrink: 0 }}>
          <ImageCard image={image} title={`Start ${index + 1}`} size="compact" />
        </div>
      ))}
    </Carousel>
  );
};

AlignStart.parameters = {
  docs: {
    description: {
      story: 'Slides align to the left edge. Perfect for left-to-right browsing.',
    },
    source: {
      code: `<Carousel align="start">
  {/* slides */}
</Carousel>`,
    },
  },
};

export const AlignCenter = () => {
  return (
    <Carousel align="center">
      {sampleImages.map((image, index) => (
        <div key={index} style={{ width: '240px', flexShrink: 0 }}>
          <ImageCard image={image} title={`Center ${index + 1}`} size="compact" />
        </div>
      ))}
    </Carousel>
  );
};

AlignCenter.parameters = {
  docs: {
    description: {
      story: 'Active slide stays centered (default). Most balanced for visual browsing.',
    },
    source: {
      code: `<Carousel align="center">
  {/* slides */}
</Carousel>`,
    },
  },
};

export const AlignEnd = () => {
  return (
    <Carousel align="end">
      {sampleImages.map((image, index) => (
        <div key={index} style={{ width: '240px', flexShrink: 0 }}>
          <ImageCard image={image} title={`End ${index + 1}`} size="compact" />
        </div>
      ))}
    </Carousel>
  );
};

AlignEnd.parameters = {
  docs: {
    description: {
      story: 'Slides align to the right edge. Useful for RTL layouts.',
    },
    source: {
      code: `<Carousel align="end">
  {/* slides */}
</Carousel>`,
    },
  },
};

// Navigation options
export const InfiniteLoop = () => {
  return (
    <Carousel loop>
      {sampleImages.map((image, index) => (
        <div key={index} style={{ width: '240px', flexShrink: 0 }}>
          <ImageCard image={image} title={`Loop ${index + 1}`} subtitle="Infinite scroll" size="compact" />
        </div>
      ))}
    </Carousel>
  );
};

InfiniteLoop.parameters = {
  docs: {
    description: {
      story: 'Enable seamless infinite looping for continuous browsing.',
    },
    source: {
      code: `<Carousel loop>
  {/* slides */}
</Carousel>`,
    },
  },
};

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
      story: 'Hide navigation buttons for touch-only or minimal interfaces.',
    },
    source: {
      code: `<Carousel showNavigation={false}>
  {/* slides */}
</Carousel>`,
    },
  },
};

// Spacing options
export const FlushStart = () => {
  return (
    <Carousel flushStart align="start">
      {sampleImages.map((image, index) => (
        <div key={index} style={{ width: '240px', flexShrink: 0 }}>
          <ImageCard image={image} title={`Flush ${index + 1}`} size="compact" />
        </div>
      ))}
    </Carousel>
  );
};

FlushStart.parameters = {
  docs: {
    description: {
      story: 'First slide aligns to viewport edge with no leading offset.',
    },
    source: {
      code: `<Carousel flushStart align="start">
  {/* slides */}
</Carousel>`,
    },
  },
};

export const CustomGap = () => {
  return (
    <Carousel gap="64px">
      {sampleImages.map((image, index) => (
        <div key={index} style={{ width: '240px', flexShrink: 0 }}>
          <ImageCard image={image} title={`Wide ${index + 1}`} size="compact" />
        </div>
      ))}
    </Carousel>
  );
};

CustomGap.parameters = {
  docs: {
    description: {
      story: 'Customize spacing between slides with the `gap` prop.',
    },
    source: {
      code: `<Carousel gap="64px">
  {/* slides */}
</Carousel>`,
    },
  },
};

// Card types
export const WithSummaryCards = () => {
  return (
    <Carousel>
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <div key={index} style={{ width: '356px', flexShrink: 0 }}>
          <SummaryCard
            images={[pepperoniImage, pepperoniImage, pepperoniImage]}
            title={`Pizza ${index}`}
            subtitle="Delicious"
            badge="9.2"
            description="Cupped pepperoni that curls and pools just the right amount of spicy oil."
            buttonText="Order now"
            onButtonClick={() => console.log(`Order Pizza ${index}`)}
          />
        </div>
      ))}
    </Carousel>
  );
};

WithSummaryCards.parameters = {
  docs: {
    description: {
      story: 'Carousel with SummaryCard components. Recommended width: 356px.',
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

export const WithListCards = () => {
  return (
    <Carousel>
      {['Coffee', 'Tea', 'Juice', 'Smoothie', 'Water'].map((drink, index) => (
        <div key={index} style={{ width: '300px', flexShrink: 0 }}>
          <ListCard
            headerTitle={drink}
            items={[
              {
                title: `Option ${index + 1}`,
                description: `Fresh ${drink.toLowerCase()} available now`,
              },
            ]}
            buttonText="View"
            onButtonClick={() => console.log(`View ${drink}`)}
          />
        </div>
      ))}
    </Carousel>
  );
};

WithListCards.parameters = {
  docs: {
    description: {
      story: 'Carousel with ListCard components. Recommended width: 280-320px.',
    },
    source: {
      code: `<Carousel>
  {items.map((item, i) => (
    <div key={i} style={{ width: '300px', flexShrink: 0 }}>
      <ListCard {...item} />
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
      story: 'Pass `loading` to both Carousel and cards for seamless skeleton loading.',
    },
    source: {
      code: `<Carousel loading>
  {Array.from({ length: 5 }).map((_, i) => (
    <div key={i} style={{ width: '240px', flexShrink: 0 }}>
      <ImageCard loading image="" title="" size="compact" />
    </div>
  ))}
</Carousel>`,
    },
  },
};

export const LoadingFallback = () => {
  return <Carousel loading loadingSlides={7} />;
};

LoadingFallback.parameters = {
  docs: {
    description: {
      story: 'Generic skeleton slides when no children provided (fallback pattern).',
    },
    source: {
      code: `<Carousel loading loadingSlides={7} />`,
    },
  },
};

// Error state
export const Error = () => {
  return (
    <Carousel
      error
      errorTitle="Failed to load destinations"
      errorMessage="Unable to fetch items from the server"
      onErrorRetry={() => alert('Retry clicked')}
    />
  );
};

Error.parameters = {
  docs: {
    description: {
      story: 'Display an error state with `error={true}`. Include retry functionality with `onErrorRetry`.',
    },
    source: {
      code: `<Carousel
  error
  errorTitle="Failed to load"
  errorMessage="Unable to fetch items"
  onErrorRetry={() => refetch()}
/>`,
    },
  },
};

// Empty state
export const Empty = () => {
  return (
    <Carousel emptyTitle="No destinations found" emptyMessage="Try adjusting your search filters">
      {[]}
    </Carousel>
  );
};

Empty.parameters = {
  docs: {
    description: {
      story: 'Show an empty state when no items are provided.',
    },
    source: {
      code: `<Carousel
  emptyTitle="No results found"
  emptyMessage="Try adjusting your filters"
>
  {[]}
</Carousel>`,
    },
  },
};

export const EmptyCustom = () => {
  return (
    <Carousel
      emptyState={
        <div style={{ textAlign: 'center', padding: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</div>
          <h3 style={{ marginBottom: '8px' }}>No items yet</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
            Start by adding your first item
          </p>
        </div>
      }
    >
      {[]}
    </Carousel>
  );
};

EmptyCustom.parameters = {
  docs: {
    description: {
      story: 'Provide custom empty state content with the `emptyState` prop.',
    },
    source: {
      code: `<Carousel
  emptyState={
    <div>
      <h3>No items yet</h3>
      <Button onClick={handleAdd}>Add Item</Button>
    </div>
  }
>
  {[]}
</Carousel>`,
    },
  },
};

// Edge cases
export const SingleSlide = () => {
  return (
    <Carousel>
      <div style={{ width: '345px', flexShrink: 0 }}>
        <ImageCard image={sampleImages[0]} title="Single Slide" subtitle="No navigation needed" />
      </div>
    </Carousel>
  );
};

SingleSlide.parameters = {
  docs: {
    description: {
      story: 'Navigation buttons hide automatically when there\'s only one slide.',
    },
    source: {
      code: `<Carousel>
  <div style={{ width: '345px', flexShrink: 0 }}>
    <ImageCard image={image} title="Single Slide" />
  </div>
</Carousel>`,
    },
  },
};

export const TwoSlides = () => {
  return (
    <Carousel>
      {sampleImages.slice(0, 2).map((image, index) => (
        <div key={index} style={{ width: '300px', flexShrink: 0 }}>
          <ImageCard image={image} title={`Option ${index + 1}`} size="compact" />
        </div>
      ))}
    </Carousel>
  );
};

TwoSlides.parameters = {
  docs: {
    description: {
      story: 'Minimal carousel with just two options.',
    },
  },
};

// Interactive slide tracking
export const SlideTracking = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  return (
    <div>
      <p style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
        Current slide: <strong>{currentSlide + 1}</strong> of 7
      </p>
      <Carousel onSlideChange={setCurrentSlide}>
        {sampleImages.map((image, index) => (
          <div key={index} style={{ width: '240px', flexShrink: 0 }}>
            <ImageCard
              image={image}
              title={`Slide ${index + 1}`}
              subtitle={index === currentSlide ? 'Active' : 'Inactive'}
              size="compact"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

SlideTracking.parameters = {
  docs: {
    description: {
      story: 'Track slide changes with the `onSlideChange` callback.',
    },
    source: {
      code: `const [currentSlide, setCurrentSlide] = useState(0);

<Carousel onSlideChange={setCurrentSlide}>
  {/* slides */}
</Carousel>

Current: {currentSlide + 1} of {total}`,
    },
  },
};

// Constrained container
export const ConstrainedContainer = () => {
  return (
    <div
      style={{
        maxWidth: '768px',
        margin: '0 auto',
        border: '2px solid var(--color-border-subtle)',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: 'var(--color-surface-secondary)',
      }}
    >
      <div
        style={{
          marginBottom: '12px',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--color-text-secondary)',
        }}
      >
        Container: max-width: 768px
      </div>
      <Carousel gap="16px" align="start">
        {sampleImages.slice(0, 5).map((image, index) => (
          <div key={index} style={{ width: '240px', flexShrink: 0 }}>
            <ImageCard image={image} title={`Image ${index + 1}`} subtitle="No overflow!" size="compact" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

ConstrainedContainer.parameters = {
  docs: {
    description: {
      story: 'Carousel correctly handles width-constrained containers without page overflow.',
    },
  },
};
