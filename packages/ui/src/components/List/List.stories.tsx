import React from 'react';
import type { Meta } from '@storybook/react';
import { List, ListItem } from './List';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { PropsTable } from '../../tokens/PropsTable';

const meta: Meta<typeof List> = {
  title: 'Composed Components/Lists',
  component: List,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface PizzaPlace {
  id: string;
  name: string;
  city: string;
  rating: number;
  thumbnail: string;
}

const sampleTasks: Task[] = [
  { id: '1', title: 'Review pull request #247', completed: false },
  { id: '2', title: 'Update dependencies', completed: true },
  { id: '3', title: 'Write documentation', completed: false },
  { id: '4', title: 'Fix responsive layout issue', completed: false },
];

const sampleContacts: Contact[] = [
  {
    id: '1',
    name: 'Alice Chen',
    email: 'alice@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '2',
    name: 'Bob Martinez',
    email: 'bob@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
];

const pizzaPlaces: PizzaPlace[] = [
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
    name: 'Pizzeria Delfina (Mission)',
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
  {
    id: '5',
    name: 'Il Casaro Pizzeria',
    city: 'North Beach',
    rating: 4.6,
    thumbnail: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=200&h=200&fit=crop',
  },
  {
    id: '6',
    name: "Capo's",
    city: 'North Beach',
    rating: 4.4,
    thumbnail: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop',
  },
  {
    id: '7',
    name: 'Ragazza',
    city: 'Lower Haight',
    rating: 4.4,
    thumbnail: 'https://images.unsplash.com/photo-1598023696416-0193a0bcd302?w=200&h=200&fit=crop',
  },
];

// Main unified Lists showcase component
const ListsComponent: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => setIsLoading(false), 3000);
  };

  const handleErrorDemo = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleRetry = () => {
    setHasError(false);
    handleLoadingDemo();
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '32px' }}>Lists System</h1>

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
          Flexible list component for displaying data collections with rich metadata, features, and
          interactive elements. Perfect for tasks, contacts, ranked items, and more.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
          <div>
            <strong>Key Features:</strong>
          </div>
          <ul style={{ marginLeft: '24px', color: 'var(--color-text-secondary)' }}>
            <li>Customizable header with title, subtitle, thumbnail, and actions</li>
            <li>Rich list items with media, features, metadata, and ranks</li>
            <li>Loading, error, and empty states built-in</li>
            <li>Interactive items with hover/focus states</li>
            <li>Responsive design (mobile/desktop)</li>
            <li>Keyboard accessible (ARIA roles, tab navigation)</li>
          </ul>
        </div>
      </section>

      {/* Complete Example - OpenAI Style */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px', alignItems: 'start' }}>
          <h2 style={{ marginBottom: '8px' }}>Complete Example</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Production-ready ranked list inspired by OpenAI's design patterns
          </p>
        </header>

        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>National Best Pizza List</h3>
          <List
            header={{
              title: 'National Best Pizza List',
              subtitle: 'A ranking of the best pizzerias in the world',
              thumbnail:
                'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=80&h=80&fit=crop',
              action: (
                <Button color="primary" variant="solid">
                  Save List
                </Button>
              ),
            }}
            items={pizzaPlaces}
            renderItem={(place, index) => (
              <ListItem
                key={place.id}
                rank={index + 1}
                title={place.name}
                features={[{ icon: 'star', label: `${place.rating}` }]}
                media={place.thumbnail}
                mediaAlt={place.name}
                metadata={place.city}
                action={
                  <Button
                    uniform
                    color="secondary"
                    aria-label={`Add ${place.name}`}
                    variant="ghost"
                  >
                    +
                  </Button>
                }
                onActionClick={() => console.log('Add', place.name)}
              />
            )}
          />
          <details style={{ marginTop: '16px', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 600, marginBottom: '12px' }}>Show code</summary>
            <div
              style={{
                backgroundColor: 'var(--color-surface-tertiary)',
                padding: '16px',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '13px',
                marginTop: '12px',
              }}
            >
              <code style={{ whiteSpace: 'pre' }}>{`<List
  header={{
    title: 'National Best Pizza List',
    subtitle: 'A ranking of the best pizzerias in the world',
    thumbnail: pizzaIcon,
    action: <Button color="primary" variant="solid">Save List</Button>,
  }}
  items={pizzaPlaces}
  renderItem={(place, index) => (
    <ListItem
      key={place.id}
      rank={index + 1}
      title={place.name}
      features={[{ icon: 'star', label: \`\${place.rating}\` }]}
      media={place.thumbnail}
      mediaAlt={place.name}
      metadata={place.city}
      action={
        <Button
          iconOnly="plus-circle-add"
          aria-label={\`Add \${place.name}\`}
          variant="ghost"
        />
      }
      onActionClick={() => console.log('Add', place.name)}
    />
  )}
/>`}</code>
            </div>
          </details>
        </div>
      </section>

      {/* Basic Lists */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px', alignItems: 'start' }}>
          <h2 style={{ marginBottom: '8px' }}>Basic Lists</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Simple lists for common use cases
          </p>
        </header>

        {/* Simple Task List */}
        <div style={{ marginBottom: '48px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Task List</h3>
          <List
            items={sampleTasks}
            renderItem={(task) => (
              <ListItem
                key={task.id}
                title={task.title}
                action={
                  <Button
                    uniform
                    color="secondary"
                    aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                    variant="ghost"
                  >
                    {task.completed ? '✓' : '○'}
                  </Button>
                }
                onActionClick={() => console.log('Toggle task', task.id)}
              />
            )}
          />
          <details style={{ marginTop: '16px', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 600, marginBottom: '12px' }}>Show code</summary>
            <div
              style={{
                backgroundColor: 'var(--color-surface-tertiary)',
                padding: '16px',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '13px',
                marginTop: '12px',
              }}
            >
              <code style={{ whiteSpace: 'pre' }}>{`<List
  items={tasks}
  renderItem={(task) => (
    <ListItem
      key={task.id}
      title={task.title}
      action={<IconButton icon="circle" />}
      onActionClick={() => console.log(task.id)}
    />
  )}
/>`}</code>
            </div>
          </details>
        </div>

        {/* With Header */}
        <div style={{ marginBottom: '48px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>With Header</h3>
          <List
            header={{
              title: 'Team Members',
              subtitle: '3 active members',
              action: (
                <Button color="primary" variant="solid">
                  Invite
                </Button>
              ),
            }}
            items={sampleContacts}
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
          <details style={{ marginTop: '16px', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 600, marginBottom: '12px' }}>Show code</summary>
            <div
              style={{
                backgroundColor: 'var(--color-surface-tertiary)',
                padding: '16px',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '13px',
                marginTop: '12px',
              }}
            >
              <code style={{ whiteSpace: 'pre' }}>{`<List
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
    />
  )}
/>`}</code>
            </div>
          </details>
        </div>

        {/* Interactive Items */}
        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Interactive Items</h3>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              marginBottom: '16px',
            }}
          >
            Items with onClick handlers get hover/focus states and keyboard support
          </p>
          <List
            items={sampleContacts}
            renderItem={(contact) => (
              <ListItem
                key={contact.id}
                title={contact.name}
                subtitle={contact.email}
                media={contact.avatar}
                onClick={() => console.log('View contact', contact.id)}
              />
            )}
          />
        </div>
      </section>

      {/* Advanced Features */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px', alignItems: 'start' }}>
          <h2 style={{ marginBottom: '8px' }}>Advanced Features</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Rich metadata, rankings, features, and more
          </p>
        </header>

        {/* Ranked List */}
        <div style={{ marginBottom: '48px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Ranked List</h3>
          <List
            header={{
              title: 'Best Pizza Places',
              subtitle: 'Top rated pizzerias worldwide',
              thumbnail:
                'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=80&h=80&fit=crop',
            }}
            items={pizzaPlaces}
            renderItem={(place, index) => (
              <ListItem
                key={place.id}
                rank={index + 1}
                title={place.name}
                subtitle={place.city}
                media={place.thumbnail}
                mediaAlt={place.name}
                metadata={`${place.rating} ⭐`}
              />
            )}
          />
          <details style={{ marginTop: '16px', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 600, marginBottom: '12px' }}>Show code</summary>
            <div
              style={{
                backgroundColor: 'var(--color-surface-tertiary)',
                padding: '16px',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '13px',
                marginTop: '12px',
              }}
            >
              <code style={{ whiteSpace: 'pre' }}>{`<List
  header={{
    title: 'Best Pizza Places',
    subtitle: 'Top rated pizzerias',
    thumbnail: pizzaIcon,
  }}
  items={pizzaPlaces}
  renderItem={(place, index) => (
    <ListItem
      key={place.id}
      rank={index + 1}
      title={place.name}
      subtitle={place.city}
      media={place.thumbnail}
      metadata={\`\${place.rating} ⭐\`}
    />
  )}
/>`}</code>
            </div>
          </details>
        </div>

        {/* With Features */}
        <div style={{ marginBottom: '48px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>With Features</h3>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              marginBottom: '16px',
            }}
          >
            Add feature badges with icons to list items
          </p>
          <List
            items={pizzaPlaces.slice(0, 3)}
            renderItem={(place) => (
              <ListItem
                key={place.id}
                title={place.name}
                subtitle={place.city}
                media={place.thumbnail}
                features={[
                  { icon: 'star', label: `${place.rating}` },
                  { icon: 'map-pin', label: 'Nearby' },
                ]}
                metadata="$$$"
              />
            )}
          />
        </div>

        {/* Without Dividers */}
        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Without Dividers</h3>
          <List
            items={sampleContacts}
            showDividers={false}
            renderItem={(contact) => (
              <ListItem
                key={contact.id}
                title={contact.name}
                subtitle={contact.email}
                media={contact.avatar}
              />
            )}
          />
        </div>
      </section>

      {/* Loading, Error & Empty States */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px', alignItems: 'start' }}>
          <h2 style={{ marginBottom: '8px' }}>Loading, Error & Empty States</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Built-in state management for async data
          </p>
        </header>

        {/* Loading State - Recommended Pattern */}
        <div style={{ marginBottom: '48px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>
            Loading State (Recommended Pattern)
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              marginBottom: '16px',
            }}
          >
            Best UX: Render actual items with loading prop for seamless transition
          </p>
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
                metadata={`${place.rating} ⭐`}
              />
            )}
          />
          <details style={{ marginTop: '16px', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 600, marginBottom: '12px' }}>Show code</summary>
            <div
              style={{
                backgroundColor: 'var(--color-surface-tertiary)',
                padding: '16px',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '13px',
                marginTop: '12px',
              }}
            >
              <code style={{ whiteSpace: 'pre' }}>{`<List
  loading
  items={places}
  renderItem={(place) => (
    <ListItem
      key={place.id}
      loading
      title={place.name}
      subtitle={place.city}
      media={place.thumbnail}
      metadata={\`\${place.rating} ⭐\`}
    />
  )}
/>`}</code>
            </div>
          </details>
        </div>

        {/* Loading State - Fallback */}
        <div style={{ marginBottom: '48px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Loading State (Fallback)</h3>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              marginBottom: '16px',
            }}
          >
            When no items available, shows generic skeleton items
          </p>
          <List loading loadingItems={4} items={[]} renderItem={() => null} />
          <details style={{ marginTop: '16px', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 600, marginBottom: '12px' }}>Show code</summary>
            <div
              style={{
                backgroundColor: 'var(--color-surface-tertiary)',
                padding: '16px',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '13px',
                marginTop: '12px',
              }}
            >
              <code style={{ whiteSpace: 'pre' }}>{`<List
  loading
  loadingItems={4}
  items={[]}
  renderItem={() => null}
/>`}</code>
            </div>
          </details>
        </div>

        {/* Error State */}
        <div style={{ marginBottom: '48px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Error State</h3>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              marginBottom: '16px',
            }}
          >
            Error display with optional retry button
          </p>
          <List
            header={{
              title: 'Team Members',
              subtitle: 'Failed to load',
            }}
            error
            errorTitle="Failed to load team members"
            errorMessage="Could not connect to the server. Please try again."
            onErrorRetry={() => console.log('Retry clicked')}
            items={[]}
            renderItem={() => null}
          />
          <details style={{ marginTop: '16px', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 600, marginBottom: '12px' }}>Show code</summary>
            <div
              style={{
                backgroundColor: 'var(--color-surface-tertiary)',
                padding: '16px',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '13px',
                marginTop: '12px',
              }}
            >
              <code style={{ whiteSpace: 'pre' }}>{`<List
  error
  errorTitle="Failed to load team members"
  errorMessage="Could not connect to server"
  onErrorRetry={() => handleRetry()}
  items={[]}
  renderItem={() => null}
/>`}</code>
            </div>
          </details>
        </div>

        {/* Empty State - Default */}
        <div style={{ marginBottom: '48px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Empty State (Default)</h3>
          <List
            emptyTitle="No contacts"
            emptyMessage="You haven't added any contacts yet. Start by inviting team members."
            items={[]}
            renderItem={() => null}
          />
          <details style={{ marginTop: '16px', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 600, marginBottom: '12px' }}>Show code</summary>
            <div
              style={{
                backgroundColor: 'var(--color-surface-tertiary)',
                padding: '16px',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '13px',
                marginTop: '12px',
              }}
            >
              <code style={{ whiteSpace: 'pre' }}>{`<List
  emptyTitle="No contacts"
  emptyMessage="You haven't added any contacts yet."
  items={[]}
  renderItem={() => null}
/>`}</code>
            </div>
          </details>
        </div>

        {/* Empty State - Custom */}
        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Empty State (Custom)</h3>
          <List
            emptyState={
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                  No tasks yet
                </div>
                <div style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                  Create your first task to get started
                </div>
                <Button color="primary" variant="solid">
                  Create Task
                </Button>
              </div>
            }
            items={[]}
            renderItem={() => null}
          />
          <details style={{ marginTop: '16px', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 600, marginBottom: '12px' }}>Show code</summary>
            <div
              style={{
                backgroundColor: 'var(--color-surface-tertiary)',
                padding: '16px',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '13px',
                marginTop: '12px',
              }}
            >
              <code style={{ whiteSpace: 'pre' }}>{`<List
  emptyState={
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '48px' }}>📋</div>
      <div style={{ fontSize: '18px', fontWeight: 600 }}>
        No tasks yet
      </div>
      <Button color="primary" variant="solid">Create Task</Button>
    </div>
  }
  items={[]}
  renderItem={() => null}
/>`}</code>
            </div>
          </details>
        </div>
      </section>

      {/* Real-World Example */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px', alignItems: 'start' }}>
          <h2 style={{ marginBottom: '8px' }}>Real-World Example</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Async data fetching with state management
          </p>
        </header>

        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
          <Button color="secondary" variant="outline" onClick={handleLoadingDemo}>
            Simulate Loading
          </Button>
          <Button color="secondary" variant="outline" onClick={handleErrorDemo}>
            Simulate Error
          </Button>
        </div>

        <List
          header={{
            title: 'Pizza Places',
            subtitle: isLoading
              ? 'Loading...'
              : hasError
                ? 'Error'
                : `${pizzaPlaces.length} places`,
          }}
          loading={isLoading}
          error={hasError}
          errorTitle="Failed to load pizza places"
          errorMessage="Could not fetch data from the server"
          onErrorRetry={handleRetry}
          loadingItems={4}
          items={isLoading ? pizzaPlaces.slice(0, 3) : hasError ? [] : pizzaPlaces}
          renderItem={(place, index) => (
            <ListItem
              key={place.id}
              loading={isLoading}
              rank={index + 1}
              title={place.name}
              subtitle={place.city}
              media={place.thumbnail}
              metadata={`${place.rating} ⭐`}
              onClick={() => console.log('View', place.id)}
            />
          )}
        />

        <details style={{ marginTop: '16px', cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, marginBottom: '12px' }}>Show code</summary>
          <div
            style={{
              backgroundColor: 'var(--color-surface-tertiary)',
              padding: '16px',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '13px',
              marginTop: '12px',
            }}
          >
            <code
              style={{ whiteSpace: 'pre' }}
            >{`const [isLoading, setIsLoading] = React.useState(false);
const [hasError, setHasError] = React.useState(false);
const [data, setData] = React.useState([]);

React.useEffect(() => {
  setIsLoading(true);
  fetchData()
    .then(setData)
    .catch(() => setHasError(true))
    .finally(() => setIsLoading(false));
}, []);

return (
  <List
    loading={isLoading}
    error={hasError}
    errorTitle="Failed to load"
    onErrorRetry={handleRetry}
    items={isLoading ? placeholders : hasError ? [] : data}
    renderItem={(item) => (
      <ListItem
        key={item.id}
        loading={isLoading}
        title={item.name}
        subtitle={item.description}
      />
    )}
  />
);`}</code>
          </div>
        </details>
      </section>

      {/* Props Documentation */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px', alignItems: 'start' }}>
          <h2 style={{ marginBottom: '8px' }}>Props Documentation</h2>
        </header>

        <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>List Props</h3>
        <PropsTable
          hideThemeColumn
          rows={[
            {
              name: 'items',
              description: 'Array of data items to render. Type: T[] (required)',
            },
            {
              name: 'renderItem',
              description:
                'Render function for list rows. Type: (item: T, index: number) => ReactNode (required)',
            },
            {
              name: 'header',
              description:
                'Optional header configuration with title, subtitle, thumbnail, and action. Type: ListHeaderProps',
            },
            {
              name: 'loading',
              description:
                'Loading state - renders items with loading context or skeleton items. Type: boolean. Default: false',
            },
            {
              name: 'loadingItems',
              description:
                'Number of skeleton items to show when loading and no items provided. Type: number. Default: 3',
            },
            {
              name: 'error',
              description: 'Error state - shows error message. Type: boolean. Default: false',
            },
            {
              name: 'errorTitle',
              description: 'Custom error title. Type: string. Default: "Failed to load items"',
            },
            {
              name: 'errorMessage',
              description: 'Custom error message. Type: string',
            },
            {
              name: 'onErrorRetry',
              description:
                'Error retry handler - shows retry button when provided. Type: () => void',
            },
            {
              name: 'emptyTitle',
              description:
                'Empty state title when no items provided. Type: string. Default: "No items"',
            },
            {
              name: 'emptyMessage',
              description:
                'Message to show when the list is empty. Type: ReactNode. Default: "No items found."',
            },
            {
              name: 'emptyState',
              description: 'Custom empty state content (replaces default). Type: ReactNode',
            },
            {
              name: 'showDividers',
              description:
                'Controls whether divider lines are rendered between rows. Type: boolean. Default: true',
            },
          ]}
        />

        <h3 style={{ fontSize: '16px', marginTop: '32px', marginBottom: '16px' }}>
          ListItem Props
        </h3>
        <PropsTable
          hideThemeColumn
          rows={[
            {
              name: 'title',
              description: 'Primary title for the row. Type: ReactNode (required)',
            },
            {
              name: 'subtitle',
              description: 'Optional supporting text (e.g., city, description). Type: ReactNode',
            },
            {
              name: 'media',
              description:
                'Optional visual shown to the left of the text. Type: string | ReactNode',
            },
            {
              name: 'mediaAlt',
              description:
                'Accessible alternative text for the media when a URL is provided. Type: string',
            },
            {
              name: 'rank',
              description: 'Optional rank or index shown on desktop. Type: ReactNode',
            },
            {
              name: 'metadata',
              description:
                'Optional metadata rendered inline on mobile and in a separate column on desktop. Type: ReactNode',
            },
            {
              name: 'features',
              description:
                'Optional feature list displayed below the subtitle. Type: FeatureItem[] (string | { icon?: IconName; label: string })',
            },
            {
              name: 'action',
              description:
                'Optional trailing action element (icon button, button, etc.). Type: ReactNode',
            },
            {
              name: 'onActionClick',
              description:
                'Handler for trailing action clicks. Type: (event: React.MouseEvent) => void',
            },
            {
              name: 'onClick',
              description:
                'Row click handler - enables hover/focus states. Type: (event: React.MouseEvent) => void',
            },
            {
              name: 'interactive',
              description:
                'Enable hover/focus states even without an onClick handler. Type: boolean. Default: false',
            },
            {
              name: 'loading',
              description: 'Loading state for individual list items. Type: boolean. Default: false',
            },
            {
              name: 'hideMetadataOnMobile',
              description:
                'Hide metadata from the inline mobile row. Type: boolean. Default: false',
            },
          ]}
        />
      </section>

      {/* Best Practices */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px', alignItems: 'start' }}>
          <h2 style={{ marginBottom: '8px' }}>Best Practices</h2>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '14px' }}>
          <div>
            <strong>Loading Patterns:</strong>
            <ul
              style={{
                marginLeft: '24px',
                marginTop: '8px',
                color: 'var(--color-text-secondary)',
              }}
            >
              <li>
                Prefer rendering actual items with <code>loading</code> prop for better UX (seamless
                transition)
              </li>
              <li>Use fallback skeleton items only when you don't have placeholder data</li>
              <li>
                Set <code>loading</code> on both <code>List</code> and <code>ListItem</code>{' '}
                components
              </li>
            </ul>
          </div>

          <div>
            <strong>Error Handling:</strong>
            <ul
              style={{
                marginLeft: '24px',
                marginTop: '8px',
                color: 'var(--color-text-secondary)',
              }}
            >
              <li>
                Always provide <code>onErrorRetry</code> handler for user recovery
              </li>
              <li>Use descriptive error titles and messages</li>
              <li>Preserve the header during error state for context</li>
            </ul>
          </div>

          <div>
            <strong>Empty States:</strong>
            <ul
              style={{
                marginLeft: '24px',
                marginTop: '8px',
                color: 'var(--color-text-secondary)',
              }}
            >
              <li>Provide helpful guidance or actions in empty states</li>
              <li>Use custom empty states for better engagement</li>
              <li>Consider showing a CTA button to help users take action</li>
            </ul>
          </div>

          <div>
            <strong>Accessibility:</strong>
            <ul
              style={{
                marginLeft: '24px',
                marginTop: '8px',
                color: 'var(--color-text-secondary)',
              }}
            >
              <li>
                Always provide <code>mediaAlt</code> for images
              </li>
              <li>Use semantic HTML (role="button" for interactive items)</li>
              <li>Ensure keyboard navigation works (Tab, Enter, Space)</li>
              <li>Test with screen readers</li>
            </ul>
          </div>

          <div>
            <strong>Performance:</strong>
            <ul
              style={{
                marginLeft: '24px',
                marginTop: '8px',
                color: 'var(--color-text-secondary)',
              }}
            >
              <li>
                Always provide unique <code>key</code> prop in renderItem
              </li>
              <li>Avoid inline function definitions in renderItem when possible</li>
              <li>Consider virtualization for very long lists (100+ items)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export const Lists = () => <ListsComponent />;
