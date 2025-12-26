import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ImageCard } from './ImageCard';
import { PropsTable } from '../../tokens/PropsTable';
import { codeBlockStyles } from '../storybook/codeBlockStyles';
import {
  PlusCircleAdd,
  UserHeart,
  Share,
  InfoCircle,
} from '@openai/apps-sdk-ui/components/Icon';

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
            color: 'var(--color-text-secondary)',
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
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
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
      </section>

      {/* Content Variations */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Content Variations</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
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
            actionIcon={<UserHeart />}
            actionLabel="Add to favorites"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <ImageCard
            image={SAMPLE_IMAGES.pizza}
            title="Margherita Pizza"
            subtitle="Classic Italian"
            actionIcon={<PlusCircleAdd />}
            actionLabel="Add to cart"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <ImageCard
            image={SAMPLE_IMAGES.dessert}
            title="Compact Layout"
            subtitle="240×240 footprint"
            actionIcon={<PlusCircleAdd />}
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
            actionIcon={<PlusCircleAdd />}
            actionLabel="Add to cart"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
      </section>

      {/* Loading States */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Loading States</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
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
            actionIcon={<PlusCircleAdd />}
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
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
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
            actionIcon={<PlusCircleAdd />}
            actionLabel="Add to cart"
            error={true}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <ImageCard
            image={SAMPLE_IMAGES.pizza}
            title="With Retry"
            subtitle="Custom error message"
            actionIcon={<PlusCircleAdd />}
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
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
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
            actionIcon={<PlusCircleAdd />}
            actionLabel="Add to cart"
            interactive
            onClick={() => console.log('Card clicked')}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <ImageCard
            image={SAMPLE_IMAGES.pasta}
            title="Different Actions"
            subtitle="Various action icons"
            actionIcon={<UserHeart />}
            actionLabel="Add to favorites"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <ImageCard
            image={SAMPLE_IMAGES.salad}
            title="Share Action"
            subtitle="Share with friends"
            actionIcon={<Share />}
            actionLabel="Share"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <ImageCard
            image={SAMPLE_IMAGES.dessert}
            title="Info Action"
            subtitle="Learn more"
            actionIcon={<InfoCircle />}
            actionLabel="More information"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
      </section>

      {/* Badge Support */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Badge Support</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Add status indicators using apps-sdk-ui Badge with full customization: variant, size,
            pill shape, and semantic colors.
          </p>
        </header>

        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '12px',
              color: 'var(--color-text-secondary)',
            }}
          >
            Variants & Positions
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
              title="Solid Variant"
              subtitle="Top right (default position)"
              badge="New"
              badgeVariant="solid"
              actionIcon={<PlusCircleAdd />}
              actionLabel="Add to cart"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.pasta}
              title="Soft Variant"
              subtitle="Top left position"
              badge="Sale"
              badgeVariant="soft"
              badgePosition="top-left"
              actionIcon={<PlusCircleAdd />}
              actionLabel="Add to cart"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.dessert}
              title="Outline Variant"
              subtitle="Numeric badge"
              badge={5}
              badgeVariant="outline"
              actionIcon={<PlusCircleAdd />}
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
              color: 'var(--color-text-secondary)',
            }}
          >
            Sizes & Pill Shape
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
              title="Small Size"
              subtitle="Default size"
              badge="New"
              badgeVariant="solid"
              badgeSize="sm"
              actionIcon={<PlusCircleAdd />}
              actionLabel="Add to cart"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.pasta}
              title="Medium Size"
              subtitle="Larger badge"
              badge="Featured"
              badgeVariant="solid"
              badgeSize="md"
              actionIcon={<PlusCircleAdd />}
              actionLabel="Add to cart"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.salad}
              title="Pill Shape"
              subtitle="Fully rounded badge"
              badge={12}
              badgeVariant="solid"
              badgePill
              actionIcon={<PlusCircleAdd />}
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
              color: 'var(--color-text-secondary)',
            }}
          >
            Semantic Colors
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
              title="Info Color"
              subtitle="Blue for information"
              badge="Popular"
              badgeVariant="solid"
              badgeColor="info"
              actionIcon={<PlusCircleAdd />}
              actionLabel="Add to cart"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.dessert}
              title="Discovery Color"
              subtitle="Purple for discovery"
              badge="New"
              badgeVariant="solid"
              badgeColor="discovery"
              actionIcon={<PlusCircleAdd />}
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
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
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
              actionIcon={<PlusCircleAdd />}
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
              actionIcon={<PlusCircleAdd />}
              actionLabel="Add"
              elevationLevel={0}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.pizza}
              title="Elevation 1"
              subtitle="Default shadow"
              actionIcon={<PlusCircleAdd />}
              actionLabel="Add"
              elevationLevel={1}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <ImageCard
              image={SAMPLE_IMAGES.pizza}
              title="Elevation 3"
              subtitle="Higher elevation"
              actionIcon={<PlusCircleAdd />}
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
              actionIcon={<InfoCircle />}
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
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
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
  actionIcon={<PlusCircleAdd />}
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
  actionIcon={<PlusCircleAdd />}
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
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
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
              type: "'solid' | 'soft' | 'outline'",
              default: "'soft'",
              description:
                'Badge styling variant. Use "solid" for maximum contrast on images.',
            },
            {
              name: 'badgeSize',
              type: "'sm' | 'md' | 'lg'",
              default: "'sm' (auto 'md' for longer text)",
              description: 'Badge size. Auto-sizes to "md" for badges longer than 4 characters.',
            },
            {
              name: 'badgePill',
              type: 'boolean',
              default: 'false',
              description: 'Use pill shape (fully rounded) for the badge.',
            },
            {
              name: 'badgeColor',
              type: "'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'discovery'",
              default: "'secondary'",
              description: 'Semantic color for the badge.',
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
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
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
              background: 'var(--color-surface-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <strong
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'var(--color-text)',
              }}
            >
              ✅ Badge Best Practices
            </strong>
            <ul
              style={{
                margin: 0,
                paddingLeft: '20px',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6',
              }}
            >
              <li>
                Use{' '}
                <code
                  style={{
                    background: 'var(--color-surface-tertiary)',
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
                Use semantic colors like{' '}
                <code
                  style={{
                    background: 'var(--color-surface-tertiary)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                >
                  badgeColor="success"
                </code>{' '}
                for contextual meaning
              </li>
              <li>
                Use{' '}
                <code
                  style={{
                    background: 'var(--color-surface-tertiary)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                >
                  badgePill
                </code>{' '}
                for numeric counts
              </li>
              <li>Keep badge text short: "New", "Sale", "Featured"</li>
              <li>Badge auto-sizes to "md" for text longer than 4 characters</li>
            </ul>
          </div>

          <div
            style={{
              background: 'var(--color-surface-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <strong
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'var(--color-text)',
              }}
            >
              ✅ Content Guidelines
            </strong>
            <ul
              style={{
                margin: 0,
                paddingLeft: '20px',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
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
              background: 'var(--color-surface-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <strong
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'var(--color-text)',
              }}
            >
              ✅ Image Guidelines
            </strong>
            <ul
              style={{
                margin: 0,
                paddingLeft: '20px',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
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
              background: 'var(--color-surface-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <strong
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'var(--color-text)',
              }}
            >
              ✅ Interaction Patterns
            </strong>
            <ul
              style={{
                margin: 0,
                paddingLeft: '20px',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6',
              }}
            >
              <li>
                Use{' '}
                <code
                  style={{
                    background: 'var(--color-surface-tertiary)',
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
