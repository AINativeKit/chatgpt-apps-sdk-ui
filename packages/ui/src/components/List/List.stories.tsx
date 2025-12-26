import type { Meta } from '@storybook/react';
import { List, ListItem, type ListProps } from './List';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { StarFilled, MapPin, PlusCircleAdd } from '@openai/apps-sdk-ui/components/Icon';

const meta: Meta<ListProps<unknown>> = {
  title: 'Composed Components/Lists',
  component: List,
  subcomponents: { ListItem },
  tags: ['!dev'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    header: {
      description: 'Header content above the list',
      control: false,
      table: { type: { summary: 'ReactNode' } },
    },
    items: {
      description: 'Array of data items to render',
      control: false,
      table: { type: { summary: 'T[]' } },
    },
    renderItem: {
      description: 'Function to render each item',
      control: false,
      table: { type: { summary: '(item: T, index: number) => ReactNode' } },
    },
    onErrorRetry: {
      description: 'Callback when retry button is clicked',
      control: false,
      table: { type: { summary: '() => void' } },
    },
    emptyState: {
      description: 'Custom empty state component',
      control: false,
      table: { type: { summary: 'ReactNode' } },
    },
    emptyMessage: {
      description: 'Empty state message text',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'No items found.' } },
    },
    showDividers: {
      description: 'Show dividers between items',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    loading: {
      description: 'Shows skeleton items while loading',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    loadingItems: {
      description: 'Number of skeleton items when loading',
      table: { type: { summary: 'number' }, defaultValue: { summary: '3' } },
    },
    error: {
      description: 'Shows error message when true',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    errorTitle: {
      description: 'Custom error title',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Failed to load items' } },
    },
    emptyTitle: {
      description: 'Empty state title',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'No items' } },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const pizzaPlaces = [
  {
    id: '1',
    name: "Tony's Pizza Napoletana",
    city: 'North Beach',
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop',
  },
  {
    id: '2',
    name: 'Golden Boy Pizza',
    city: 'North Beach',
    rating: 4.6,
    thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop',
  },
  {
    id: '3',
    name: 'Pizzeria Delfina',
    city: 'Mission',
    rating: 4.5,
    thumbnail: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=200&h=200&fit=crop',
  },
  {
    id: '4',
    name: 'Little Star Pizza',
    city: 'Alamo Square',
    rating: 4.5,
    thumbnail: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=200&h=200&fit=crop',
  },
];

const contacts = [
  { id: '1', name: 'Alice Chen', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '2', name: 'Bob Martinez', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: '3', name: 'Carol Williams', email: 'carol@example.com', avatar: 'https://i.pravatar.cc/150?img=9' },
];

// Base example
export const Base = () => {
  return (
    <List
      items={contacts}
      renderItem={(contact) => (
        <ListItem
          key={contact.id}
          title={contact.name}
          subtitle={contact.email}
          media={contact.avatar}
          mediaAlt={contact.name}
        />
      )}
    />
  );
};

Base.parameters = {
  docs: {
    description: {
      story: 'Basic list with title, subtitle, and media.',
    },
    source: {
      code: `<List
  items={contacts}
  renderItem={(contact) => (
    <ListItem
      key={contact.id}
      title={contact.name}
      subtitle={contact.email}
      media={contact.avatar}
    />
  )}
/>`,
    },
  },
};

// With header
export const WithHeader = () => {
  return (
    <List
      header={{
        title: 'Team Members',
        subtitle: '3 active members',
        action: <Button color="primary" variant="solid">Invite</Button>,
      }}
      items={contacts}
      renderItem={(contact) => (
        <ListItem
          key={contact.id}
          title={contact.name}
          subtitle={contact.email}
          media={contact.avatar}
          mediaAlt={contact.name}
        />
      )}
    />
  );
};

WithHeader.parameters = {
  docs: {
    description: {
      story: 'List with header containing title, subtitle, and action button.',
    },
    source: {
      code: `<List
  header={{
    title: 'Team Members',
    subtitle: '3 active members',
    action: <Button color="primary">Invite</Button>,
  }}
  items={contacts}
  renderItem={(contact) => (
    <ListItem key={contact.id} title={contact.name} subtitle={contact.email} media={contact.avatar} />
  )}
/>`,
    },
  },
};

// Ranked list with features
export const RankedWithFeatures = () => {
  return (
    <List
      header={{
        title: 'Best Pizza Places',
        subtitle: 'Top rated in SF',
        thumbnail: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=80&h=80&fit=crop',
      }}
      items={pizzaPlaces}
      renderItem={(place, index) => (
        <ListItem
          key={place.id}
          rank={index + 1}
          title={place.name}
          media={place.thumbnail}
          mediaAlt={place.name}
          features={[
            { icon: <StarFilled />, label: `${place.rating}` },
            { icon: <MapPin />, label: place.city },
          ]}
          action={
            <Button uniform color="secondary" variant="ghost" aria-label={`Add ${place.name}`}>
              <PlusCircleAdd />
            </Button>
          }
        />
      )}
    />
  );
};

RankedWithFeatures.parameters = {
  docs: {
    description: {
      story: 'Ranked list with feature badges showing rating and location.',
    },
    source: {
      code: `<List
  header={{ title: 'Best Pizza Places', subtitle: 'Top rated', thumbnail: pizzaIcon }}
  items={places}
  renderItem={(place, index) => (
    <ListItem
      key={place.id}
      rank={index + 1}
      title={place.name}
      media={place.thumbnail}
      features={[
        { icon: <StarFilled />, label: place.rating },
        { icon: <MapPin />, label: place.city },
      ]}
      action={<Button uniform color="secondary" variant="ghost"><PlusCircleAdd /></Button>}
    />
  )}
/>`,
    },
  },
};

// Interactive items
export const Interactive = () => {
  return (
    <List
      items={contacts}
      renderItem={(contact) => (
        <ListItem
          key={contact.id}
          title={contact.name}
          subtitle={contact.email}
          media={contact.avatar}
          mediaAlt={contact.name}
          onClick={() => console.log('Selected:', contact.name)}
        />
      )}
    />
  );
};

Interactive.parameters = {
  docs: {
    description: {
      story: 'Items with `onClick` get hover/focus states and keyboard support.',
    },
    source: {
      code: `<List
  items={contacts}
  renderItem={(contact) => (
    <ListItem
      key={contact.id}
      title={contact.name}
      onClick={() => handleSelect(contact)}
    />
  )}
/>`,
    },
  },
};

// Loading state
export const Loading = () => {
  return (
    <List
      loading
      items={pizzaPlaces.slice(0, 3)}
      renderItem={(place) => (
        <ListItem
          key={place.id}
          loading
          title={place.name}
          subtitle={place.city}
          media={place.thumbnail}
        />
      )}
    />
  );
};

Loading.parameters = {
  docs: {
    description: {
      story: 'Pass `loading` to both List and ListItem for seamless skeleton loading. Use `loadingItems` for fallback skeletons.',
    },
    source: {
      code: `<List loading items={places} renderItem={(place) => (
  <ListItem key={place.id} loading title={place.name} media={place.thumbnail} />
)} />`,
    },
  },
};

// Error state
export const Error = () => {
  return (
    <List
      error
      errorTitle="Failed to load"
      errorMessage="Could not connect to the server. Please try again."
      onErrorRetry={() => alert('Retry clicked')}
      items={[]}
      renderItem={() => null}
    />
  );
};

Error.parameters = {
  docs: {
    description: {
      story: 'Display an error state with optional retry button.',
    },
    source: {
      code: `<List
  error
  errorTitle="Failed to load"
  errorMessage="Could not connect."
  onErrorRetry={() => refetch()}
  items={[]}
  renderItem={() => null}
/>`,
    },
  },
};

// Empty state
export const Empty = () => {
  return (
    <List
      emptyTitle="No contacts"
      emptyMessage="You haven't added any contacts yet."
      items={[]}
      renderItem={() => null}
    />
  );
};

Empty.parameters = {
  docs: {
    description: {
      story: 'Show an empty state when no items exist. Use `emptyState` prop for custom content.',
    },
    source: {
      code: `<List
  emptyTitle="No contacts"
  emptyMessage="Add contacts to get started."
  items={[]}
  renderItem={() => null}
/>`,
    },
  },
};

// Without dividers
export const NoDividers = () => {
  return (
    <List
      showDividers={false}
      items={contacts}
      renderItem={(contact) => (
        <ListItem
          key={contact.id}
          title={contact.name}
          subtitle={contact.email}
          media={contact.avatar}
          mediaAlt={contact.name}
        />
      )}
    />
  );
};

NoDividers.parameters = {
  docs: {
    description: {
      story: 'Hide dividers between items with `showDividers={false}`.',
    },
    source: {
      code: `<List showDividers={false} items={contacts} renderItem={...} />`,
    },
  },
};
