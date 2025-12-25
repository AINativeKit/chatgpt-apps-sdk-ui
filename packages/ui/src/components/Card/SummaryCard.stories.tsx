import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SummaryCard } from './SummaryCard';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import {
  StarFilled,
  Clock,
  MapPin,
  CalendarToday,
} from '@openai/apps-sdk-ui/components/Icon';
import { PropsTable } from '../../tokens/PropsTable';

const meta: Meta<typeof SummaryCard> = {
  title: 'Composed Components/Cards/Summary Cards',
  component: SummaryCard,
  parameters: {
    layout: 'padded',
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
} as const;

const SAMPLE_IMAGE_KEYS = ['pizza', 'pasta', 'salad', 'dessert'] as const;

const CARD_WIDTH = 345;
const COMPACT_CARD_WIDTH = 280;

// Interactive loading transition demo
const LoadingTransitionDemo: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [autoToggle, setAutoToggle] = React.useState(false);

  React.useEffect(() => {
    if (!autoToggle) return;
    const interval = setInterval(() => {
      setIsLoading((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, [autoToggle]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button color="secondary" variant="outline" onClick={() => setIsLoading((prev) => !prev)}>
          {isLoading ? 'Show Content' : 'Show Loading'}
        </Button>
        <Button
          color={autoToggle ? 'primary' : 'secondary'}
          variant={autoToggle ? 'solid' : 'outline'}
          onClick={() => setAutoToggle((prev) => !prev)}
        >
          {autoToggle ? 'Stop Auto-Toggle' : 'Auto-Toggle (2s)'}
        </Button>
        <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Current: <strong>{isLoading ? 'Loading' : 'Loaded'}</strong>
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        <div>
          <p
            style={{
              fontSize: '12px',
              color: 'var(--color-text-secondary)',
              marginBottom: '8px',
            }}
          >
            Single Image - Watch for layout shift (there should be none!)
          </p>
          <SummaryCard
            images={SAMPLE_IMAGES.restaurant}
            imageAspectRatio="4/3"
            title="Little Nona's"
            subtitle="1427 Via Campania"
            badge="9.2"
            description="A tiny, brick-walled trattoria tucked down a side street near Washington Square Park."
            descriptionLines={2}
            buttonText="Reserve Table"
            loading={isLoading}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>

        <div>
          <p
            style={{
              fontSize: '12px',
              color: 'var(--color-text-secondary)',
              marginBottom: '8px',
            }}
          >
            Grid Images - 3 images layout
          </p>
          <SummaryCard
            images={[
              { src: SAMPLE_IMAGES.pizza, alt: 'Pizza' },
              { src: SAMPLE_IMAGES.pasta, alt: 'Pasta' },
              { src: SAMPLE_IMAGES.salad, alt: 'Salad' },
            ]}
            title="Italian Favorites"
            subtitle="Best dishes"
            badge="9.5"
            description="Authentic Italian cuisine with fresh ingredients and traditional recipes."
            descriptionLines={2}
            buttonText="Order Now"
            loading={isLoading}
            loadingImageCount={3}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>

        <div>
          <p
            style={{
              fontSize: '12px',
              color: 'var(--color-text-secondary)',
              marginBottom: '8px',
            }}
          >
            Compact Size with 3 lines
          </p>
          <SummaryCard
            images={SAMPLE_IMAGES.restaurant}
            imageAspectRatio="4/3"
            title="Compact Card"
            subtitle="Dense layout"
            badge="9.0"
            size="compact"
            description="A tiny, brick-walled trattoria tucked down a side street near Washington Square Park. The windows glow warm gold at night."
            descriptionLines={3}
            buttonText="View"
            loading={isLoading}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>

        <div>
          <p
            style={{
              fontSize: '12px',
              color: 'var(--color-text-secondary)',
              marginBottom: '8px',
            }}
          >
            With Metadata Skeleton (NEW)
          </p>
          <SummaryCard
            images={SAMPLE_IMAGES.restaurant}
            imageAspectRatio="4/3"
            title="Card with Metadata"
            subtitle="Airbnb style"
            badge="4.8"
            description="Stunning oceanfront property with modern architecture and beach access."
            descriptionLines={2}
            metadata={[
              { label: '3 bed' },
              { label: '2 bath' },
              { label: 'Beach view' },
              { label: 'Breakfast' },
            ]}
            buttonText="View Details"
            loading={isLoading}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
      </div>
    </div>
  );
};

// Interactive flat variant loading transition demo
const FlatLoadingTransitionDemo: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [autoToggle, setAutoToggle] = React.useState(false);

  React.useEffect(() => {
    if (!autoToggle) return;
    const interval = setInterval(() => {
      setIsLoading((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, [autoToggle]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button color="secondary" variant="outline" onClick={() => setIsLoading((prev) => !prev)}>
          {isLoading ? 'Show Content' : 'Show Loading'}
        </Button>
        <Button
          color={autoToggle ? 'primary' : 'secondary'}
          variant={autoToggle ? 'solid' : 'outline'}
          onClick={() => setAutoToggle((prev) => !prev)}
        >
          {autoToggle ? 'Stop Auto-Toggle' : 'Auto-Toggle (2s)'}
        </Button>
        <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Current: <strong>{isLoading ? 'Loading' : 'Loaded'}</strong>
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        <div>
          <p
            style={{
              fontSize: '12px',
              color: 'var(--color-text-secondary)',
              marginBottom: '8px',
            }}
          >
            Flat + Single Image - Edge-to-edge layout
          </p>
          <SummaryCard
            variant="flat"
            images={SAMPLE_IMAGES.restaurant}
            imageAspectRatio="4/3"
            title="Pizzeria Bella"
            subtitle="123 Main Street"
            badge="4.8"
            description="Authentic wood-fired pizzas with fresh ingredients and traditional recipes."
            descriptionLines={2}
            buttonText="Order Now"
            loading={isLoading}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>

        <div>
          <p
            style={{
              fontSize: '12px',
              color: 'var(--color-text-secondary)',
              marginBottom: '8px',
            }}
          >
            Flat + Grid (Perfect for Carousels)
          </p>
          <SummaryCard
            variant="flat"
            images={[
              { src: SAMPLE_IMAGES.pizza, alt: 'Pizza' },
              { src: SAMPLE_IMAGES.pasta, alt: 'Pasta' },
              { src: SAMPLE_IMAGES.salad, alt: 'Salad' },
            ]}
            title="Italian Collection"
            subtitle="3 dishes"
            badge="9.5"
            description="Our most popular Italian dishes featuring authentic ingredients."
            descriptionLines={2}
            buttonText="Explore Menu"
            loading={isLoading}
            loadingImageCount={3}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>

        <div>
          <p
            style={{
              fontSize: '12px',
              color: 'var(--color-text-secondary)',
              marginBottom: '8px',
            }}
          >
            Flat + Compact (Discovery Mode)
          </p>
          <SummaryCard
            variant="flat"
            size="compact"
            images={SAMPLE_IMAGES.restaurant}
            imageAspectRatio="4/3"
            title="Trattoria Roma"
            subtitle="456 Park Ave"
            badge="9.2"
            description="Cozy Italian trattoria with homemade pasta and traditional recipes from Rome."
            descriptionLines={2}
            buttonText="Reserve"
            loading={isLoading}
            style={{ maxWidth: `${COMPACT_CARD_WIDTH}px` }}
          />
        </div>
      </div>
    </div>
  );
};

// Main unified SummaryCard showcase component
const SummaryCardsComponent: React.FC = () => {
  const [retryCount, setRetryCount] = React.useState(0);

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '32px' }}>SummaryCard System</h1>

      {/* Introduction */}
      <section style={{ marginBottom: '64px' }}>
        <p
          style={{
            marginBottom: '24px',
            color: 'var(--color-text-secondary)',
            fontSize: '16px',
            lineHeight: '1.6',
          }}
        >
          Cards displaying content summaries with flexible image layouts (single or 2-4 grid),
          header with badge, description, and action button. Perfect for restaurant listings,
          product summaries, and content previews. Features loading, error, and empty states with
          native lazy loading and image callbacks.
        </p>
      </section>

      {/* Image Layouts */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Image Layouts</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Flexible image display: single hero image or 2-4 image grid with auto-layout
          </p>
        </header>

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
            title="Single Image"
            subtitle="Full-width hero"
            badge="9.2"
            description="Perfect for featuring a primary image with content below"
            buttonText="View Details"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <SummaryCard
            images={[
              { src: SAMPLE_IMAGES.pizza, alt: 'Pizza' },
              { src: SAMPLE_IMAGES.pasta, alt: 'Pasta' },
            ]}
            title="2 Images"
            subtitle="Side by side"
            badge="9.0"
            description="Two images displayed in equal columns"
            buttonText="View Menu"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <SummaryCard
            images={[
              { src: SAMPLE_IMAGES.pizza, alt: 'Pizza' },
              { src: SAMPLE_IMAGES.pasta, alt: 'Pasta' },
              { src: SAMPLE_IMAGES.salad, alt: 'Salad' },
            ]}
            title="3 Images"
            subtitle="Large + 2 Small"
            badge="8.8"
            description="Featured image with two supporting images in a grid"
            buttonText="Explore"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            marginTop: '24px',
            alignItems: 'start',
          }}
        >
          <SummaryCard
            images={[
              { src: SAMPLE_IMAGES.pizza, alt: 'Pizza' },
              { src: SAMPLE_IMAGES.pasta, alt: 'Pasta' },
              { src: SAMPLE_IMAGES.salad, alt: 'Salad' },
              { src: SAMPLE_IMAGES.dessert, alt: 'Dessert' },
            ]}
            title="4 Images"
            subtitle="2x2 Grid"
            badge="9.5"
            description="Four images in balanced grid layout"
            buttonText="See All Photos"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <SummaryCard
            images={Array.from({ length: 10 }, (_, i) => ({
              src: SAMPLE_IMAGES[SAMPLE_IMAGE_KEYS[i % 4]],
              alt: `Image ${i + 1}`,
            }))}
            title="5+ Images"
            subtitle="With Overflow"
            badge="9.1"
            description="Shows first 4 images with +N indicator for remaining"
            buttonText="View Gallery"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
      </section>

      {/* Content Variations */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Content Variations</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Flexible content combinations from minimal to complete
          </p>
        </header>

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
            title="Image + Title Only"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <SummaryCard
            images={SAMPLE_IMAGES.restaurant}
            title="With Subtitle"
            subtitle="Additional context"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <SummaryCard
            images={SAMPLE_IMAGES.restaurant}
            title="With Badge"
            subtitle="Rating display"
            badge="9.2"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            marginTop: '24px',
            alignItems: 'start',
          }}
        >
          <SummaryCard
            images={SAMPLE_IMAGES.restaurant}
            title="With Description"
            subtitle="Location info"
            description="A cozy Italian restaurant in the heart of downtown"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <SummaryCard
            images={SAMPLE_IMAGES.restaurant}
            title="With Action Button"
            subtitle="Call to action"
            badge="9.2"
            buttonText="Make Reservation"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <SummaryCard
            images={SAMPLE_IMAGES.restaurant}
            title="Complete Card"
            subtitle="1427 Via Campania"
            badge="9.2"
            description="A tiny, brick-walled trattoria tucked down a side street"
            buttonText="Add to Order"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            marginTop: '24px',
            alignItems: 'start',
          }}
        >
          <SummaryCard
            title="No Images"
            subtitle="Text only card"
            badge="8.5"
            description="Card can work without images for text-focused content"
            buttonText="Learn More"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <SummaryCard
            images={SAMPLE_IMAGES.restaurant}
            title="With Metadata"
            description="Card with structured metadata items"
            metadata={[
              { icon: <Clock />, label: '10 min read' },
              { icon: <CalendarToday />, label: 'October 30, 2025' },
            ]}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <SummaryCard
            title="With Multiple Metadata"
            description="Display multiple metadata items with icons"
            metadata={[
              { icon: <StarFilled />, label: '9.2' },
              { icon: <MapPin />, label: 'San Francisco' },
              { icon: <Clock />, label: 'Open now' },
            ]}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
      </section>

      {/* Custom Icons */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Custom Icons</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Metadata icons can be library icons (string names) or custom React elements (SVGs, icon
            components)
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {/* Custom property icons example */}
          <SummaryCard
            images="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
            title="$5,449,000"
            subtitle="98 Beach Parade, Palm Beach, Florida"
            metadata={[
              {
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ),
                label: '5',
              },
              {
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 6h6M12 3v3M13 17h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1z" />
                    <rect x="3" y="10" width="18" height="11" rx="2" />
                  </svg>
                ),
                label: '2',
              },
              {
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <circle cx="12" cy="16" r="2" />
                    <path d="M16 11V7a4 4 0 0 0-8 0v4" />
                  </svg>
                ),
                label: '3',
              },
              {
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                ),
                label: '625m²',
              },
              { label: '• House' },
            ]}
            buttonText="View property"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />

          {/* Mixed library and custom icons */}
          <SummaryCard
            images={SAMPLE_IMAGES.restaurant}
            title="Mixed Icon Types"
            subtitle="Library + Custom Icons"
            description="Combine library icons with custom SVG elements seamlessly"
            metadata={[
              { icon: <Clock />, label: '10 min' },
              {
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ),
                label: 'Featured',
              },
              { icon: <MapPin />, label: 'SF' },
            ]}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />

          {/* Text-only metadata (no icons) */}
          <SummaryCard
            images={SAMPLE_IMAGES.restaurant}
            title="Text-Only Metadata"
            subtitle="No icons needed"
            description="Metadata items can omit icons entirely"
            metadata={[
              { label: 'Posted 2 hours ago' },
              { label: 'Updated recently' },
              { label: 'Verified listing' },
            ]}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
      </section>

      {/* Badge Variants */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Badge/Chip Variants</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Different badge/chip styles for various use cases
          </p>
        </header>

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
            title="Default Badge"
            subtitle="Neutral style"
            badge="9.2"
            badgeVariant="soft"
            description="Standard accent badge for general ratings"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <SummaryCard
            images={SAMPLE_IMAGES.restaurant}
            title="Success Chip"
            subtitle="Positive indicator"
            badge="Verified"
            badgeVariant="soft"
            description="Green chip for positive status"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <SummaryCard
            images={SAMPLE_IMAGES.restaurant}
            title="Warning Chip"
            subtitle="Attention needed"
            badge="Limited"
            badgeVariant="soft"
            description="Warning chip for warnings or alerts"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <SummaryCard
            images={SAMPLE_IMAGES.restaurant}
            title="Error Chip"
            subtitle="Critical status"
            badge="Closed"
            badgeVariant="soft"
            description="Red chip for errors or unavailable"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
      </section>

      {/* Flat Variant - Edge-to-Edge Layout */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Flat Variant - Edge-to-Edge Layout</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Zero-elevation, edge-to-edge layout with no padding. Perfect for seamless integration in
            grids, carousels, or when the container provides spacing. Uses variant="flat".
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <SummaryCard
            variant="flat"
            images={SAMPLE_IMAGES.restaurant}
            title="Flat Variant"
            subtitle="No padding or elevation"
            badge="9.2"
            description="Content extends to card edges for seamless layouts"
            buttonText="View Details"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <SummaryCard
            variant="flat"
            images={[
              { src: SAMPLE_IMAGES.pizza, alt: 'Pizza' },
              { src: SAMPLE_IMAGES.pasta, alt: 'Pasta' },
              { src: SAMPLE_IMAGES.salad, alt: 'Salad' },
            ]}
            title="Grid with Flat"
            subtitle="Edge-to-edge grid"
            badge="9.0"
            description="Image grid and content aligned to edges"
            buttonText="Explore"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <SummaryCard
            variant="flat"
            size="compact"
            imageAspectRatio="4/3"
            images={SAMPLE_IMAGES.restaurant}
            title="Flat + Compact"
            subtitle="Dense & seamless"
            badge="8.8"
            description="Combine flat variant with compact size"
            metadata={[
              { label: '$$$', separator: '•' },
              { label: 'Italian', separator: '•' },
              { label: 'Open' },
            ]}
            buttonText="Order Now"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>

        <div
          style={{
            marginTop: '24px',
            background: 'var(--color-surface-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '16px',
          }}
        >
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: 'var(--color-text)',
            }}
          >
            Use Cases
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: '20px',
              fontSize: '13px',
              lineHeight: '1.6',
              color: 'var(--color-text-secondary)',
            }}
          >
            <li>
              <strong>Tight Grids:</strong> Cards in dense grid layouts where container provides
              spacing
            </li>
            <li>
              <strong>Carousels:</strong> Seamless scrolling experiences without visual gaps
            </li>
            <li>
              <strong>Mobile Optimization:</strong> Maximize content area on small screens
            </li>
            <li>
              <strong>Custom Containers:</strong> When parent element handles padding and elevation
            </li>
          </ul>
        </div>
      </section>

      {/* Button Width Behavior */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Button Width Behavior</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            SummaryCard buttons have fixed, predictable widths based on the buttonFullWidth prop.
            Button width does NOT change based on container or viewport size.
          </p>
        </header>

        {/* buttonFullWidth prop examples */}
        <div style={{ marginBottom: '48px' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>
            buttonFullWidth Prop Behavior
          </h3>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '14px',
              marginBottom: '16px',
            }}
          >
            The button width is determined by the buttonFullWidth prop and never changes based on
            container or viewport size.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '16px',
            }}
          >
            <div>
              <p style={{ fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>
                buttonFullWidth={'{true}'}
              </p>
              <SummaryCard
                images={SAMPLE_IMAGES.restaurant}
                title="Full Width Button"
                subtitle="Always 100% width"
                badge="9.2"
                description="Button spans the full width of the card"
                buttonText="Reserve Table"
                buttonFullWidth={true}
                style={{ maxWidth: `${CARD_WIDTH}px` }}
              />
            </div>

            <div>
              <p style={{ fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>
                buttonFullWidth={'{false}'}
              </p>
              <SummaryCard
                images={SAMPLE_IMAGES.pizza}
                title="Auto Width Button"
                subtitle="Always auto (min 120px)"
                badge="8.5"
                description="Button is auto-width with minimum 120px"
                buttonText="Order Now"
                buttonFullWidth={false}
                style={{ maxWidth: `${CARD_WIDTH}px` }}
              />
            </div>

            <div>
              <p style={{ fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>
                buttonFullWidth={'{undefined}'} (flat variant)
              </p>
              <SummaryCard
                variant="flat"
                images={SAMPLE_IMAGES.pasta}
                title="Default Behavior"
                subtitle="Auto for flat variant"
                badge="9.0"
                description="Flat variant defaults to auto-width button"
                buttonText="View Menu"
                style={{ maxWidth: `${CARD_WIDTH}px` }}
              />
            </div>
          </div>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '12px',
              fontStyle: 'italic',
            }}
          >
            ✅ Button widths remain consistent regardless of card container size
          </p>
        </div>

        {/* Loading State Example */}
        <div style={{ marginBottom: '48px' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>
            Loading State - Skeleton Consistency
          </h3>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '14px',
              marginBottom: '16px',
            }}
          >
            Skeleton buttons now match real button widths (fixes Issue #15).
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '16px',
            }}
          >
            <div>
              <p style={{ fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>
                buttonFullWidth={'{false}'} - Loading
              </p>
              <SummaryCard
                title="Loading State"
                subtitle="Auto Width Button"
                description="Skeleton button is auto-width (min 120px)"
                buttonText="View Details"
                buttonFullWidth={false}
                loading={true}
                style={{ maxWidth: `${CARD_WIDTH}px` }}
              />
            </div>

            <div>
              <p style={{ fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>
                buttonFullWidth={'{false}'} - Loaded
              </p>
              <SummaryCard
                images={SAMPLE_IMAGES.pizza}
                title="Loaded State"
                subtitle="Auto Width Button"
                description="Real button is auto-width (min 120px)"
                buttonText="View Details"
                buttonFullWidth={false}
                style={{ maxWidth: `${CARD_WIDTH}px` }}
              />
            </div>
          </div>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '12px',
              fontStyle: 'italic',
            }}
          >
            ✅ Skeleton and real buttons have identical widths
          </p>
        </div>

        {/* Technical Details */}
        <div
          style={{
            padding: '24px',
            background: 'var(--color-surface-secondary)',
            borderRadius: '8px',
          }}
        >
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>
            Implementation
          </h3>
          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '12px' }}>
              SummaryCard uses <strong>simple CSS</strong> for predictable button widths:
            </p>
            <pre
              style={{
                background: 'var(--color-surface)',
                padding: '12px',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '12px',
                marginBottom: '12px',
              }}
            >
              {`/* Default: Full width */
.button {
  width: 100%;
}

/* When buttonFullWidth={false}: Auto width */
.buttonSection[data-full-width='false'] .button {
  width: auto;
  min-width: 120px;
}

/* Skeleton matches button */
.buttonSection[data-full-width='false'] .buttonSkeletonWrapper {
  width: var(--button-skeleton-width, 140px);
}`}
            </pre>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>
                <strong>No responsive behavior</strong> - Button width is fixed based on prop
              </li>
              <li>
                <strong>Predictable</strong> - Same width regardless of container or viewport size
              </li>
              <li>
                <strong>Simple</strong> - No container queries needed for SummaryCard buttons
              </li>
              <li>
                <strong>Consistent</strong> - Skeleton and real buttons always match
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Discovery/Browse Mode - Compact Size (NEW - replaces DiscoveryCard) */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Discovery/Browse Mode - Compact Size (NEW)</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Dense layout optimized for carousels and discovery interfaces. Use size="compact" with
            imageAspectRatio="4/3" to replicate DiscoveryCard. Perfect for restaurant listings,
            product catalogs, and content discovery.
          </p>
        </header>

        {/* Single Card with Code Example */}
        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '12px',
              color: 'var(--color-text)',
            }}
          >
            Single Card Example
          </h3>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <SummaryCard
              images="https://persistent.oaistatic.com/pizzaz/pizzaz-1.png"
              title="Tony's Pizzeria"
              subtitle="123 Main Street"
              badge="4.8"
              size="compact"
              imageAspectRatio="4/3"
              description="Award-winning Neapolitan pizzas with wood-fired oven."
              metadata={[
                { label: '$$$', separator: '•' },
                { label: 'Neapolitan', separator: '•' },
                { label: 'Wood-fired' },
              ]}
              buttonText="Order now"
              onButtonClick={() => alert('Order clicked!')}
              style={{ width: `${COMPACT_CARD_WIDTH}px` }}
            />
            <pre
              style={{
                flex: 1,
                minWidth: '300px',
                background: 'var(--color-surface-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '12px',
                lineHeight: '1.5',
                overflow: 'auto',
                margin: 0,
              }}
            >
              {`<SummaryCard
  images="..."
  title="Tony's Pizzeria"
  subtitle="123 Main Street"
  badge="4.8"
  size="compact"
  imageAspectRatio="4/3"
  description="Award-winning..."
  metadata={[
    { label: '$$$', separator: '•' },
    { label: 'Neapolitan', separator: '•' },
    { label: 'Wood-fired' }
  ]}
  buttonText="Order now"
  style={{ width: '280px' }}
/>`}
            </pre>
          </div>
        </div>

        {/* Grid of Cards */}
        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '12px',
              color: 'var(--color-text)',
            }}
          >
            Multiple Cards in Grid
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fill, minmax(${COMPACT_CARD_WIDTH}px, 1fr))`,
              gap: '16px',
            }}
          >
            {[
              {
                id: '1',
                title: "Tony's Pizzeria",
                subtitle: '123 Main Street',
                image: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
                description: 'Award-winning Neapolitan pizzas with wood-fired oven.',
                badge: '4.8',
                features: ['$$$', 'Neapolitan', 'Wood-fired'],
              },
              {
                id: '2',
                title: 'Slice Haven',
                subtitle: '456 Park Avenue',
                image: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
                description: 'New York style slices with fresh mozzarella.',
                badge: '4.6',
                features: ['$$', 'Slices', 'Fresh'],
              },
              {
                id: '3',
                title: 'Pesto Kitchen',
                subtitle: '789 Garden Lane',
                image: 'https://persistent.oaistatic.com/pizzaz/pizzaz-5.png',
                description: 'Creative pesto-based pizzas with seasonal ingredients.',
                badge: '4.7',
                features: ['$$', 'Pesto', 'Creative'],
              },
            ].map((r) => (
              <SummaryCard
                key={r.id}
                images={r.image}
                title={r.title}
                subtitle={r.subtitle}
                badge={r.badge}
                size="compact"
                imageAspectRatio="4/3"
                description={r.description}
                metadata={r.features.map((f, i, arr) => ({
                  label: f,
                  separator: i < arr.length - 1 ? '•' : undefined,
                }))}
                buttonText="Order now"
                onButtonClick={() => alert(`Order from ${r.title}`)}
                style={{ width: '100%' }}
              />
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '12px',
              color: 'var(--color-text)',
            }}
          >
            Key Features
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
            }}
          >
            {[
              {
                emoji: '🖼️',
                title: '4:3 Aspect Ratio',
                desc: 'Balanced proportions for content preview',
              },
              {
                emoji: '⭐',
                title: 'Badge Support',
                desc: 'Display ratings with flexible variants',
              },
              { emoji: '✨', title: 'Metadata Separators', desc: 'Custom separators (•, |, etc.)' },
              { emoji: '📝', title: 'Dense Typography', desc: 'Compact text for info density' },
              { emoji: '🎨', title: 'Design Tokens', desc: 'Consistent theming' },
              { emoji: '🔘', title: 'Action Button', desc: 'Built-in CTA button' },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  background: 'var(--color-surface-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '12px',
                }}
              >
                <div style={{ fontSize: '20px', marginBottom: '6px' }}>{f.emoji}</div>
                <h4
                  style={{
                    margin: '0 0 4px 0',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--color-text)',
                  }}
                >
                  {f.title}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: '11px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.4',
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '12px',
              color: 'var(--color-text)',
            }}
          >
            Use Cases
          </h3>
          <div
            style={{
              background: 'var(--color-surface-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '16px',
              fontSize: '13px',
              lineHeight: '1.6',
              color: 'var(--color-text-secondary)',
            }}
          >
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>
                <strong>Restaurant Discovery:</strong> Browse restaurants with ratings, pricing, and
                cuisine types in carousels
              </li>
              <li>
                <strong>Product Catalogs:</strong> Display products in grid or carousel layouts with
                quick actions
              </li>
              <li>
                <strong>Hotel/Travel:</strong> Show accommodations with amenities and booking
                options
              </li>
              <li>
                <strong>Content Discovery:</strong> Browse articles, videos with rich previews
              </li>
              <li>
                <strong>E-commerce:</strong> Product showcase with ratings and quick-buy actions
              </li>
            </ul>
          </div>
        </div>

        {/* Aspect Ratio Variants */}
        <div>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '12px',
              color: 'var(--color-text)',
            }}
          >
            Image Aspect Ratio Options
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fill, minmax(${COMPACT_CARD_WIDTH}px, 1fr))`,
              gap: '16px',
            }}
          >
            <SummaryCard
              images={SAMPLE_IMAGES.restaurant}
              title="4:3 Classic"
              subtitle="Recommended"
              badge="4.8"
              size="compact"
              imageAspectRatio="4/3"
              description="Balanced proportions, perfect for most content"
              metadata={[{ label: 'Default' }]}
              style={{ width: '100%' }}
            />
            <SummaryCard
              images={SAMPLE_IMAGES.restaurant}
              title="16:9 Widescreen"
              subtitle="Cinematic"
              badge="4.7"
              size="compact"
              imageAspectRatio="16/9"
              description="Wide format for landscape-oriented content"
              metadata={[{ label: 'Landscape' }]}
              style={{ width: '100%' }}
            />
            <SummaryCard
              images={SAMPLE_IMAGES.restaurant}
              title="1:1 Square"
              subtitle="Symmetric"
              badge="4.6"
              size="compact"
              imageAspectRatio="1/1"
              description="Square format for symmetric compositions"
              metadata={[{ label: 'Square' }]}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </section>

      {/* Layout Shift Prevention - NEW */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Layout Shift Prevention (NEW)</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Loading skeletons now match real content dimensions exactly using CSS aspect-ratio and
            dynamic description lines. Smooth fade transitions with 100ms delay prevent flash on
            fast loads.
          </p>
        </header>

        {/* Description Lines */}
        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '12px',
              color: 'var(--color-text)',
            }}
          >
            descriptionLines Prop - Skeleton Matches Content
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
              alignItems: 'start',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '8px',
                }}
              >
                descriptionLines={1} (skeleton & content)
              </p>
              <SummaryCard
                images={SAMPLE_IMAGES.restaurant}
                title="One Line Description"
                subtitle="Short content"
                badge="9.2"
                description="A tiny, brick-walled trattoria tucked down a side street."
                descriptionLines={1}
                buttonText="View"
                loading={true}
                style={{ maxWidth: `${CARD_WIDTH}px` }}
              />
            </div>

            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '8px',
                }}
              >
                descriptionLines={2} (default)
              </p>
              <SummaryCard
                images={SAMPLE_IMAGES.restaurant}
                title="Two Line Description"
                subtitle="Standard content"
                badge="9.2"
                description="A tiny, brick-walled trattoria tucked down a side street near Washington Square Park."
                descriptionLines={2}
                buttonText="View"
                loading={true}
                style={{ maxWidth: `${CARD_WIDTH}px` }}
              />
            </div>

            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '8px',
                }}
              >
                descriptionLines={3}
              </p>
              <SummaryCard
                images={SAMPLE_IMAGES.restaurant}
                title="Three Line Description"
                subtitle="Longer content"
                badge="9.2"
                description="A tiny, brick-walled trattoria tucked down a side street near Washington Square Park. The windows glow warm gold at night, and the smell of slow-simmered tomato sauce drifts out onto the sidewalk."
                descriptionLines={3}
                buttonText="View"
                loading={true}
                style={{ maxWidth: `${CARD_WIDTH}px` }}
              />
            </div>
          </div>
        </div>

        {/* Aspect Ratio Loading States */}
        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '12px',
              color: 'var(--color-text)',
            }}
          >
            imageAspectRatio - Skeleton Matches Image Dimensions
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
              alignItems: 'start',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '8px',
                }}
              >
                imageAspectRatio="16/9" (widescreen)
              </p>
              <SummaryCard
                images={SAMPLE_IMAGES.restaurant}
                imageAspectRatio="16/9"
                title="Widescreen Aspect"
                subtitle="16:9 format"
                badge="9.2"
                description="Skeleton uses CSS aspect-ratio to match exact image height"
                buttonText="View"
                loading={true}
                style={{ maxWidth: `${CARD_WIDTH}px` }}
              />
            </div>

            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '8px',
                }}
              >
                imageAspectRatio="4/3" (classic)
              </p>
              <SummaryCard
                images={SAMPLE_IMAGES.restaurant}
                imageAspectRatio="4/3"
                title="Classic Aspect"
                subtitle="4:3 format"
                badge="9.2"
                description="Prevents layout shift when transitioning from skeleton to image"
                buttonText="View"
                loading={true}
                style={{ maxWidth: `${CARD_WIDTH}px` }}
              />
            </div>

            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '8px',
                }}
              >
                imageAspectRatio="1/1" (square)
              </p>
              <SummaryCard
                images={SAMPLE_IMAGES.restaurant}
                imageAspectRatio="1/1"
                title="Square Aspect"
                subtitle="1:1 format"
                badge="9.2"
                description="All aspect ratios supported with zero layout shift"
                buttonText="View"
                loading={true}
                style={{ maxWidth: `${CARD_WIDTH}px` }}
              />
            </div>
          </div>
        </div>

        {/* Flat Variant Loading States */}
        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '12px',
              color: 'var(--color-text)',
            }}
          >
            Flat Variant - Edge-to-Edge with No Layout Shift
          </h3>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              marginBottom: '16px',
            }}
          >
            Flat variant cards (zero padding, no elevation) also maintain perfect layout stability
            during loading transitions.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
              alignItems: 'start',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '8px',
                }}
              >
                Flat + Single Image
              </p>
              <SummaryCard
                variant="flat"
                images={SAMPLE_IMAGES.restaurant}
                imageAspectRatio="4/3"
                title="Flat Card Loading"
                subtitle="Edge-to-edge"
                badge="9.2"
                description="No padding or elevation, perfect for grids and carousels"
                descriptionLines={2}
                buttonText="Order"
                loading={true}
                style={{ maxWidth: `${CARD_WIDTH}px` }}
              />
            </div>

            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '8px',
                }}
              >
                Flat + Grid Images
              </p>
              <SummaryCard
                variant="flat"
                images={[
                  { src: SAMPLE_IMAGES.pizza, alt: 'Pizza' },
                  { src: SAMPLE_IMAGES.pasta, alt: 'Pasta' },
                  { src: SAMPLE_IMAGES.salad, alt: 'Salad' },
                ]}
                title="Grid Layout Flat"
                subtitle="3 images"
                badge="9.5"
                description="Seamless grid layout with loading state"
                descriptionLines={2}
                buttonText="View"
                loading={true}
                loadingImageCount={3}
                style={{ maxWidth: `${CARD_WIDTH}px` }}
              />
            </div>

            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '8px',
                }}
              >
                Flat + Compact Size
              </p>
              <SummaryCard
                variant="flat"
                size="compact"
                images={SAMPLE_IMAGES.restaurant}
                imageAspectRatio="4/3"
                title="Compact Flat"
                subtitle="Dense & seamless"
                badge="9.0"
                description="Perfect for discovery carousels with no wasted space"
                descriptionLines={2}
                buttonText="Explore"
                loading={true}
                style={{ maxWidth: `${CARD_WIDTH}px` }}
              />
            </div>
          </div>
        </div>

        {/* Live Transition Demo */}
        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '12px',
              color: 'var(--color-text)',
            }}
          >
            Live Loading → Loaded Transition
          </h3>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              marginBottom: '16px',
            }}
          >
            Watch the smooth fade transition with 100ms delay. Toggle between loading and loaded
            states - no layout shift!
          </p>
          <LoadingTransitionDemo />
        </div>

        {/* Flat Variant Live Demo */}
        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '12px',
              color: 'var(--color-text)',
            }}
          >
            Live Flat Variant Transitions
          </h3>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              marginBottom: '16px',
            }}
          >
            Interactive demo for flat variant cards - watch edge-to-edge content transition
            smoothly.
          </p>
          <FlatLoadingTransitionDemo />
        </div>

        {/* Metadata Skeleton */}
        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '12px',
              color: 'var(--color-text)',
            }}
          >
            Metadata Skeleton Support (NEW)
          </h3>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              marginBottom: '16px',
            }}
          >
            When loading=true and metadata array is provided, skeleton automatically renders
            placeholders for each metadata item - no manual configuration needed!
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
              alignItems: 'start',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '8px',
                }}
              >
                2 metadata items (loading)
              </p>
              <SummaryCard
                images={SAMPLE_IMAGES.restaurant}
                imageAspectRatio="4/3"
                title="Restaurant Card"
                subtitle="With metadata"
                badge="9.2"
                description="Sample description text"
                descriptionLines={2}
                metadata={[
                  { icon: <Clock />, label: '10 min' },
                  { icon: <MapPin />, label: 'Downtown' },
                ]}
                buttonText="View"
                loading={true}
                style={{ maxWidth: `${CARD_WIDTH}px` }}
              />
            </div>

            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '8px',
                }}
              >
                4 metadata items (Airbnb style)
              </p>
              <SummaryCard
                images={SAMPLE_IMAGES.restaurant}
                imageAspectRatio="4/3"
                title="Beach House"
                subtitle="Oceanfront property"
                badge="4.8"
                description="Stunning views with modern architecture"
                descriptionLines={2}
                metadata={[
                  { label: '3 bed' },
                  { label: '2 bath' },
                  { label: 'Beach view' },
                  { label: 'Breakfast' },
                ]}
                buttonText="View Details"
                loading={true}
                style={{ maxWidth: `${CARD_WIDTH}px` }}
              />
            </div>

            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '8px',
                }}
              >
                No metadata (no skeleton)
              </p>
              <SummaryCard
                images={SAMPLE_IMAGES.restaurant}
                imageAspectRatio="4/3"
                title="Simple Card"
                subtitle="No metadata"
                badge="9.0"
                description="Card without metadata items"
                descriptionLines={2}
                buttonText="View"
                loading={true}
                style={{ maxWidth: `${CARD_WIDTH}px` }}
              />
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div
          style={{
            background: 'var(--color-surface-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '16px',
          }}
        >
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: 'var(--color-text)',
            }}
          >
            Industry Best Practices Implemented
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: '20px',
              fontSize: '13px',
              lineHeight: '1.6',
              color: 'var(--color-text-secondary)',
            }}
          >
            <li>
              <strong>CSS aspect-ratio:</strong> Responsive skeleton dimensions without fixed pixel
              heights
            </li>
            <li>
              <strong>Dynamic line-clamp:</strong> Description skeleton matches configured line
              count
            </li>
            <li>
              <strong>Metadata skeleton auto-detect:</strong> Skeleton count matches metadata array
              length
            </li>
            <li>
              <strong>Opacity fade:</strong> Smooth 300ms transition between loading and content
              states
            </li>
            <li>
              <strong>Delayed animation:</strong> 100ms delay prevents flash on fast loads
              (&lt;100ms)
            </li>
            <li>
              <strong>Zero CLS:</strong> Cumulative Layout Shift score remains 0 during transitions
            </li>
          </ul>
        </div>
      </section>

      {/* States */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>States</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Loading, error, and empty states for all scenarios
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {/* Loading States */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text)',
              }}
            >
              Loading - Single Image
            </h3>
            <SummaryCard
              images={SAMPLE_IMAGES.restaurant}
              title="Restaurant Name"
              subtitle="Location"
              badge="9.2"
              description="Description text"
              buttonText="Action"
              loading={true}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
          </div>

          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text)',
              }}
            >
              Loading - Grid Images
            </h3>
            <SummaryCard
              images={[
                { src: SAMPLE_IMAGES.pizza, alt: 'Pizza' },
                { src: SAMPLE_IMAGES.pasta, alt: 'Pasta' },
                { src: SAMPLE_IMAGES.salad, alt: 'Salad' },
              ]}
              title="Restaurant Name"
              subtitle="Location"
              badge="9.2"
              loading={true}
              loadingImageCount={3}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
          </div>

          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text)',
              }}
            >
              Loading - No Images
            </h3>
            <SummaryCard
              title="Restaurant Name"
              subtitle="Location"
              badge="9.2"
              description="Description text"
              buttonText="Action"
              loading={true}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            marginTop: '24px',
            alignItems: 'start',
          }}
        >
          {/* Error State */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text)',
              }}
            >
              Error State
            </h3>
            <SummaryCard
              error={true}
              errorTitle="Failed to load"
              errorMessage="Could not fetch restaurant data"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
          </div>

          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text)',
              }}
            >
              Error with Retry
            </h3>
            <SummaryCard
              error={true}
              errorTitle="Connection failed"
              errorMessage="Unable to load content. Please try again."
              onErrorRetry={() => {
                setRetryCount((c) => c + 1);
                console.log('Retry clicked', retryCount);
              }}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
          </div>

          {/* Empty State */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text)',
              }}
            >
              Empty State
            </h3>
            <SummaryCard
              emptyTitle="No content available"
              emptyMessage="There is currently no data to display"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
          </div>
        </div>
      </section>

      {/* Performance Features */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Performance & Callbacks</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Native lazy loading enabled by default, with image load/error callbacks
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text)',
              }}
            >
              Lazy Loading (Default)
            </h3>
            <SummaryCard
              images={SAMPLE_IMAGES.restaurant}
              title="Lazy Loaded Image"
              subtitle="loading='lazy'"
              description="Images load as they enter viewport for better performance"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginTop: '8px',
              }}
            >
              ✓ imageLazy=true (default)
            </p>
          </div>

          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text)',
              }}
            >
              Eager Loading
            </h3>
            <SummaryCard
              images={SAMPLE_IMAGES.restaurant}
              title="Eagerly Loaded"
              subtitle="loading='eager'"
              description="Disable lazy loading for above-the-fold content"
              imageLazy={false}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginTop: '8px',
              }}
            >
              ✓ imageLazy=false
            </p>
          </div>

          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text)',
              }}
            >
              Image Callbacks
            </h3>
            <SummaryCard
              images={SAMPLE_IMAGES.restaurant}
              title="With Callbacks"
              subtitle="onImageLoad/Error"
              description="Track image loading and errors for analytics or fallbacks"
              onImageLoad={(e) => console.log('Image loaded:', e.currentTarget.src)}
              onImageError={(e) => console.log('Image error:', e.currentTarget.src)}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginTop: '8px',
              }}
            >
              ✓ Check console for events
            </p>
          </div>
        </div>
      </section>

      {/* Top Overlay */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Top Overlay</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Add logos, badges, or custom content on top of images
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {/* Logo with dark background */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text)',
              }}
            >
              Logo Overlay - Dark Background
            </h3>
            <SummaryCard
              images="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
              title="Luxury Beach House"
              subtitle="98 Parnki Parade, Palm Beach"
              badge="$4,449,000"
              badgeVariant="solid"
              description="Stunning oceanfront property with modern architecture"
              metadata={[{ label: '5 beds' }, { label: '2 baths' }, { label: '625m²' }]}
              buttonText="View property"
              topOverlay={
                <SummaryCard.Overlay background="dark" height={40} align="center">
                  <svg width="80" height="24" viewBox="0 0 80 24" fill="none">
                    <rect width="80" height="24" rx="4" fill="#1E3A8A" />
                    <text
                      x="40"
                      y="15"
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="600"
                      fontFamily="system-ui, sans-serif"
                    >
                      LOGO
                    </text>
                  </svg>
                </SummaryCard.Overlay>
              }
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginTop: '8px',
              }}
            >
              ✓ Dark semi-transparent background
            </p>
          </div>

          {/* Logo with light background */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text)',
              }}
            >
              Logo Overlay - Light Background
            </h3>
            <SummaryCard
              images="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
              title="Modern Villa"
              subtitle="123 Coastal Drive"
              badge="Featured"
              description="Contemporary design with panoramic views"
              buttonText="Schedule Tour"
              topOverlay={
                <SummaryCard.Overlay background="light" height={40} align="center">
                  <svg width="80" height="24" viewBox="0 0 80 24" fill="none">
                    <rect width="80" height="24" rx="4" fill="#000000" />
                    <text
                      x="40"
                      y="15"
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="600"
                      fontFamily="system-ui, sans-serif"
                    >
                      BRAND
                    </text>
                  </svg>
                </SummaryCard.Overlay>
              }
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginTop: '8px',
              }}
            >
              ✓ Light semi-transparent background
            </p>
          </div>

          {/* Custom styled overlay - Navy background */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text)',
              }}
            >
              Custom Background Color
            </h3>
            <SummaryCard
              images="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
              title="Coastal Retreat"
              subtitle="Ocean View Estate"
              badge="New"
              badgeVariant="soft"
              description="Exclusive waterfront property"
              buttonText="Learn More"
              topOverlay={
                <SummaryCard.Overlay background="rgba(30, 58, 138, 0.9)" height={40} align="center">
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>
                    PREMIUM LISTING
                  </span>
                </SummaryCard.Overlay>
              }
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginTop: '8px',
              }}
            >
              ✓ Custom color (navy blue)
            </p>
          </div>

          {/* Grid images with overlay */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text)',
              }}
            >
              Overlay on Grid Images
            </h3>
            <SummaryCard
              images={[
                { src: SAMPLE_IMAGES.pizza, alt: 'Pizza' },
                { src: SAMPLE_IMAGES.pasta, alt: 'Pasta' },
                { src: SAMPLE_IMAGES.salad, alt: 'Salad' },
              ]}
              title="Italian Restaurant"
              subtitle="Authentic Cuisine"
              badge="4.8"
              description="Experience traditional Italian dishes"
              buttonText="Order Now"
              topOverlay={
                <SummaryCard.Overlay background="dark" height={40} align="left" padding={12}>
                  <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
                    <rect width="60" height="20" rx="3" fill="#DC2626" />
                    <text
                      x="30"
                      y="13"
                      textAnchor="middle"
                      fill="white"
                      fontSize="11"
                      fontWeight="700"
                      fontFamily="system-ui, sans-serif"
                    >
                      NEW
                    </text>
                  </svg>
                </SummaryCard.Overlay>
              }
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginTop: '8px',
              }}
            >
              ✓ Overlay works with grid layout
            </p>
          </div>

          {/* Left-aligned overlay */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text)',
              }}
            >
              Left-Aligned Content
            </h3>
            <SummaryCard
              images={SAMPLE_IMAGES.restaurant}
              title="Cafe Bistro"
              subtitle="Downtown Location"
              badge="Open"
              description="Cozy atmosphere with artisan coffee"
              buttonText="Visit Us"
              topOverlay={
                <SummaryCard.Overlay background="transparent" height={40} align="left" padding={12}>
                  <div
                    style={{
                      background: 'rgba(220, 38, 38, 0.9)',
                      padding: '4px 12px',
                      borderRadius: '4px',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    -20% OFF
                  </div>
                </SummaryCard.Overlay>
              }
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginTop: '8px',
              }}
            >
              ✓ align="left" with custom badge
            </p>
          </div>

          {/* Right-aligned overlay */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text)',
              }}
            >
              Right-Aligned Content
            </h3>
            <SummaryCard
              images={SAMPLE_IMAGES.restaurant}
              title="Steakhouse"
              subtitle="Premium Cuts"
              description="Fine dining experience with aged beef"
              buttonText="Reserve"
              topOverlay={
                <SummaryCard.Overlay
                  background="transparent"
                  height={40}
                  align="right"
                  padding={12}
                >
                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.7)',
                      padding: '6px 10px',
                      borderRadius: '20px',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>★</span>
                    <span>Featured</span>
                  </div>
                </SummaryCard.Overlay>
              }
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginTop: '8px',
              }}
            >
              ✓ align="right" with badge pill
            </p>
          </div>

          {/* Flat variant with overlay */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text)',
              }}
            >
              Flat Variant with Overlay
            </h3>
            <SummaryCard
              images="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
              title="Penthouse Suite"
              subtitle="City Center"
              badge="Premium"
              badgeVariant="solid"
              description="Luxury high-rise living with panoramic city views"
              variant="flat"
              topOverlay={
                <SummaryCard.Overlay background="rgba(0, 0, 0, 0.8)" height={40} align="center">
                  <svg width="100" height="28" viewBox="0 0 100 28" fill="none">
                    <text
                      x="50"
                      y="18"
                      textAnchor="middle"
                      fill="white"
                      fontSize="14"
                      fontWeight="700"
                      fontFamily="system-ui, sans-serif"
                      letterSpacing="1"
                    >
                      EXCLUSIVE
                    </text>
                  </svg>
                </SummaryCard.Overlay>
              }
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginTop: '8px',
              }}
            >
              ✓ variant="flat" (edge-to-edge)
            </p>
          </div>

          {/* Compact size with overlay */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text)',
              }}
            >
              Compact Size with Overlay
            </h3>
            <SummaryCard
              images="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
              title="Cozy Apartment"
              subtitle="Downtown"
              badge="$850K"
              description="Perfect starter home in prime location"
              size="compact"
              topOverlay={
                <SummaryCard.Overlay background="dark" height={36} align="left" padding={10}>
                  <svg width="50" height="20" viewBox="0 0 50 20" fill="none">
                    <rect width="50" height="20" rx="3" fill="#10B981" />
                    <text
                      x="25"
                      y="13"
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="system-ui, sans-serif"
                    >
                      HOT
                    </text>
                  </svg>
                </SummaryCard.Overlay>
              }
              style={{ maxWidth: `${COMPACT_CARD_WIDTH}px` }}
            />
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginTop: '8px',
              }}
            >
              ✓ size="compact" (denser layout)
            </p>
          </div>
        </div>
      </section>

      {/* Overlay Border Artifact Test */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Overlay Border Artifact Test</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Test various solid color overlays on flat variant cards to check for border artifacts
            (especially visible in dark mode)
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Bright colors - high visibility for artifacts */}
          {[
            { color: '#FF3333', label: 'Bright Red', textColor: 'white' },
            { color: '#33FF33', label: 'Bright Green', textColor: 'black' },
            { color: '#3366FF', label: 'Bright Blue', textColor: 'white' },
            { color: '#FFFF33', label: 'Bright Yellow', textColor: 'black' },
            { color: '#FF33FF', label: 'Bright Magenta', textColor: 'white' },
            { color: '#33FFFF', label: 'Bright Cyan', textColor: 'black' },
            // Dark colors - shows artifacts on light edges in dark mode
            { color: '#1A1A1A', label: 'Near Black', textColor: 'white' },
            { color: '#2D2D2D', label: 'Dark Gray', textColor: 'white' },
            { color: '#0F172A', label: 'Slate Dark', textColor: 'white' },
            { color: '#18181B', label: 'Zinc Dark', textColor: 'white' },
          ].map(({ color, label, textColor }) => (
            <div key={color}>
              <SummaryCard
                variant="flat"
                imageAspectRatio="1/1"
                images="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
                title="$1,200,000"
                subtitle="123 Main Street"
                buttonText="View property"
                topOverlay={
                  <SummaryCard.Overlay background={color} height={40} align="center">
                    <span
                      style={{
                        color: textColor,
                        fontWeight: 600,
                        fontSize: '14px',
                      }}
                    >
                      Agency • {label}
                    </span>
                  </SummaryCard.Overlay>
                }
              />
              <p
                style={{
                  fontSize: '11px',
                  color: 'var(--color-text-secondary)',
                  marginTop: '8px',
                  fontFamily: 'monospace',
                }}
              >
                {color}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Real-World Example */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Real-World Example</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Restaurant card with all features
          </p>
        </header>

        <div style={{ maxWidth: `${CARD_WIDTH}px` }}>
          <SummaryCard
            images={[
              { src: SAMPLE_IMAGES.pizza, alt: 'Signature Pizza' },
              { src: SAMPLE_IMAGES.pasta, alt: 'Fresh Pasta' },
              { src: SAMPLE_IMAGES.salad, alt: 'Garden Salad' },
            ]}
            title="Little Nona's"
            subtitle="1427 Via Campania, North Beach"
            badge="9.2"
            badgeVariant="soft"
            description="A tiny, brick-walled trattoria tucked down a side street near Washington Square Park. The windows glow warm gold at night, and the smell of slow-simmered tomato sauce drifts out onto the sidewalk."
            metadata={[
              { icon: <StarFilled />, label: '9.2 rating' },
              { icon: <MapPin />, label: 'North Beach' },
              { icon: <Clock />, label: 'Open now' },
            ]}
            buttonText="Reserve"
            onButtonClick={() => console.log('Reserve')}
            onImagesLoad={(index, _e) => console.log(`Image ${index} loaded`)}
            onImagesError={(index, _e) => console.log(`Image ${index} error`)}
          />
        </div>
      </section>

      {/* Props Documentation */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Props</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Complete API reference for SummaryCard
          </p>
        </header>
        <PropsTable
          hideThemeColumn
          rows={[
            {
              name: 'images',
              type: 'string | SummaryCardImage | SummaryCardImage[]',
              description: 'Image(s) to display - single image, or 2-4 image grid',
            },
            {
              name: 'title',
              type: 'string',
              description: 'Card title text',
            },
            {
              name: 'subtitle',
              type: 'string',
              description: 'Card subtitle text (appears below title)',
            },
            {
              name: 'badge',
              type: 'string | number',
              description: 'Badge content to display in header',
            },
            {
              name: 'badgeVariant',
              type: "'default' | 'success' | 'warning' | 'error'",
              default: "'default'",
              description: 'Badge styling variant',
            },
            {
              name: 'variant',
              type: "'default' | 'flat'",
              default: "'default'",
              description:
                'Card variant - "flat" for edge-to-edge layout with no padding or elevation',
            },
            {
              name: 'size',
              type: "'default' | 'compact'",
              default: "'default'",
              description: 'Card size/density - "compact" for dense layouts',
            },
            {
              name: 'imageAspectRatio',
              type: "'auto' | '16/9' | '4/3' | '1/1'",
              default: "'auto'",
              description: 'Image aspect ratio for single images',
            },
            {
              name: 'description',
              type: 'string',
              description: 'Main description text content',
            },
            {
              name: 'descriptionLines',
              type: 'number',
              default: '2',
              description:
                'Number of lines to display for description (applies line-clamp to content and determines skeleton line count)',
            },
            {
              name: 'metadata',
              type: 'Array<{ icon?: IconName | React.ReactElement, label: string }>',
              description:
                'Metadata items with optional icons (library icon names OR custom React elements)',
            },
            {
              name: 'buttonText',
              type: 'string',
              description: 'Action button text',
            },
            {
              name: 'onButtonClick',
              type: '() => void',
              description: 'Button click handler',
            },
            {
              name: 'buttonFullWidth',
              type: 'boolean',
              default: 'Auto (true for default, false for flat)',
              description:
                'Button full width on desktop. Auto-determined based on variant if not set.',
            },
            {
              name: 'loading',
              type: 'boolean',
              description: 'Show loading skeleton state',
            },
            {
              name: 'loadingImageCount',
              type: 'number',
              default: '1 (single) or 3 (grid)',
              description: 'Number of skeleton images to show when loading',
            },
            {
              name: 'error',
              type: 'boolean',
              description: 'Show error state',
            },
            {
              name: 'errorTitle',
              type: 'string',
              default: "'Error'",
              description: 'Custom error title',
            },
            {
              name: 'errorMessage',
              type: 'string',
              default: "'Something went wrong'",
              description: 'Custom error message',
            },
            {
              name: 'onErrorRetry',
              type: '() => void',
              description: 'Shows retry button when provided',
            },
            {
              name: 'emptyTitle',
              type: 'string',
              default: "'No content'",
              description: 'Custom empty state title',
            },
            {
              name: 'emptyMessage',
              type: 'string',
              description: 'Custom empty state message',
            },
            {
              name: 'imageLazy',
              type: 'boolean',
              default: 'true',
              description: 'Enable native lazy loading for images',
            },
            {
              name: 'onImageLoad',
              type: '(event: React.SyntheticEvent<HTMLImageElement>) => void',
              description: 'Callback when single image loads successfully',
            },
            {
              name: 'onImageError',
              type: '(event: React.SyntheticEvent<HTMLImageElement>) => void',
              description: 'Callback when single image fails to load',
            },
            {
              name: 'onImagesLoad',
              type: '(index: number, event: React.SyntheticEvent<HTMLImageElement>) => void',
              description: 'Callback when grid image loads (includes image index)',
            },
            {
              name: 'onImagesError',
              type: '(index: number, event: React.SyntheticEvent<HTMLImageElement>) => void',
              description: 'Callback when grid image fails (includes image index)',
            },
            {
              name: 'topOverlay',
              type: 'React.ReactNode',
              description:
                'Custom overlay content to render at the top of the image (e.g., logos, badges)',
            },
            {
              name: 'className',
              type: 'string',
              description: 'Additional CSS class',
            },
            {
              name: 'style',
              type: 'React.CSSProperties',
              description: 'Inline styles',
            },
          ]}
        />
      </section>
    </div>
  );
};

export const SummaryCards: StoryObj = {
  render: () => <SummaryCardsComponent />,
};
