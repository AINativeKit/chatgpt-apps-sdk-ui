import type { Meta } from '@storybook/react';
import { ListCard, type ListCardProps, type ListCardItem } from './ListCard';

const meta: Meta<ListCardProps> = {
  title: 'Composed Components/Cards/ListCard',
  component: ListCard,
  tags: ['!dev'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    topImage: { description: 'Image URL displayed at top of card', control: false },
    items: { description: 'Array of list items to display', control: false },
    onHeaderAction: { description: 'Callback when header action is clicked', control: false },
    onButtonClick: { description: 'Callback when action button is clicked', control: false },
    onErrorRetry: { description: 'Callback when retry button is clicked', control: false },
    onTopImageLoad: { description: 'Callback when top image loads', control: false },
    onTopImageError: { description: 'Callback when top image fails to load', control: false },
    emptyIcon: { description: 'Custom icon for empty state', control: false },
    loading: {
      description: 'Shows skeleton placeholder',
      table: { defaultValue: { summary: 'false' } },
    },
    loadingItemCount: {
      description: 'Number of skeleton items when loading',
      table: { defaultValue: { summary: '3' } },
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
      table: { defaultValue: { summary: 'No items' } },
    },
    buttonDisabled: {
      description: 'Disable the action button',
      table: { defaultValue: { summary: 'false' } },
    },
    topImageLoading: {
      description: 'Top image loading strategy',
      table: { defaultValue: { summary: 'lazy' } },
    },
    itemImagesLoading: {
      description: 'Item images loading strategy',
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
  pepperoni:
    'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&auto=format&fit=crop',
  margherita:
    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&auto=format&fit=crop',
  veggie: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=200&auto=format&fit=crop',
};

const CARD_WIDTH = 375;

// Sample items
const sampleItems: ListCardItem[] = [
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

// Base story
export const Base = (args: ListCardProps) => <ListCard {...args} />;

Base.args = {
  headerTitle: 'Menu Items',
  items: sampleItems,
  buttonText: 'View All',
  onButtonClick: () => console.log('View all'),
  style: { maxWidth: `${CARD_WIDTH}px` },
};

Base.parameters = {
  docs: {
    source: {
      code: `<ListCard
  headerTitle="Menu Items"
  items={[
    { title: 'Pepperoni Pizza', subtitle: 'Classic favorite' },
    { title: 'Margherita Pizza', subtitle: 'Traditional Italian' },
  ]}
  buttonText="View All"
  onButtonClick={() => console.log('View all')}
/>`,
    },
  },
};

// With top image
export const WithTopImage = (args: ListCardProps) => <ListCard {...args} />;

WithTopImage.args = {
  topImage: SAMPLE_IMAGES.pizza,
  headerTitle: 'Featured Pizzas',
  headerActionLabel: 'Edit featured pizzas',
  onHeaderAction: () => console.log('Edit'),
  items: sampleItems,
  buttonText: 'View All',
  onButtonClick: () => console.log('View all'),
  style: { maxWidth: `${CARD_WIDTH}px` },
};

WithTopImage.parameters = {
  docs: {
    source: {
      code: `<ListCard
  topImage="/hero-image.jpg"
  headerTitle="Featured Pizzas"
  headerActionLabel="Edit featured pizzas"
  onHeaderAction={() => console.log('Edit')}
  items={items}
  buttonText="View All"
  onButtonClick={() => console.log('View all')}
/>`,
    },
  },
};

// Header variations
export const HeaderVariations = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(345px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <ListCard
      headerTitle="With Action Button"
      headerActionLabel="Edit items"
      onHeaderAction={() => console.log('Edit')}
      items={sampleItems.slice(0, 2)}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ListCard
      headerTitle="Title Only"
      items={sampleItems.slice(0, 2)}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ListCard items={sampleItems.slice(0, 2)} style={{ maxWidth: `${CARD_WIDTH}px` }} />
  </div>
);

HeaderVariations.parameters = {
  docs: {
    source: {
      code: `// With action button
<ListCard
  headerTitle="With Action Button"
  headerActionLabel="Edit items"
  onHeaderAction={() => console.log('Edit')}
  items={items}
/>

// Title only
<ListCard headerTitle="Title Only" items={items} />

// No header
<ListCard items={items} />`,
    },
  },
};

// Item variations
export const ItemVariations = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(345px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <ListCard
      headerTitle="With Images & Actions"
      items={sampleItems.map((item) => ({
        ...item,
        onItemAction: () => console.log(`Add ${item.title}`),
      }))}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ListCard
      headerTitle="Simple List"
      items={[
        { title: 'Margherita Pizza', subtitle: '$12.99' },
        { title: 'Pepperoni Pizza', subtitle: '$14.99' },
        { title: 'Veggie Supreme', subtitle: '$13.99' },
      ]}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ListCard
      headerTitle="With Descriptions"
      items={sampleItems.slice(0, 2)}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
  </div>
);

ItemVariations.parameters = {
  docs: {
    source: {
      code: `// With images and actions
<ListCard
  headerTitle="With Images & Actions"
  items={[
    {
      image: '/pizza.jpg',
      title: 'Pepperoni Pizza',
      subtitle: '$14.99',
      actionLabel: 'Add to cart',
      onItemAction: () => addToCart(),
    },
  ]}
/>

// Simple list
<ListCard
  headerTitle="Simple List"
  items={[
    { title: 'Margherita Pizza', subtitle: '$12.99' },
    { title: 'Pepperoni Pizza', subtitle: '$14.99' },
  ]}
/>`,
    },
  },
};

// With action button
export const WithActionButton = (args: ListCardProps) => <ListCard {...args} />;

WithActionButton.args = {
  headerTitle: 'Your Cart',
  items: sampleItems.slice(0, 2),
  buttonText: 'Place Order',
  onButtonClick: () => console.log('Place order'),
  style: { maxWidth: `${CARD_WIDTH}px` },
};

WithActionButton.parameters = {
  docs: {
    source: {
      code: `<ListCard
  headerTitle="Your Cart"
  items={cartItems}
  buttonText="Place Order"
  onButtonClick={() => placeOrder()}
/>`,
    },
  },
};

// Loading state
export const Loading = (args: ListCardProps) => <ListCard {...args} />;

Loading.args = {
  headerTitle: 'Loading Menu',
  loading: true,
  loadingItemCount: 3,
  style: { maxWidth: `${CARD_WIDTH}px` },
};

Loading.parameters = {
  docs: {
    source: {
      code: `<ListCard
  headerTitle="Loading Menu"
  loading
  loadingItemCount={3}
/>`,
    },
  },
};

// Error state
export const Error = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(345px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <ListCard
      headerTitle="Default Error"
      error
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ListCard
      headerTitle="With Retry"
      error
      errorTitle="Failed to load"
      errorMessage="Unable to fetch menu items. Please try again."
      onErrorRetry={() => console.log('Retry clicked')}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
  </div>
);

Error.parameters = {
  docs: {
    source: {
      code: `// Default error
<ListCard headerTitle="Menu" error />

// Custom error with retry
<ListCard
  headerTitle="Menu"
  error
  errorTitle="Failed to load"
  errorMessage="Unable to fetch menu items. Please try again."
  onErrorRetry={() => handleRetry()}
/>`,
    },
  },
};

// Empty state
export const Empty = (args: ListCardProps) => <ListCard {...args} />;

Empty.args = {
  headerTitle: 'Your Cart',
  headerActionLabel: 'Clear cart',
  onHeaderAction: () => console.log('Clear'),
  items: [],
  emptyTitle: 'Cart is empty',
  emptyMessage: 'Add items to your cart to get started',
  style: { maxWidth: `${CARD_WIDTH}px` },
};

Empty.parameters = {
  docs: {
    source: {
      code: `<ListCard
  headerTitle="Your Cart"
  items={[]}
  emptyTitle="Cart is empty"
  emptyMessage="Add items to your cart to get started"
/>`,
    },
  },
};

// All states showcase
export const States = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(345px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Loading
      </div>
      <ListCard
        headerTitle="Loading Menu"
        loading
        loadingItemCount={3}
        style={{ maxWidth: `${CARD_WIDTH}px` }}
      />
    </div>
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Error
      </div>
      <ListCard
        headerTitle="Menu Items"
        error
        errorMessage="Failed to load menu items"
        onErrorRetry={() => console.log('Retry')}
        style={{ maxWidth: `${CARD_WIDTH}px` }}
      />
    </div>
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Empty
      </div>
      <ListCard
        headerTitle="Your Cart"
        items={[]}
        emptyTitle="Cart is empty"
        emptyMessage="Add items to get started"
        style={{ maxWidth: `${CARD_WIDTH}px` }}
      />
    </div>
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Normal
      </div>
      <ListCard
        headerTitle="Menu Items"
        items={sampleItems.slice(0, 2)}
        buttonText="View All"
        style={{ maxWidth: `${CARD_WIDTH}px` }}
      />
    </div>
  </div>
);

States.parameters = {
  docs: {
    source: {
      code: `// Loading state
<ListCard loading loadingItemCount={3} />

// Error state
<ListCard error errorMessage="Failed to load" onErrorRetry={() => retry()} />

// Empty state
<ListCard items={[]} emptyTitle="Cart is empty" />

// Normal state
<ListCard items={items} buttonText="View All" />`,
    },
  },
};

// Real-world example
export const RealWorld = () => (
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
      items={sampleItems.map((item) => ({
        ...item,
        onItemAction: () => console.log(`Add ${item.title}`),
      }))}
      buttonText="View Full Menu"
      onButtonClick={() => console.log('View menu')}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
    <ListCard
      headerTitle="Order Summary"
      items={sampleItems.slice(0, 2)}
      buttonText="Place Order"
      onButtonClick={() => console.log('Place order')}
      style={{ maxWidth: `${CARD_WIDTH}px` }}
    />
  </div>
);

RealWorld.parameters = {
  docs: {
    source: {
      code: `<ListCard
  topImage="/hero.jpg"
  headerTitle="Featured Pizzas"
  headerActionLabel="Edit featured pizzas"
  onHeaderAction={() => console.log('Edit')}
  items={items.map(item => ({
    ...item,
    onItemAction: () => addToCart(item),
  }))}
  buttonText="View Full Menu"
  onButtonClick={() => navigate('/menu')}
/>`,
    },
  },
};
