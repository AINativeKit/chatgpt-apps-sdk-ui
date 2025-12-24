import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MapPlaceCard } from './MapPlaceCard';

const meta: Meta<typeof MapPlaceCard> = {
  title: 'Composed Components/Cards/Map Place Cards',
  component: MapPlaceCard,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// Sample locations
const SAMPLE_LOCATIONS = [
  {
    image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=200&q=80',
    title: 'Central Park',
    subtitle: 'New York, NY',
    features: [
      { icon: 'star' as const, label: '4.8' },
      { label: 'Free' },
      { icon: 'clock' as const, label: 'Open 6am-1am' },
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=200&q=80',
    title: 'Golden Gate Bridge',
    subtitle: 'San Francisco, CA',
    features: [{ icon: 'star' as const, label: '4.9' }, { label: '$10' }, { label: '2.5 mi' }],
  },
  {
    image: 'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=200&q=80',
    title: 'Griffith Observatory',
    subtitle: 'Los Angeles, CA',
    features: [{ icon: 'star' as const, label: '4.7' }, { label: 'Free' }],
  },
];

// Main unified showcase component
const MapPlaceCardShowcase: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('1');
  const [retryCount, setRetryCount] = useState(0);

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '32px' }}>MapPlaceCard System</h1>

      {/* Overview */}
      <section style={{ marginBottom: '64px' }}>
        <p
          style={{
            marginBottom: '24px',
            color: 'var(--ai-color-text-secondary)',
            fontSize: '16px',
            lineHeight: '1.6',
          }}
        >
          Map place cards display places with thumbnail images, titles, and configurable features.
          Perfect for maps, map place lists, and place pickers with full state management support.
        </p>
      </section>

      {/* Variants Gallery */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>MapPlaceCard Variants</h2>
          <p style={{ color: 'var(--ai-color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Different content configurations and states
          </p>
        </header>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '14px', marginBottom: '16px', fontWeight: '600' }}>
            Standard Locations
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
            <MapPlaceCard
              {...SAMPLE_LOCATIONS[0]}
              selected={selectedId === '1'}
              onClick={() => setSelectedId('1')}
            />
            <MapPlaceCard
              {...SAMPLE_LOCATIONS[1]}
              selected={selectedId === '2'}
              onClick={() => setSelectedId('2')}
            />
            <MapPlaceCard
              {...SAMPLE_LOCATIONS[2]}
              selected={selectedId === '3'}
              onClick={() => setSelectedId('3')}
            />
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '14px', marginBottom: '16px', fontWeight: '600' }}>
            Minimal Content
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
            <MapPlaceCard
              image={SAMPLE_LOCATIONS[0].image}
              title="Simple Location"
              onClick={() => console.log('Clicked')}
            />
            <MapPlaceCard
              image={SAMPLE_LOCATIONS[1].image}
              title="With Subtitle Only"
              subtitle="Description text"
              onClick={() => console.log('Clicked')}
            />
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', marginBottom: '16px', fontWeight: '600' }}>
            With Badges & Chips
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
            <MapPlaceCard {...SAMPLE_LOCATIONS[0]} badge="New" badgeVariant="soft" />
            <MapPlaceCard {...SAMPLE_LOCATIONS[1]} badge="Popular" badgeVariant="solid" />
            <MapPlaceCard {...SAMPLE_LOCATIONS[2]} badge={5} badgeVariant="soft" />
          </div>
        </div>
      </section>

      {/* States */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>States</h2>
          <p style={{ color: 'var(--ai-color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Loading, error, and empty states with proper fallbacks
          </p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
          <div>
            <h3
              style={{
                fontSize: '14px',
                marginBottom: '12px',
                color: 'var(--ai-color-text-secondary)',
                fontWeight: '600',
              }}
            >
              Loading
            </h3>
            <MapPlaceCard
              image={SAMPLE_LOCATIONS[0].image}
              title="Loading Location"
              loading={true}
            />
          </div>

          <div>
            <h3
              style={{
                fontSize: '14px',
                marginBottom: '12px',
                color: 'var(--ai-color-text-secondary)',
                fontWeight: '600',
              }}
            >
              Error (with retry)
            </h3>
            <MapPlaceCard
              image={SAMPLE_LOCATIONS[0].image}
              title="Error Location"
              error={true}
              errorTitle="Failed to load location"
              errorMessage="Unable to retrieve location details"
              onErrorRetry={() => {
                setRetryCount(retryCount + 1);
                console.log('Retry clicked:', retryCount + 1);
              }}
            />
          </div>

          <div>
            <h3
              style={{
                fontSize: '14px',
                marginBottom: '12px',
                color: 'var(--ai-color-text-secondary)',
                fontWeight: '600',
              }}
            >
              Empty
            </h3>
            <MapPlaceCard
              image=""
              title=""
              emptyTitle="No location selected"
              emptyMessage="Choose a location to view details"
            />
          </div>
        </div>
      </section>

      {/* Real-World Example */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Real-World Example</h2>
          <p style={{ color: 'var(--ai-color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Interactive location list with selection and badges
          </p>
        </header>

        <div
          style={{
            backgroundColor: 'var(--ai-color-bg-secondary)',
            padding: '24px',
            borderRadius: '12px',
            maxWidth: '650px',
          }}
        >
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Nearby Locations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {SAMPLE_LOCATIONS.map((location, index) => (
              <MapPlaceCard
                key={index}
                {...location}
                selected={selectedId === `real-${index}`}
                onClick={() => setSelectedId(`real-${index}`)}
                badge={index === 0 ? 'Closest' : undefined}
                badgeVariant={index === 0 ? 'soft' : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Usage Guidelines</h2>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: '600' }}>
              When to Use
            </h3>
            <ul
              style={{
                margin: 0,
                paddingLeft: '20px',
                color: 'var(--ai-color-text-secondary)',
                lineHeight: '1.8',
              }}
            >
              <li>Map sidebar location lists</li>
              <li>Location search results</li>
              <li>Place picker interfaces</li>
              <li>Points of interest</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: '600' }}>
              Best Practices
            </h3>
            <ul
              style={{
                margin: 0,
                paddingLeft: '20px',
                color: 'var(--ai-color-text-secondary)',
                lineHeight: '1.8',
              }}
            >
              <li>Use Chips for text labels</li>
              <li>Use Badges for numbers</li>
              <li>Keep features concise (3-4 max)</li>
              <li>Provide retry on errors</li>
              <li>Enable lazy loading for lists</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: '600' }}>
              Accessibility
            </h3>
            <ul
              style={{
                margin: 0,
                paddingLeft: '20px',
                color: 'var(--ai-color-text-secondary)',
                lineHeight: '1.8',
              }}
            >
              <li>Keyboard navigable</li>
              <li>Screen reader support</li>
              <li>Loading announcements</li>
              <li>ARIA labels included</li>
            </ul>
          </div>
        </div>
      </section>
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Props Reference</h2>
          <p style={{ color: 'var(--ai-color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Complete API documentation for MapPlaceCard
          </p>
        </header>

        <div
          style={{
            border: '1px solid rgba(121, 116, 126, 0.2)',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '24px',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--ai-color-bg-secondary)' }}>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '14px 16px',
                    fontWeight: '600',
                    fontSize: '14px',
                    borderBottom: '1px solid rgba(121, 116, 126, 0.15)',
                  }}
                >
                  Prop
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '14px 16px',
                    fontWeight: '600',
                    fontSize: '14px',
                    borderBottom: '1px solid rgba(121, 116, 126, 0.15)',
                  }}
                >
                  Type
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '14px 16px',
                    fontWeight: '600',
                    fontSize: '14px',
                    borderBottom: '1px solid rgba(121, 116, 126, 0.15)',
                  }}
                >
                  Default
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '14px 16px',
                    fontWeight: '600',
                    fontSize: '14px',
                    borderBottom: '1px solid rgba(121, 116, 126, 0.15)',
                  }}
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: 'image',
                  type: 'string',
                  required: true,
                  description: 'Thumbnail image URL',
                },
                {
                  name: 'title',
                  type: 'string',
                  required: true,
                  description: 'Location name/title',
                },
                { name: 'subtitle', type: 'string', description: 'Optional subtitle/description' },
                {
                  name: 'features',
                  type: 'Feature[]',
                  description: 'Configurable feature list (rating, price, etc.)',
                },
                {
                  name: 'selected',
                  type: 'boolean',
                  default: 'false',
                  description: 'Whether this card is currently selected',
                },
                { name: 'onClick', type: '() => void', description: 'Click handler' },
                {
                  name: 'loading',
                  type: 'boolean',
                  default: 'false',
                  description: 'Loading state - shows skeleton UI',
                },
                {
                  name: 'error',
                  type: 'boolean',
                  default: 'false',
                  description: 'Error state - shows error message',
                },
                {
                  name: 'errorTitle',
                  type: 'string',
                  default: "'Failed to load'",
                  description: 'Custom error title',
                },
                { name: 'errorMessage', type: 'string', description: 'Custom error message' },
                {
                  name: 'onErrorRetry',
                  type: '() => void',
                  description: 'Retry callback for error state',
                },
                {
                  name: 'emptyTitle',
                  type: 'string',
                  default: "'No location'",
                  description: 'Empty state title',
                },
                { name: 'emptyMessage', type: 'string', description: 'Empty state message' },
                {
                  name: 'imageLazy',
                  type: 'boolean',
                  default: 'true',
                  description: 'Enable lazy loading for thumbnail',
                },
                {
                  name: 'onImageLoad',
                  type: '(event) => void',
                  description: 'Callback when image loads',
                },
                {
                  name: 'onImageError',
                  type: '(event) => void',
                  description: 'Callback when image fails',
                },
                {
                  name: 'badge',
                  type: 'string | number',
                  description: 'Badge content (numbers use Badge, text uses Chip)',
                },
                {
                  name: 'badgePosition',
                  type: "'top-left' | 'top-right'",
                  default: "'top-right'",
                  description:
                    'Badge position (note: top-left not supported, always uses top-right)',
                },
                {
                  name: 'badgeVariant',
                  type: 'BadgeVariant | ChipVariant',
                  description: 'Badge or Chip variant style',
                },
                {
                  name: 'titleLines',
                  type: '1 | 2 | 3',
                  default: '1',
                  description: 'Number of lines for title',
                },
                {
                  name: 'subtitleLines',
                  type: '1 | 2 | 3',
                  default: '1',
                  description: 'Number of lines for subtitle',
                },
                { name: 'className', type: 'string', description: 'Additional CSS class name' },
                { name: 'data-testid', type: 'string', description: 'Test ID for testing' },
              ].map((prop, index) => (
                <tr key={prop.name}>
                  <td
                    style={{
                      padding: '12px 16px',
                      borderBottom: index < 22 ? '1px solid rgba(121, 116, 126, 0.08)' : 'none',
                      fontFamily: 'monospace',
                      fontSize: '13px',
                    }}
                  >
                    {prop.name}
                    {prop.required && <span style={{ color: 'var(--ai-color-error)' }}> *</span>}
                  </td>
                  <td
                    style={{
                      padding: '12px 16px',
                      borderBottom: index < 22 ? '1px solid rgba(121, 116, 126, 0.08)' : 'none',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                      color: 'var(--ai-color-text-secondary)',
                    }}
                  >
                    {prop.type}
                  </td>
                  <td
                    style={{
                      padding: '12px 16px',
                      borderBottom: index < 22 ? '1px solid rgba(121, 116, 126, 0.08)' : 'none',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                      color: 'var(--ai-color-text-tertiary)',
                    }}
                  >
                    {prop.default || '-'}
                  </td>
                  <td
                    style={{
                      padding: '12px 16px',
                      borderBottom: index < 22 ? '1px solid rgba(121, 116, 126, 0.08)' : 'none',
                      fontSize: '14px',
                      color: 'var(--ai-color-text-secondary)',
                    }}
                  >
                    {prop.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export const MapPlaceCards: StoryObj = {
  render: () => <MapPlaceCardShowcase />,
};
