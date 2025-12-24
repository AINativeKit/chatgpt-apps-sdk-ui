import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ImageCard } from './ImageCard';
import { PropsTable } from '../../tokens/PropsTable';
import { codeBlockStyles } from '../storybook/codeBlockStyles';

const meta: Meta<typeof ImageCard> = {
  title: 'Composed Components/Cards/Image Cards',
  component: ImageCard,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// Sample image URLs (using placeholder images)
const SAMPLE_IMAGES = {
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&auto=format&fit=crop',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
  dessert: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&auto=format&fit=crop',
};

const CARD_WIDTH = 345;
const COMPACT_CARD_WIDTH = 240;

// Main unified ImageCard showcase component
const ImageCardsComponent: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '32px' }}>ImageCard System</h1>

      {/* Introduction */}
      <section style={{ marginBottom: '64px' }}>
        <p
          style={{
            marginBottom: '24px',
            color: 'var(--ai-color-text-secondary)',
            fontSize: '16px',
            lineHeight: '1.6',
          }}
        >
          Cards with background images designed for visual content like menus, galleries, and
          product showcases. Supports multiple image positions, content overlays, loading states,
          error handling, and badges.
        </p>
      </section>

      {/* Image Positions */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Image Positions</h2>
          <p style={{ color: 'var(--ai-color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Control image focal point with top, center, or bottom positioning
          </p>
        </header>

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
            actionIcon="plus-circle-add"
            actionLabel="Add"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <ImageCard
            image={SAMPLE_IMAGES.salad}
            imagePosition="top"
            title="Top Position"
            subtitle="Focuses on top"
            actionIcon="plus-circle-add"
            actionLabel="Add"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <ImageCard
            image={SAMPLE_IMAGES.dessert}
            imagePosition="bottom"
            title="Bottom Position"
            subtitle="Focuses on bottom"
            actionIcon="plus-circle-add"
            actionLabel="Add"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
      </section>

      {/* Content Variations */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Content Variations</h2>
          <p style={{ color: 'var(--ai-color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Flexible content options from image-only to full text overlay with actions
          </p>
        </header>

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
            actionIcon="user-heart"
            actionLabel="Add to favorites"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <ImageCard
            image={SAMPLE_IMAGES.pizza}
            title="Margherita Pizza"
            subtitle="Classic Italian"
            actionIcon="plus-circle-add"
            actionLabel="Add to cart"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <ImageCard
            image={SAMPLE_IMAGES.dessert}
            title="Compact Layout"
            subtitle="240×240 footprint"
            actionIcon="plus-circle-add"
            actionLabel="Add to cart"
            size="compact"
            style={{ maxWidth: `${COMPACT_CARD_WIDTH}px` }}
          />
          <ImageCard
            image={{
              src: SAMPLE_IMAGES.pizza,
              alt: 'Delicious margherita pizza with fresh basil leaves',
            }}
            title="With Alt Text"
            subtitle="Better accessibility"
            actionIcon="plus-circle-add"
            actionLabel="Add to cart"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
      </section>

      {/* Loading States */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Loading States</h2>
          <p style={{ color: 'var(--ai-color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Built-in skeleton loading for better perceived performance
          </p>
        </header>

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
            title="Loading Card"
            subtitle="Classic Italian"
            actionIcon="plus-circle-add"
            actionLabel="Add to cart"
            loading={true}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
      </section>

      {/* Error States */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Error States</h2>
          <p style={{ color: 'var(--ai-color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Graceful error handling with optional retry functionality
          </p>
        </header>

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
            actionIcon="plus-circle-add"
            actionLabel="Add to cart"
            error={true}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <ImageCard
            image={SAMPLE_IMAGES.pizza}
            title="With Retry"
            subtitle="Custom error message"
            actionIcon="plus-circle-add"
            actionLabel="Add to cart"
            error={true}
            errorTitle="Failed to load"
            errorMessage="Unable to load this image. Please try again."
            onErrorRetry={() => console.log('Retry')}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
      </section>

      {/* Interactive Examples */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Interactive Examples</h2>
          <p style={{ color: 'var(--ai-color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Cards with hover effects and clickable areas
          </p>
        </header>

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
            title="Interactive Card"
            subtitle="Hover to see effect"
            actionIcon="plus-circle-add"
            actionLabel="Add to cart"
            interactive
            onClick={() => console.log('Card clicked')}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <ImageCard
            image={SAMPLE_IMAGES.pasta}
            title="Different Actions"
            subtitle="Various action icons"
            actionIcon="user-heart"
            actionLabel="Add to favorites"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <ImageCard
            image={SAMPLE_IMAGES.salad}
            title="Share Action"
            subtitle="Share with friends"
            actionIcon="share"
            actionLabel="Share"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <ImageCard
            image={SAMPLE_IMAGES.dessert}
            title="Info Action"
            subtitle="Learn more"
            actionIcon="info-circle"
            actionLabel="More information"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
      </section>

      {/* Badge/Chip Support */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Badge & Chip Support</h2>
          <p style={{ color: 'var(--ai-color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Add status indicators to cards. The component automatically chooses the best
            presentation:
            <br />• <strong>Short content (4 chars or less)</strong>: "New", "5", "✓" → Uses Badge
            (circular)
            <br />• <strong>Longer content (more than 4 chars)</strong>: "Featured", "On Sale" →
            Uses Chip (pill-shaped)
            <br />
            For best visibility on images, use{' '}
            <code
              style={{
                background: 'var(--ai-color-bg-tertiary)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '12px',
              }}
            >
              badgeVariant="solid"
            </code>{' '}
            or{' '}
            <code
              style={{
                background: 'var(--ai-color-bg-tertiary)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '12px',
              }}
            >
              badgeVariant="soft"
            </code>
          </p>
        </header>

        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '12px',
              color: 'var(--ai-color-text-secondary)',
            }}
          >
            Short Content - Badge (4 chars or less)
          </h3>
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
              title="Badge - Top Right"
              subtitle="Default position with filled variant"
              badge="New"
              badgeVariant="solid"
              actionIcon="plus-circle-add"
              actionLabel="Add to cart"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.pasta}
              title="Badge - Top Left"
              subtitle="Filled variant, left position"
              badge="Sale"
              badgeVariant="solid"
              badgePosition="top-left"
              actionIcon="plus-circle-add"
              actionLabel="Add to cart"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.dessert}
              title="Numeric Badge"
              subtitle="Great for counts"
              badge={5}
              badgeVariant="solid"
              actionIcon="plus-circle-add"
              actionLabel="Add to cart"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '12px',
              color: 'var(--ai-color-text-secondary)',
            }}
          >
            Longer Content - Chip (more than 4 chars)
          </h3>
          <p
            style={{
              color: 'var(--ai-color-text-secondary)',
              fontSize: '12px',
              marginBottom: '16px',
            }}
          >
            When badge text exceeds 4 characters, the component automatically renders as a Chip
            (pill-shaped) instead of a Badge for better visual balance.
          </p>
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
              title="Featured"
              subtitle="Chip with neutral variant"
              badge="Featured"
              badgeVariant="soft"
              actionIcon="plus-circle-add"
              actionLabel="Add to cart"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.pasta}
              title="On Sale"
              subtitle="Chip with filled variant"
              badge="On Sale"
              badgeVariant="solid"
              actionIcon="plus-circle-add"
              actionLabel="Add to cart"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.salad}
              title="Popular"
              subtitle="Longer text as chip"
              badge="Popular"
              badgeVariant="solid"
              badgePosition="top-left"
              actionIcon="plus-circle-add"
              actionLabel="Add to cart"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.dessert}
              title="Top Rated"
              subtitle="Chip positioned left"
              badge="Top Rated"
              badgeVariant="soft"
              badgePosition="top-left"
              actionIcon="plus-circle-add"
              actionLabel="Add to cart"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
          </div>
        </div>

        <div>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '12px',
              color: 'var(--ai-color-text-secondary)',
            }}
          >
            Other Badge Variants (Not Recommended for Images)
          </h3>
          <p
            style={{
              color: 'var(--ai-color-text-secondary)',
              fontSize: '12px',
              marginBottom: '16px',
            }}
          >
            These variants use transparent backgrounds and may have low contrast on images. Consider
            using filled or neutral variants instead.
          </p>
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
              title="Success Badge"
              subtitle="Transparent - lower contrast"
              badge="✓"
              badgeVariant="soft"
              actionIcon="plus-circle-add"
              actionLabel="Add to cart"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.pasta}
              title="Warning Badge"
              subtitle="Transparent - lower contrast"
              badge="!"
              badgeVariant="soft"
              actionIcon="plus-circle-add"
              actionLabel="Add to cart"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.salad}
              title="Error Badge"
              subtitle="Transparent - lower contrast"
              badge="×"
              badgeVariant="soft"
              actionIcon="plus-circle-add"
              actionLabel="Add to cart"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.dessert}
              title="Default Badge"
              subtitle="Transparent - lower contrast"
              badge="Info"
              badgeVariant="soft"
              actionIcon="plus-circle-add"
              actionLabel="Add to cart"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
          </div>
        </div>
      </section>

      {/* Real-World Examples */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Real-World Examples</h2>
          <p style={{ color: 'var(--ai-color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Practical use cases like restaurant menus and product galleries
          </p>
        </header>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
            Restaurant Menu Grid
          </h3>
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
              actionIcon="plus-circle-add"
              actionLabel="Add to cart"
              interactive
              onClick={() => console.log('Added pizza')}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.pasta}
              title="Spaghetti Carbonara"
              subtitle="Eggs, bacon, parmesan"
              actionIcon="plus-circle-add"
              actionLabel="Add to cart"
              interactive
              onClick={() => console.log('Added pasta')}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.salad}
              title="Caesar Salad"
              subtitle="Romaine, croutons, dressing"
              actionIcon="plus-circle-add"
              actionLabel="Add to cart"
              interactive
              onClick={() => console.log('Added salad')}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.dessert}
              title="Tiramisu"
              subtitle="Coffee-flavored dessert"
              actionIcon="plus-circle-add"
              actionLabel="Add to cart"
              interactive
              onClick={() => console.log('Added dessert')}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
            Elevation Levels
          </h3>
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
              actionIcon="plus-circle-add"
              actionLabel="Add"
              elevationLevel={0}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.pizza}
              title="Elevation 1"
              subtitle="Default shadow"
              actionIcon="plus-circle-add"
              actionLabel="Add"
              elevationLevel={1}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.pizza}
              title="Elevation 3"
              subtitle="Higher elevation"
              actionIcon="plus-circle-add"
              actionLabel="Add"
              elevationLevel={3}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Custom Sizing</h3>
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
              actionIcon="info-circle"
              actionLabel="Learn more"
              minHeight={200}
              aspectRatio="16 / 9"
              style={{ maxWidth: '360px' }}
            />
          </div>
        </div>
      </section>

      {/* Usage */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Usage</h2>
          <p style={{ color: 'var(--ai-color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Code examples for common ImageCard patterns
          </p>
        </header>

        <details style={{ marginBottom: '16px', cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, marginBottom: '12px' }}>Basic ImageCard</summary>
          <pre style={codeBlockStyles.primary}>{`import { ImageCard } from '@ainativekit/ui';

function Component() {
  return (
    <ImageCard
      image="/path/to/image.jpg"
      title="Card Title"
      subtitle="Card description"
    />
  );
}`}</pre>
        </details>

        <details style={{ marginBottom: '16px', cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, marginBottom: '12px' }}>With Action Button</summary>
          <pre style={codeBlockStyles.primary}>{`<ImageCard
  image="/image.jpg"
  title="Title"
  subtitle="Description text"
  actionIcon="plus-circle-add"
  actionLabel="Add to cart"
  onAction={() => console.log('clicked')}
/>`}</pre>
        </details>

        <details style={{ marginBottom: '16px', cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, marginBottom: '12px' }}>
            Image Position Variations
          </summary>
          <pre style={codeBlockStyles.primary}>{`// Center position (default)
<ImageCard imagePosition="center" {...props} />

// Top position  
<ImageCard imagePosition="top" {...props} />

// Bottom position
<ImageCard imagePosition="bottom" {...props} />`}</pre>
        </details>

        <details style={{ marginBottom: '16px', cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, marginBottom: '12px' }}>
            Loading & Error States
          </summary>
          <pre style={codeBlockStyles.primary}>{`// Loading state
<ImageCard loading {...props} />

// Error state
<ImageCard 
  error 
  errorTitle="Failed to load"
  errorMessage="Unable to load this image"
  onErrorRetry={() => retry()}
  {...props}
/>`}</pre>
        </details>

        <details style={{ marginBottom: '16px', cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, marginBottom: '12px' }}>With Accessibility</summary>
          <pre style={codeBlockStyles.primary}>{`// Using object format for alt text
<ImageCard
  image={{
    src: '/image.jpg',
    alt: 'Detailed description of the image'
  }}
  title="Product Name"
  actionIcon="plus-circle-add"
  actionLabel="Add to cart"
/>`}</pre>
        </details>

        <details style={{ cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, marginBottom: '12px' }}>Custom Sizing</summary>
          <pre style={codeBlockStyles.primary}>{`// Custom aspect ratio and min-height
<ImageCard
  image="/image.jpg"
  title="16:9 Wide Card"
  minHeight={200}
  aspectRatio="16 / 9"
/>

// Compact size variant
<ImageCard
  size="compact"
  {...props}
/>`}</pre>
        </details>
      </section>

      {/* Props */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Props</h2>
          <p style={{ color: 'var(--ai-color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Complete API reference for ImageCard component
          </p>
        </header>

        <PropsTable
          hideThemeColumn
          rows={[
            {
              name: 'image',
              type: 'string | { src: string; alt: string }',
              required: true,
              description: 'Image source URL or object with src and alt text',
            },
            {
              name: 'imagePosition',
              type: "'center' | 'top' | 'bottom'",
              default: "'center'",
              description: 'Image focal point positioning',
            },
            {
              name: 'title',
              type: 'string',
              description: 'Card title text (optional)',
            },
            {
              name: 'subtitle',
              type: 'string',
              description: 'Card subtitle text (optional)',
            },
            {
              name: 'actionIcon',
              type: 'IconName',
              description: 'Icon for the action button',
            },
            {
              name: 'actionLabel',
              type: 'string',
              description:
                'Accessibility label for action button (required when actionIcon provided)',
            },
            {
              name: 'onAction',
              type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
              description: 'Action button click handler',
            },
            {
              name: 'size',
              type: "'default' | 'compact'",
              default: "'default'",
              description: 'Size variant - compact is 240×240',
            },
            {
              name: 'minHeight',
              type: 'number | string',
              description: 'Custom minimum height (px or CSS length)',
            },
            {
              name: 'aspectRatio',
              type: 'string',
              description: "Custom aspect ratio (e.g. '16 / 9')",
            },
            {
              name: 'loading',
              type: 'boolean',
              default: 'false',
              description: 'Shows skeleton loading state',
            },
            {
              name: 'error',
              type: 'boolean',
              default: 'false',
              description: 'Shows error state',
            },
            {
              name: 'errorTitle',
              type: 'string',
              default: "'Failed to load'",
              description: 'Custom error title',
            },
            {
              name: 'errorMessage',
              type: 'string',
              description: 'Custom error message',
            },
            {
              name: 'onErrorRetry',
              type: '() => void',
              description: 'Shows retry button when provided',
            },
            {
              name: 'badge',
              type: 'string | number',
              description:
                'Badge content (text or number). Display status indicators like "New", "Sale", or numeric counts.',
            },
            {
              name: 'badgePosition',
              type: "'top-left' | 'top-right'",
              default: "'top-right'",
              description: 'Badge position on the card.',
            },
            {
              name: 'badgeVariant',
              type: "BadgeProps['variant']",
              default: "'default'",
              description:
                'Badge styling variant. For images, use "filled" or "neutral" for better contrast. Other variants (default, success, warning, error) use transparent backgrounds and may have low visibility on images.',
            },
            {
              name: 'titleLines',
              type: '1 | 2 | 3',
              default: '1',
              description: 'Number of lines for title (1-3)',
            },
            {
              name: 'subtitleLines',
              type: '1 | 2 | 3',
              default: '1',
              description: 'Number of lines for subtitle (1-3)',
            },
            {
              name: 'onImageLoad',
              type: '(event: React.SyntheticEvent<HTMLImageElement>) => void',
              description: 'Callback when image loads successfully',
            },
            {
              name: 'onImageError',
              type: '(event: React.SyntheticEvent<HTMLImageElement>) => void',
              description: 'Callback when image fails to load',
            },
            {
              name: 'lazy',
              type: 'boolean',
              default: 'true',
              description: 'Enable native lazy loading',
            },
            {
              name: 'interactive',
              type: 'boolean',
              description: 'Enable hover effects (from Card)',
            },
            {
              name: 'elevationLevel',
              type: '0 | 1 | 2 | 3 | 4 | 5',
              default: '1',
              description: 'Shadow elevation level (from Card)',
            },
            {
              name: 'onClick',
              type: '(event: React.MouseEvent) => void',
              description: 'Card click handler (from Card)',
            },
            {
              name: 'className',
              type: 'string',
              description: 'Additional CSS class',
            },
            {
              name: 'data-testid',
              type: 'string',
              description: 'Test ID for testing purposes',
            },
            {
              name: 'style',
              type: 'React.CSSProperties',
              description: 'Inline styles',
            },
          ]}
        />
      </section>

      {/* Best Practices */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Best Practices</h2>
          <p style={{ color: 'var(--ai-color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Guidelines for using ImageCard effectively
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
          }}
        >
          <div
            style={{
              background: 'var(--ai-color-bg-secondary)',
              border: '1px solid var(--ai-color-border-default)',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <strong
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'var(--ai-color-text-primary)',
              }}
            >
              ✅ Badge Best Practices
            </strong>
            <ul
              style={{
                margin: 0,
                paddingLeft: '20px',
                fontSize: '13px',
                color: 'var(--ai-color-text-secondary)',
                lineHeight: '1.6',
              }}
            >
              <li>
                Use{' '}
                <code
                  style={{
                    background: 'var(--ai-color-bg-tertiary)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                >
                  badgeVariant="solid"
                </code>{' '}
                for maximum contrast on images
              </li>
              <li>
                Use{' '}
                <code
                  style={{
                    background: 'var(--ai-color-bg-tertiary)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                >
                  badgeVariant="soft"
                </code>{' '}
                for subtle status indicators
              </li>
              <li>
                Avoid transparent variants (default, success, warning, error) on images due to low
                contrast
              </li>
              <li>Keep badge text short: "New", "Sale", "Featured" or single characters</li>
              <li>Use numeric badges sparingly (e.g., counts, ratings)</li>
            </ul>
          </div>

          <div
            style={{
              background: 'var(--ai-color-bg-secondary)',
              border: '1px solid var(--ai-color-border-default)',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <strong
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'var(--ai-color-text-primary)',
              }}
            >
              ✅ Content Guidelines
            </strong>
            <ul
              style={{
                margin: 0,
                paddingLeft: '20px',
                fontSize: '13px',
                color: 'var(--ai-color-text-secondary)',
                lineHeight: '1.6',
              }}
            >
              <li>Keep titles concise (2-3 words) for readability</li>
              <li>Limit subtitle to essential info only</li>
              <li>Overlay gradient ensures text is always readable</li>
              <li>Action buttons are optional but recommended</li>
              <li>Works best with aspect ratios between 1:1 and 16:9</li>
            </ul>
          </div>

          <div
            style={{
              background: 'var(--ai-color-bg-secondary)',
              border: '1px solid var(--ai-color-border-default)',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <strong
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'var(--ai-color-text-primary)',
              }}
            >
              ✅ Image Guidelines
            </strong>
            <ul
              style={{
                margin: 0,
                paddingLeft: '20px',
                fontSize: '13px',
                color: 'var(--ai-color-text-secondary)',
                lineHeight: '1.6',
              }}
            >
              <li>Use high-quality images (avoid pixelated or low-res)</li>
              <li>Match aspect ratio to content type</li>
              <li>Always provide alt text via image object for accessibility</li>
              <li>Consider focal point when choosing imagePosition</li>
              <li>Optimize image file size for performance</li>
            </ul>
          </div>

          <div
            style={{
              background: 'var(--ai-color-bg-secondary)',
              border: '1px solid var(--ai-color-border-default)',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <strong
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'var(--ai-color-text-primary)',
              }}
            >
              ✅ Interaction Patterns
            </strong>
            <ul
              style={{
                margin: 0,
                paddingLeft: '20px',
                fontSize: '13px',
                color: 'var(--ai-color-text-secondary)',
                lineHeight: '1.6',
              }}
            >
              <li>
                Use{' '}
                <code
                  style={{
                    background: 'var(--ai-color-bg-tertiary)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                >
                  interactive
                </code>{' '}
                for hover effects
              </li>
              <li>Action buttons for primary interactions (add, favorite)</li>
              <li>Card click for navigation or selection</li>
              <li>Combine with loading and error states for better UX</li>
              <li>Use elevation levels to establish visual hierarchy</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

// Single unified story export
export const ImageCards: StoryObj = {
  render: () => <ImageCardsComponent />,
};
