import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { List, ListItem } from '../../components/List';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { PropsTable } from '../../tokens/PropsTable';
import { codeBlockStyles } from '../../components/storybook/codeBlockStyles';

// Dummy component for Storybook
const ListExample = () => null;

const meta: Meta<typeof ListExample> = {
  title: 'Gallery/Pizza List',
  component: ListExample,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ListExample>;

interface PizzaPlace {
  id: string;
  name: string;
  city: string;
  rating: number;
  thumbnail: string;
}

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

// Pizza header image
const pizzaHeaderImage =
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop';

// Pizza list component
const PizzaListComponent: React.FC = () => {
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);

  const handleTogglePlace = (id: string) => {
    setSelectedPlaces((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div
      style={{
        maxWidth: '768px',
        margin: '0 auto',
        fontFamily:
          'var(--ai-font-family-base, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
      }}
    >
      {/* Header Section */}
      <section style={{ marginBottom: '48px' }}>
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '12px',
            color: 'var(--color-text)',
          }}
        >
          🍕 National Best Pizza List
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: 'var(--color-text-secondary)',
            margin: 0,
            maxWidth: '600px',
          }}
        >
          A ranking of the best pizzerias in San Francisco. Features interactive selection, ratings
          with icons, and responsive design across all screen sizes.
        </p>
      </section>

      {/* Live Demo */}
      <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>Live Demo</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
          Click any pizzeria to add to your favorites ({selectedPlaces.length} selected)
        </p>

        <div style={{ marginBottom: '24px' }}>
          <List
            header={{
              title: 'National Best Pizza List',
              subtitle: 'A ranking of the best pizzerias in the world',
              thumbnail: pizzaHeaderImage,
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
                onClick={() => handleTogglePlace(place.id)}
                interactive
                action={
                  <Button
                    uniform
                    color="secondary"
                    aria-label={`${selectedPlaces.includes(place.id) ? 'Remove from' : 'Add to'} favorites`}
                    variant="ghost"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      handleTogglePlace(place.id);
                    }}
                  >
                    {selectedPlaces.includes(place.id) ? '✓' : '+'}
                  </Button>
                }
              />
            )}
          />
        </div>

        {selectedPlaces.length > 0 && (
          <div
            style={{
              padding: '16px',
              background: 'var(--color-surface-secondary)',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
            }}
          >
            <strong>Your Favorites ({selectedPlaces.length})</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
              {selectedPlaces.map((id) => {
                const place = pizzaPlaces.find((p) => p.id === id);
                return <li key={id}>{place?.name}</li>;
              })}
            </ul>
          </div>
        )}
      </section>

      {/* Data Structure */}
      <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>
          Data Structure
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
          Use this structure for displaying ranked lists with ratings and metadata:
        </p>

        <div style={codeBlockStyles.primary}>
          <pre
            style={{
              margin: 0,
              color: 'var(--color-text)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {`interface PizzaPlace {
  id: string;
  name: string;
  city: string;
  rating: number;
  thumbnail: string;
}

type FeatureItem = string | { icon?: IconName; label: string };

// In your component:
<List
  header={{
    title: 'National Best Pizza List',
    subtitle: 'A ranking of the best pizzerias',
    thumbnail: pizzaIcon,
    action: <Button variant="primary">Save List</Button>,
  }}
  items={pizzaPlaces}
  renderItem={(place, index) => (
    <ListItem
      rank={index + 1}
      title={place.name}
      subtitle={place.city}
      features={[
        { icon: 'star', label: \`\${place.rating}\` },
        { icon: 'map-pin', label: 'Nearby' },
      ]}
      media={place.thumbnail}
      mediaAlt={place.name}
      metadata={place.city}
      onClick={() => handleSelectPlace(place.id)}
    />
  )}
/>`}
          </pre>
        </div>
      </section>

      {/* Quick Start */}
      <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>Quick Start</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
              Basic Ranked List
            </h3>
            <pre
              style={{
                background: 'var(--color-surface-tertiary)',
                color: 'var(--color-text)',
                padding: '16px',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '12px',
                lineHeight: '1.5',
                border: '1px solid var(--color-border-subtle)',
                margin: 0,
              }}
            >
              {`<List
  items={pizzaPlaces}
  renderItem={(place, index) => (
    <ListItem
      rank={index + 1}
      title={place.name}
      media={place.thumbnail}
      metadata={place.city}
    />
  )}
/>`}
            </pre>
          </div>

          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
              With Feature Icons
            </h3>
            <pre
              style={{
                background: 'var(--color-surface-tertiary)',
                color: 'var(--color-text)',
                padding: '16px',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '12px',
                lineHeight: '1.5',
                border: '1px solid var(--color-border-subtle)',
                margin: 0,
              }}
            >
              {`// Feature items can be simple strings or icon-label pairs
features={[
  'Wood-fired',                              // Simple string
  { icon: 'star', label: '4.8' },           // Icon with label
  { icon: 'map-pin', label: 'Downtown' },   // Multiple icons
]}`}
            </pre>
          </div>
        </div>
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
              name: 'header',
              description:
                'Optional header configuration with title, subtitle, thumbnail, and action. Type: ListHeaderProps',
            },
            {
              name: 'items',
              description: 'Array of items to render in the list. Type: T[] (generic)',
            },
            {
              name: 'renderItem',
              description:
                'Function to render each item. Type: (item: T, index: number) => ReactNode',
            },
            {
              name: 'showDividers',
              description: 'Show dividing lines between list items. Type: boolean. Default: true',
            },
            {
              name: 'loading',
              description: 'Loading state for entire list. Type: boolean. Default: false',
            },
            {
              name: 'empty',
              description:
                'Custom empty state content. Type: { title?: string; message?: string; action?: ReactNode }',
            },
            {
              name: 'error',
              description:
                'Error state with optional retry. Type: { title?: string; message?: string; onErrorRetry?: () => void }',
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

      {/* Use Cases */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px', alignItems: 'start' }}>
          <h2 style={{ marginBottom: '8px' }}>Use Cases</h2>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '14px' }}>
          <div>
            <strong>Ranked Lists</strong>
            <p style={{ color: 'var(--color-text-secondary)', margin: '8px 0 0 0' }}>
              Display items with rank numbers, perfect for leaderboards, best-of lists, or priority
              queues. Use the <code>rank</code> prop to show position numbers.
            </p>
          </div>

          <div>
            <strong>Feature Attributes</strong>
            <p style={{ color: 'var(--color-text-secondary)', margin: '8px 0 0 0' }}>
              Use the flexible <code>features</code> prop with the reusable Feature component to
              display properties like ratings, price ranges, cuisines, or badges with optional
              icons.
            </p>
          </div>

          <div>
            <strong>Interactive Selection</strong>
            <p style={{ color: 'var(--color-text-secondary)', margin: '8px 0 0 0' }}>
              Make items selectable with <code>onClick</code> handlers and action buttons. Items
              become interactive automatically, showing hover states and focus indicators.
            </p>
          </div>

          <div>
            <strong>Multi-line Content</strong>
            <p style={{ color: 'var(--color-text-secondary)', margin: '8px 0 0 0' }}>
              Combine title, subtitle, features, and metadata to create rich, scannable list items.
              The layout automatically adapts between mobile and desktop views.
            </p>
          </div>

          <div>
            <strong>Action Buttons</strong>
            <p style={{ color: 'var(--color-text-secondary)', margin: '8px 0 0 0' }}>
              Add trailing action buttons (like favorite, delete, or view) with the
              <code>action</code> prop and <code>onActionClick</code> handler.
            </p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px', alignItems: 'start' }}>
          <h2 style={{ marginBottom: '8px' }}>Best Practices</h2>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '14px' }}>
          <div>
            <strong>Keep Titles Concise</strong>
            <ul
              style={{
                marginLeft: '24px',
                marginTop: '8px',
                color: 'var(--color-text-secondary)',
              }}
            >
              <li>Use 2-5 words for main titles to ensure proper truncation on mobile</li>
              <li>Let subtitles and metadata provide additional context</li>
            </ul>
          </div>

          <div>
            <strong>Use Feature Icons Effectively</strong>
            <ul
              style={{
                marginLeft: '24px',
                marginTop: '8px',
                color: 'var(--color-text-secondary)',
              }}
            >
              <li>Mix simple text with icon-label pairs for visual interest</li>
              <li>Use icons for ratings, locations, prices, and other key attributes</li>
              <li>Limit features to 2-3 items to avoid cluttering</li>
            </ul>
          </div>

          <div>
            <strong>Action Buttons</strong>
            <ul
              style={{
                marginLeft: '24px',
                marginTop: '8px',
                color: 'var(--color-text-secondary)',
              }}
            >
              <li>Always stop propagation in action click handlers to prevent row selection</li>
              <li>Use icon-only buttons for compact, semantic actions</li>
              <li>Provide clear aria-labels for accessibility</li>
            </ul>
          </div>

          <div>
            <strong>Accessibility</strong>
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
              <li>Interactive items get proper ARIA roles automatically</li>
              <li>Keyboard navigation works with Tab, Enter, and Space keys</li>
            </ul>
          </div>

          <div>
            <strong>Performance</strong>
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
              <li>Consider virtualization for lists with 100+ items</li>
              <li>Use thumbnails with appropriate dimensions for responsive images</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

// Single comprehensive story
export const PizzaList: Story = {
  render: () => <PizzaListComponent />,
};
