import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Map, FullscreenMap } from '../../components/Map';
import type { LocationData } from '../../components/Map/types';
import { PropsTable } from '../../tokens/PropsTable';
import { codeBlockStyles } from '../../components/storybook/codeBlockStyles';

// Dummy component for Storybook
const MapsExample = () => null;

const meta: Meta<typeof MapsExample> = {
  title: 'Gallery/Maps',
  component: MapsExample,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof MapsExample>;

// Sample location data - San Francisco pizza places
const sampleLocations: LocationData[] = [
  {
    id: 'tonys-pizza',
    name: "Tony's Pizza Napoletana",
    subtitle: 'Neapolitan Pizzeria · North Beach',
    coords: [37.8001, -122.4098],
    description:
      'Award-winning Neapolitan pies in North Beach. A San Francisco institution serving authentic Italian pizza with locally-sourced ingredients.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
    features: [{ icon: 'star', label: '4.8' }, { label: '$$$' }],
    actions: [
      { label: 'Add to favorites', variant: 'primary' },
      { label: 'Contact', variant: 'secondary' },
    ],
    lists: [
      {
        title: 'Reviews',
        items: [
          {
            id: 'review-1',
            title: 'Sarah M.',
            metadata: '2 weeks ago',
            description:
              'Great location! The service was excellent and the atmosphere was perfect.',
          },
          {
            id: 'review-2',
            title: 'John D.',
            metadata: '1 month ago',
            description: 'Highly recommend! Will definitely come back with friends.',
          },
        ],
      },
    ],
  },
  {
    id: 'golden-boy',
    name: 'Golden Boy Pizza',
    subtitle: 'Focaccia Pizza · North Beach',
    coords: [37.799, -122.4093],
    description:
      'Focaccia-style squares, late-night favorite. Classic North Beach spot known for thick, fluffy focaccia pizza by the slice.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
    features: [{ icon: 'star', label: '4.6' }, { label: '$' }],
    actions: [
      { label: 'Add to favorites', variant: 'primary' },
      { label: 'Call', variant: 'secondary' },
    ],
    lists: [
      {
        title: 'Reviews',
        items: [
          {
            id: 'review-1',
            title: 'Maria L.',
            metadata: '3 weeks ago',
            description: 'Late-night gem! Best focaccia pizza in the city.',
          },
        ],
      },
    ],
  },
  {
    id: 'delfina',
    name: 'Pizzeria Delfina',
    subtitle: 'Thin-Crust Pizza · Mission District',
    coords: [37.7613, -122.4255],
    description:
      'Thin-crust classics on 18th Street. Celebrated for perfectly charred, thin-crust pizzas made in a wood-burning oven.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
    features: [{ icon: 'star', label: '4.5' }, { label: '$$' }],
    actions: [
      { label: 'Add to favorites', variant: 'primary' },
      { label: 'Reservations', variant: 'secondary' },
    ],
  },
  {
    id: 'flour-water',
    name: 'Flour + Water Pizzeria',
    subtitle: 'Artisan Pizza · Mission District',
    coords: [37.7775, -122.4388],
    description:
      'Deep-dish and cornmeal crust favorites. Innovative pizzeria from the Flour + Water team with seasonal rotating menu.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-6.png',
    features: [{ icon: 'star', label: '4.5' }, { label: '$$' }],
  },
  {
    id: 'beretta',
    name: 'Beretta',
    subtitle: 'Wood-Fired Pizzeria · North Beach',
    coords: [37.799, -122.4077],
    description:
      'Wood-fired pies and burrata in North Beach. Stylish spot combining pizza excellence with a full cocktail program.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-4.png',
    features: [{ icon: 'star', label: '4.6' }, { label: '$$' }],
  },
  {
    id: 'slice-house',
    name: 'Slice House',
    subtitle: 'Neighborhood Pizza · Valencia Street',
    coords: [37.7722, -122.438],
    description:
      'Neighborhood spot with seasonal toppings. Local favorite featuring creative combinations and locally-sourced ingredients.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
    features: [{ icon: 'star', label: '4.4' }, { label: '$$' }],
  },
  {
    id: 'pizza-palace',
    name: 'Pizza Palace',
    subtitle: 'Sourdough Pizza · Nob Hill',
    coords: [37.7899, -122.4123],
    description:
      'Sourdough, wood-fired pies near Nob Hill. San Francisco sourdough meets traditional Italian pizza-making.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
    features: [{ icon: 'star', label: '4.6' }, { label: '$$$' }],
  },
  {
    id: 'crispy-crust',
    name: 'Crispy Crust',
    subtitle: 'Detroit-Style Pizza · SoMa',
    coords: [37.7805, -122.4135],
    description:
      'Crispy-edged Detroit-style in SoMa. Bringing Detroit-style square pizza to San Francisco with creative toppings.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
    features: [{ icon: 'star', label: '4.5' }, { label: '$$' }],
  },
];

// Maps component
const MapsComponent: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // When fullscreen, render in a fixed position overlay that takes up the entire viewport
  if (isFullscreen) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          backgroundColor: 'var(--color-surface)',
          display: 'flex',
          flexDirection: 'column',
          fontFamily:
            'var(--ai-font-family-base, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
        }}
      >
        <div style={{ flex: 1, overflow: 'auto' }}>
          {/*
            For fullscreen mode, we render the FullscreenMap directly
            Parent controls selectedId state for proper sync between views
          */}
          <FullscreenMap
            locations={sampleLocations}
            selectedId={selectedId}
            onLocationSelect={(id) => setSelectedId(id)}
            onCollapse={() => setIsFullscreen(false)}
            defaultCenter={[37.7749, -122.4194]}
            defaultZoom={12}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '900px',
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
          🗺️ Interactive Maps
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: 'var(--color-text-secondary)',
            margin: 0,
            lineHeight: '1.6',
          }}
        >
          A complete location-based map system with interactive markers, carousel navigation, and
          fullscreen expansion. Click on locations to explore details, use the carousel to browse,
          and expand to fullscreen for a complete map experience. Perfect for travel guides,
          restaurant finders, and location discovery in your ChatGPT App.
        </p>
      </section>

      {/* Live Demo */}
      <section style={{ marginBottom: '64px' }}>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
            color: 'var(--color-text)',
          }}
        >
          Live Demo
        </h2>

        <p
          style={{
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            marginBottom: '12px',
            fontStyle: 'italic',
          }}
        >
          Try clicking the expand button (↗️) in the top-right corner to enter fullscreen, or click
          locations on the map and in the carousel below.
        </p>

        <div
          style={{
            width: '100%',
            height: isFullscreen ? '600px' : '478px',
            marginBottom: '24px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 'var(--elevation-2-shadow)',
          }}
        >
          <Map
            locations={sampleLocations}
            selectedId={selectedId}
            onLocationSelect={(id) => setSelectedId(id)}
            defaultCenter={[37.7749, -122.4194]}
            defaultZoom={12}
            isFullscreen={isFullscreen}
            onToggleFullscreen={setIsFullscreen}
          />
        </div>

        <div
          style={{
            padding: '16px',
            background: 'var(--color-surface-secondary)',
            borderRadius: '8px',
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
          }}
        >
          <strong style={{ color: 'var(--color-text)' }}>✨ Features:</strong>
          <ul
            style={{
              margin: '8px 0 0 0',
              paddingLeft: '20px',
              lineHeight: '1.6',
            }}
          >
            <li>Click expand button (↗️) to switch to fullscreen map view</li>
            <li>Click locations on the map or carousel to select and view details</li>
            <li>Location carousel syncs with map selection</li>
            <li>Desktop sidebar and Inspector panel in fullscreen mode</li>
            <li>Mobile-responsive bottom carousel in fullscreen mode</li>
            <li>Smooth marker fly-to animations</li>
            <li>Responsive design works on all devices</li>
          </ul>
        </div>
      </section>

      {/* Use Cases Section */}
      <section style={{ marginBottom: '64px' }}>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '24px',
            color: 'var(--color-text)',
          }}
        >
          Use Cases
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {[
            {
              title: '🍕 Restaurant Finder',
              description:
                'Browse nearby restaurants with ratings, hours, and reviews. Expand to see detailed location info.',
            },
            {
              title: '✈️ Travel Guide',
              description:
                'Explore tourist attractions, hotels, and landmarks with detailed information and location coordinates.',
            },
            {
              title: '🏠 Real Estate',
              description:
                'Browse properties on an interactive map with details, photos, and agent information.',
            },
            {
              title: '🎵 Event Discovery',
              description:
                'Find concerts, festivals, and events near you with schedules, pricing, and venue details.',
            },
            {
              title: '🏥 Service Locator',
              description:
                'Locate nearby services like hospitals, gas stations, or ATMs with hours and contact information.',
            },
            {
              title: '🛍️ Shopping Outlets',
              description:
                'Find retail locations, compare stores, and check inventory at different branches.',
            },
          ].map((useCase, index) => (
            <div
              key={index}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: 'var(--color-surface)',
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  margin: '0 0 8px 0',
                  color: 'var(--color-text)',
                }}
              >
                {useCase.title}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                  lineHeight: '1.5',
                }}
              >
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Section */}
      <section style={{ marginBottom: '64px' }}>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '24px',
            color: 'var(--color-text)',
          }}
        >
          ChatGPT Apps SDK Integration
        </h2>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            marginBottom: '16px',
            lineHeight: '1.6',
          }}
        >
          The Map component is designed specifically for ChatGPT Apps SDK integration. Use the
          controlled mode pattern shown below to let ChatGPT manage the iframe expansion when users
          click the expand button. The component automatically syncs with ChatGPT's display mode
          changes, so clicking ChatGPT's X button will collapse the map.
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
            {`import { useState } from 'react';
import { Map } from '@ainativekit/ui';

function MyMapApp() {
  const [selectedId, setSelectedId] = useState();
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  return (
    <Map
      locations={locations}
      selectedId={selectedId}
      onLocationSelect={(id) => setSelectedId(id)}
      isFullscreen={isMapFullscreen}
      onToggleFullscreen={setIsMapFullscreen}
      defaultCenter={[37.7749, -122.4194]}
      defaultZoom={12}
    />
  );
}`}
          </pre>
        </div>

        <div
          style={{
            padding: '16px',
            background: 'var(--color-surface-secondary)',
            borderRadius: '8px',
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
          }}
        >
          <strong style={{ color: 'var(--color-text)' }}>💡 Integration Tips:</strong>
          <ul
            style={{
              margin: '8px 0 0 0',
              paddingLeft: '20px',
              lineHeight: '1.8',
            }}
          >
            <li>
              <strong>Controlled Mode:</strong> Always use controlled mode with ChatGPT integration
              so ChatGPT can manage iframe expansion
            </li>
            <li>
              <strong>isFullscreen + onToggleFullscreen:</strong> Map calls your callback when user
              clicks expand/collapse button
            </li>
            <li>
              <strong>Automatic Display Mode Sync:</strong> Map listens to ChatGPT's display mode
              changes - clicking ChatGPT's X button automatically collapses the map
            </li>
            <li>
              <strong>Default Size:</strong> CompactMap uses 478px height (ChatGPT Apps SDK
              standard)
            </li>
            <li>
              <strong>Responsive:</strong> Design automatically adapts to mobile/desktop viewport
              sizes
            </li>
            <li>
              <strong>Location Data:</strong> Include rich details (description, actions, reviews)
              for best UX
            </li>
          </ul>
        </div>
      </section>

      {/* Component Props Section */}
      <section style={{ marginBottom: '64px' }}>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '24px',
            color: 'var(--color-text)',
          }}
        >
          Component Props
        </h2>

        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: 'var(--color-text)',
            }}
          >
            Map Component
          </h3>

          <PropsTable
            hideThemeColumn
            rows={[
              {
                name: 'locations',
                description: 'Array of location objects to display on the map (required)',
              },
              {
                name: 'selectedId',
                description: 'ID of currently selected location (controlled mode)',
              },
              {
                name: 'onLocationSelect',
                description: 'Callback when a location is selected: (id: string | undefined) => void',
              },
              {
                name: 'defaultCenter',
                description: 'Initial center coordinates: [latitude, longitude]',
              },
              {
                name: 'defaultZoom',
                description: 'Initial zoom level (1-18). Default: 12',
              },
              {
                name: 'isFullscreen',
                description: 'Whether the map is in fullscreen mode (controlled mode)',
              },
              {
                name: 'onToggleFullscreen',
                description: 'Callback when fullscreen is toggled: (isFullscreen: boolean) => void',
              },
              {
                name: 'markerVariant',
                description: 'Marker style: "pin" | "dot" | "hybrid". Default: "hybrid"',
              },
              {
                name: 'loading',
                description: 'Show loading state. Default: false',
              },
              {
                name: 'error',
                description: 'Error state configuration with title, message, and retry callback',
              },
            ]}
          />
        </div>

        <div>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: 'var(--color-text)',
            }}
          >
            LocationData Interface
          </h3>

          <PropsTable
            hideThemeColumn
            rows={[
              {
                name: 'id',
                description: 'Unique identifier for the location (required)',
              },
              {
                name: 'name',
                description: 'Location name/title (required)',
              },
              {
                name: 'coords',
                description: 'Geographic coordinates: [latitude, longitude] (required)',
              },
              {
                name: 'thumbnail',
                description: 'Thumbnail image URL (required)',
              },
              {
                name: 'subtitle',
                description: 'Secondary text shown below name',
              },
              {
                name: 'description',
                description: 'Detailed description text',
              },
              {
                name: 'features',
                description: 'Array of feature items: { icon?: string; label: string }[]',
              },
              {
                name: 'actions',
                description: 'Action buttons: { label: string; variant?: "primary" | "secondary"; onClick?: () => void }[]',
              },
              {
                name: 'lists',
                description: 'Optional lists (e.g., reviews): { title: string; items: AvatarListItem[] }[]',
              },
            ]}
          />
        </div>
      </section>

      {/* Key Features Section */}
      <section>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '24px',
            color: 'var(--color-text)',
          }}
        >
          Key Features
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
          }}
        >
          {[
            {
              title: 'Interactive Map',
              description: 'Leaflet-powered with smooth interactions and animations',
            },
            {
              title: 'Expand/Collapse',
              description: 'Toggle between compact and fullscreen views',
            },
            {
              title: 'Carousel',
              description: 'Browse locations with synchronized carousel navigation',
            },
            {
              title: 'Inspector Panel',
              description: 'View detailed location info with actions and reviews in fullscreen',
            },
            {
              title: 'Responsive Design',
              description: 'Adaptive sidebar on desktop, carousel on mobile',
            },
            {
              title: 'Customizable',
              description: 'Marker colors, zoom levels, and center coordinates',
            },
            {
              title: 'State Management',
              description: 'Controlled and uncontrolled modes supported',
            },
            {
              title: 'Loading States',
              description: 'Built-in loading, error, and empty state handling',
            },
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: 'var(--color-surface)',
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  margin: '0 0 8px 0',
                  color: 'var(--color-text)',
                }}
              >
                ✓ {feature.title}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                  lineHeight: '1.5',
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Single unified story (like Albums)
export const Maps: Story = {
  render: () => <MapsComponent />,
};
