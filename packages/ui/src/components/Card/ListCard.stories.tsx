import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ListCard } from './ListCard';
import { PropsTable } from '../../tokens/PropsTable';
import { codeBlockStyles } from '../storybook/codeBlockStyles';

const meta: Meta<typeof ListCard> = {
  title: 'Composed Components/Cards/List Cards',
  component: ListCard,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// Sample images
const SAMPLE_IMAGES = {
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop',
  pepperoni:
    'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&auto=format&fit=crop',
  margherita:
    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&auto=format&fit=crop',
  veggie: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=200&auto=format&fit=crop',
};

const CARD_WIDTH = 375;

// Sample items for examples
const sampleItems = [
  {
    image: SAMPLE_IMAGES.pepperoni,
    title: 'Pepperoni Pizza',
    subtitle: 'Classic favorite',
    description: 'Cupped pepperoni with mozzarella, finished with oregano and olive oil.',
    actionLabel: 'Add Pepperoni Pizza to cart',
  },
  {
    image: SAMPLE_IMAGES.margherita,
    title: 'Margherita Pizza',
    subtitle: 'Traditional Italian',
    description: 'Fresh mozzarella, tomatoes, basil, and extra virgin olive oil.',
    actionLabel: 'Add Margherita Pizza to cart',
  },
  {
    image: SAMPLE_IMAGES.veggie,
    title: 'Veggie Supreme',
    subtitle: 'Garden fresh',
    description: 'Bell peppers, onions, mushrooms, olives, and fresh vegetables.',
    actionLabel: 'Add Veggie Supreme to cart',
  },
];

// Main unified ListCard showcase component
const ListCardsComponent: React.FC = () => {
  const [retryCount, setRetryCount] = React.useState(0);

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '32px' }}>ListCard System</h1>

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
          Cards displaying lists of items with optional header, top image, and action buttons.
          Perfect for menus, playlists, order summaries, and content collections. Features loading,
          error, and empty states with native lazy loading for optimal performance.
        </p>
      </section>

      {/* Basic Layouts */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Basic Layouts</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Common list card configurations with various features
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(345px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <ListCard
            topImage={SAMPLE_IMAGES.pizza}
            headerTitle="Featured Pizzas"
            headerActionLabel="Edit featured pizzas"
            onHeaderAction={() => console.log('Edit')}
            items={sampleItems}
            buttonText="View All"
            onButtonClick={() => console.log('View all')}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <ListCard
            headerTitle="Order Summary"
            headerActionLabel="Edit order"
            onHeaderAction={() => console.log('Edit')}
            items={sampleItems.slice(0, 2)}
            buttonText="Place Order"
            onButtonClick={() => console.log('Place order')}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <ListCard
            headerTitle="Quick Add"
            items={sampleItems.slice(0, 2).map((item) => ({
              ...item,
              onItemAction: () => console.log(`Add ${item.title}`),
            }))}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
      </section>

      {/* States System */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>States System</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Loading, error, and empty states for complete UX coverage
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(345px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {/* Loading State */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text)',
              }}
            >
              Loading State
            </h3>
            <ListCard
              headerTitle="Loading Menu"
              loading={true}
              loadingItemCount={3}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <p
              style={{
                marginTop: '8px',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Skeleton UI with customizable item count
            </p>
          </div>

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
            <ListCard
              headerTitle="Menu Items"
              error={true}
              errorTitle="Failed to load"
              errorMessage="Unable to fetch menu items. Please try again."
              onErrorRetry={() => {
                setRetryCount((c) => c + 1);
                console.log('Retry clicked', retryCount);
              }}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <p
              style={{
                marginTop: '8px',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Error with retry functionality
            </p>
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
            <ListCard
              headerTitle="Your Cart"
              headerActionLabel="Clear cart"
              onHeaderAction={() => console.log('Clear')}
              items={[]}
              emptyTitle="Cart is empty"
              emptyMessage="Add items to your cart to get started"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
            <p
              style={{
                marginTop: '8px',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Custom empty state messaging
            </p>
          </div>
        </div>
      </section>

      {/* Item Variations */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Item Variations</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Different item configurations and content layouts
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(345px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {/* With images and actions */}
          <ListCard
            headerTitle="Add to Order"
            items={sampleItems.map((item) => ({
              ...item,
              onItemAction: () => console.log(`Add ${item.title}`),
            }))}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />

          {/* Without images */}
          <ListCard
            headerTitle="Simple List"
            items={[
              { title: 'Margherita Pizza', subtitle: '$12.99' },
              { title: 'Pepperoni Pizza', subtitle: '$14.99' },
              { title: 'Veggie Supreme', subtitle: '$13.99' },
            ]}
            buttonText="Checkout"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />

          {/* Minimal items */}
          <ListCard
            headerTitle="Order #1234"
            items={[
              {
                image: SAMPLE_IMAGES.pepperoni,
                title: 'Pepperoni Pizza',
                subtitle: 'Large (14")',
              },
            ]}
            buttonText="Track Order"
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
      </section>

      {/* Performance Features */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Performance Features</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Native lazy loading and image callbacks for optimal performance
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(345px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <ListCard
            topImage={SAMPLE_IMAGES.pizza}
            topImageLoading="lazy"
            onTopImageLoad={() => console.log('Top image loaded')}
            headerTitle="Lazy Loaded Images"
            items={sampleItems.map((item) => ({
              ...item,
              image:
                typeof item.image === 'string'
                  ? { src: item.image, alt: item.title, lazy: true }
                  : item.image,
              onImageLoad: () => console.log(`${item.title} image loaded`),
            }))}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
        <p
          style={{
            marginTop: '16px',
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            fontStyle: 'italic',
          }}
        >
          All images use native browser lazy loading by default. Check console for load events.
        </p>
      </section>

      {/* Accessibility */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Accessibility</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            WCAG 2.1 AA compliant with required action labels and ARIA attributes
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(345px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <ListCard
            headerTitle="Accessible List"
            headerActionLabel="Edit menu items"
            onHeaderAction={() => console.log('Edit')}
            items={sampleItems.map((item) => ({
              ...item,
              actionLabel: `Add ${item.title} to cart`,
              onItemAction: () => console.log(`Add ${item.title}`),
            }))}
            buttonText="View Full Menu"
            onButtonClick={() => console.log('View menu')}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
        <p
          style={{
            marginTop: '16px',
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            fontStyle: 'italic',
          }}
        >
          All action buttons have descriptive aria-labels. Development mode validates required
          labels.
        </p>
      </section>

      {/* Usage */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Usage</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Code examples for common ListCard patterns
          </p>
        </header>

        <details style={{ marginBottom: '16px', cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, marginBottom: '12px' }}>Basic ListCard</summary>
          <pre style={codeBlockStyles.primary}>{`import { ListCard } from '@ainativekit/ui';

function Component() {
  return (
    <ListCard
      headerTitle="Menu Items"
      items={[
        { title: 'Pizza', subtitle: '$12.99' },
        { title: 'Pasta', subtitle: '$10.99' },
      ]}
      buttonText="Order Now"
      onButtonClick={() => console.log('Order')}
    />
  );
}`}</pre>
        </details>

        <details style={{ marginBottom: '16px', cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, marginBottom: '12px' }}>
            With Images and Actions
          </summary>
          <pre style={codeBlockStyles.primary}>{`<ListCard
  topImage="/hero-image.jpg"
  headerTitle="Featured Items"
  headerActionLabel="Edit items"
  onHeaderAction={() => console.log('Edit')}
  items={[
    {
      image: '/item1.jpg',
      title: 'Item Name',
      subtitle: 'Description',
      actionLabel: 'Add Item Name to cart',
      onItemAction: () => addToCart(),
    },
  ]}
/>`}</pre>
        </details>

        <details style={{ marginBottom: '16px', cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, marginBottom: '12px' }}>
            Loading & Error States
          </summary>
          <pre style={codeBlockStyles.primary}>{`// Loading state
<ListCard 
  loading 
  loadingItemCount={3}
  {...props} 
/>

// Error state with retry
<ListCard
  error
  errorTitle="Failed to load"
  errorMessage="Unable to fetch items"
  onErrorRetry={() => retry()}
  {...props}
/>

// Empty state
<ListCard
  items={[]}
  emptyTitle="No items"
  emptyMessage="Add items to get started"
  {...props}
/>`}</pre>
        </details>

        <details style={{ marginBottom: '16px', cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, marginBottom: '12px' }}>With Accessibility</summary>
          <pre style={codeBlockStyles.primary}>{`// All action buttons need descriptive labels
<ListCard
  headerTitle="Cart"
  headerActionLabel="Edit cart items"
  onHeaderAction={() => edit()}
  items={[
    {
      title: 'Pizza',
      actionLabel: 'Add pizza to order',
      onItemAction: () => add(),
    },
  ]}
/>`}</pre>
        </details>

        <details style={{ cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, marginBottom: '12px' }}>
            Performance Optimization
          </summary>
          <pre style={codeBlockStyles.primary}>{`// Native lazy loading (enabled by default)
<ListCard
  topImage="/large-image.jpg"
  topImageLazy={true}
  onTopImageLoad={() => console.log('Loaded')}
  items={items.map(item => ({
    ...item,
    image: { src: item.img, alt: item.name, lazy: true },
    onImageLoad: () => trackLoad(item.id),
  }))}
/>`}</pre>
        </details>

        <div
          style={{
            marginTop: '32px',
            display: 'grid',
            gap: '16px',
            fontSize: '14px',
            lineHeight: '1.6',
          }}
        >
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--color-surface-secondary)',
              borderRadius: '8px',
            }}
          >
            <strong style={{ color: 'var(--green-500)' }}>✓ Best Practices:</strong>
            <ul
              style={{
                margin: '8px 0 0 0',
                paddingLeft: '20px',
                color: 'var(--color-text-secondary)',
              }}
            >
              <li>
                Provide descriptive actionLabel for all action buttons (required for accessibility)
              </li>
              <li>Use loading state while fetching data to improve perceived performance</li>
              <li>Show error state with retry functionality for better UX</li>
              <li>Provide empty state guidance to help users understand next steps</li>
              <li>Keep item lists focused (3-5 items ideal for readability)</li>
              <li>Use top image for visual context and brand consistency</li>
              <li>Leverage native lazy loading (enabled by default for performance)</li>
            </ul>
          </div>

          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--color-surface-secondary)',
              borderRadius: '8px',
            }}
          >
            <strong style={{ color: 'var(--red-500)' }}>✗ Avoid:</strong>
            <ul
              style={{
                margin: '8px 0 0 0',
                paddingLeft: '20px',
                color: 'var(--color-text-secondary)',
              }}
            >
              <li>Showing empty component without loading/error states</li>
              <li>Using vague action labels like "Action" or "Click here"</li>
              <li>Displaying very long lists without pagination or virtual scrolling</li>
              <li>Forgetting accessibility labels on action buttons (fails WCAG 2.1 AA)</li>
              <li>Mixing different content types in the same list</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Props */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Props</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Complete prop reference for ListCard
          </p>
        </header>

        <PropsTable
          hideThemeColumn
          rows={[
            // Content Props
            {
              name: 'topImage: string | ListCardImage',
              description:
                'Top image displayed at 210px height. Can be URL string or image object with lazy loading control.',
            },
            {
              name: 'headerTitle: string',
              description: 'Header title using body-emph typography.',
            },
            {
              name: 'items: ListCardItem[]',
              description: 'Array of list items to display. Default: []',
            },
            {
              name: 'buttonText: string',
              description: 'Button text for bottom action button.',
            },

            // Actions
            {
              name: 'onHeaderAction: (event) => void',
              description: 'Callback when header action button is clicked.',
            },
            {
              name: 'onButtonClick: (event) => void',
              description: 'Callback when bottom action button is clicked.',
            },
            {
              name: 'buttonDisabled: boolean',
              description: 'Whether the action button is disabled. Default: false',
            },

            // State Props (Phase 1)
            {
              name: 'loading: boolean',
              description: 'Show skeleton loading UI. Default: false',
            },
            {
              name: 'loadingItemCount: number',
              description: 'Number of skeleton items to show during loading. Default: 3',
            },
            {
              name: 'error: boolean',
              description: 'Show error message. Default: false',
            },
            {
              name: 'errorTitle: string',
              description: 'Custom error title. Default: "Failed to load"',
            },
            {
              name: 'errorMessage: string',
              description: 'Custom error description.',
            },
            {
              name: 'onErrorRetry: () => void',
              description: 'Error retry handler - shows retry button when provided.',
            },
            {
              name: 'emptyTitle: string',
              description: 'Empty state title when items array is empty. Default: "No items"',
            },
            {
              name: 'emptyMessage: string',
              description: 'Empty state description.',
            },
            {
              name: 'emptyIcon: IconName',
              description: 'Empty state icon.',
            },

            // Performance Props (Phase 2)
            {
              name: 'topImageLazy: boolean',
              description: 'Enable native lazy loading for top image. Default: true',
            },
            {
              name: 'itemImagesLazy: boolean',
              description: 'Enable native lazy loading for item images. Default: true',
            },
            {
              name: 'onTopImageLoad: (event) => void',
              description: 'Callback when top image loads successfully.',
            },
            {
              name: 'onTopImageError: (event) => void',
              description: 'Callback when top image fails to load.',
            },

            // Accessibility Props (Phase 2)
            {
              name: 'headerActionLabel: string',
              description:
                'REQUIRED accessibility label for header action button (when onHeaderAction provided).',
            },

            // Inherited from Card
            {
              name: 'elevationLevel: 0 | 1 | 2 | 3 | 4 | 5',
              description: 'Card elevation level (inherited from Card). Default: 1',
            },
            {
              name: 'interactive: boolean',
              description: 'Enable interactive hover state (inherited from Card). Default: false',
            },
          ]}
        />

        <div style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
            ListCardItem Interface
          </h3>
          <PropsTable
            hideThemeColumn
            rows={[
              {
                name: 'image: string | ListCardImage',
                description: 'Small circular image (44x44). Can be URL or image object.',
              },
              {
                name: 'title: string',
                description: 'Item title (required).',
              },
              {
                name: 'subtitle: string',
                description: 'Item subtitle with secondary color.',
              },
              {
                name: 'description: string',
                description: 'Item description using body-small.',
              },
              {
                name: 'onItemAction: (event) => void',
                description: 'Callback when item action button is clicked.',
              },
              {
                name: 'actionLabel: string',
                description:
                  'REQUIRED accessibility label for item action (when onItemAction provided).',
              },
              {
                name: 'onImageLoad: (event) => void',
                description: 'Callback when item image loads successfully.',
              },
              {
                name: 'onImageError: (event) => void',
                description: 'Callback when item image fails to load.',
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
};

export const ListCards: StoryObj = {
  render: () => <ListCardsComponent />,
  parameters: {
    docs: {
      source: {
        code: `// See component implementation above for full examples`,
      },
    },
  },
};
