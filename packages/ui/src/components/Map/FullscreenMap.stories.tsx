import { useMemo, useState } from 'react';
import type { FC, CSSProperties } from 'react';
import type { Meta } from '@storybook/react';
import { FullscreenMap } from './FullscreenMap';
import type { LocationData } from './types';
import { PropsTable } from '../../tokens/PropsTable';

const DOC_LAYOUT_WIDTH = 1200;
const PRIMARY_HEIGHT = '620px';
const SECONDARY_HEIGHT = '520px';

// Import the rich location data from Maps story for consistent showcase
const sampleLocations: LocationData[] = [
  {
    id: 'tonys-pizza',
    name: "Tony's Pizza Napoletana",
    subtitle: 'Neapolitan Pizzeria · North Beach',
    coords: [37.8001, -122.4098],
    description:
      'Award-winning Neapolitan pies in North Beach.<br/><br/>A San Francisco institution serving authentic Italian pizza with locally-sourced ingredients.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
    images: [
      'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
      'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
      'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
      'https://persistent.oaistatic.com/pizzaz/pizzaz-4.png',
    ],
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
              'Great location!<br/>The service was excellent and the atmosphere was perfect.',
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
      'Thin-crust classics on 18th Street.<br/>Celebrated for perfectly charred, thin-crust pizzas made in a wood-burning oven.',
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

const containerStyle: CSSProperties = {
  width: '100%',
  maxWidth: `${DOC_LAYOUT_WIDTH}px`,
  borderRadius: '16px',
  overflow: 'hidden',
  border: '1px solid var(--color-border-subtle)',
  boxShadow: 'var(--elevation-2-shadow)',
};

const meta: Meta<typeof FullscreenMap> = {
  title: 'Composed Components/Maps',
  component: FullscreenMap,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const FullscreenMapDoc: FC = () => {
  const locations = useMemo(() => sampleLocations, []);
  const [selectedId, setSelectedId] = useState<string | undefined>('tonys-pizza');

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '64px' }}>
      <section>
        <h1 style={{ marginBottom: '16px' }}>FullscreenMap</h1>
        <p
          style={{
            margin: 0,
            maxWidth: '760px',
            color: 'var(--color-text-secondary)',
            fontSize: '16px',
            lineHeight: 1.6,
          }}
        >
          Immersive map experience with synchronized sidebar, inspector, and mobile carousel. Ideal
          for ChatGPT Apps when users escalate from a compact inline map to a full exploration
          surface.
        </p>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <header>
          <h2 style={{ marginBottom: '8px' }}>Primary Layout</h2>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
            Desktop layout with sidebar navigation and inspector panel. Mobile view collapses to a
            bottom carousel automatically.
          </p>
        </header>
        <div style={{ ...containerStyle, height: PRIMARY_HEIGHT }}>
          <FullscreenMap
            locations={locations}
            selectedId={selectedId}
            onLocationSelect={setSelectedId}
            height={PRIMARY_HEIGHT}
          />
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        }}
      >
        <article style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Loading
          </h3>
          <div style={{ ...containerStyle, height: SECONDARY_HEIGHT }}>
            <FullscreenMap locations={locations} loading height={SECONDARY_HEIGHT} />
          </div>
        </article>

        <article style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Error
          </h3>
          <div style={{ ...containerStyle, height: SECONDARY_HEIGHT }}>
            <FullscreenMap
              locations={locations}
              error
              height={SECONDARY_HEIGHT}
              errorTitle="Failed to load locations"
              errorMessage="Unable to retrieve location data. Please try again."
            />
          </div>
        </article>

        <article style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Empty
          </h3>
          <div style={{ ...containerStyle, height: SECONDARY_HEIGHT }}>
            <FullscreenMap locations={[]} height={SECONDARY_HEIGHT} />
          </div>
        </article>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <header>
          <h2 style={{ marginBottom: '8px' }}>Interaction Considerations</h2>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
            Tips for keeping the fullscreen experience smooth across desktop and mobile contexts.
          </p>
        </header>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--color-text-secondary)' }}>
          <li>Maintain shared selection state so compact and fullscreen maps stay in sync.</li>
          <li>
            Provide `onErrorRetry` callbacks when remote data is involved to keep recovery within
            the Apps surface.
          </li>
          <li>
            Use inspector notes to summarise key attributes so users don't rely solely on the map.
          </li>
          <li>
            Respect layout breakpoints—sidebar hides under 1024px with the carousel taking over.
          </li>
          <li>
            Fullscreen maps use native scroll wheel zoom by default (`scrollWheelZoom=true`) for the
            best desktop experience, while compact maps use custom pinch-to-zoom handlers.
          </li>
          <li>
            Add an `images` array to LocationData for multi-photo locations—the inspector
            automatically renders a PhotoCarousel with dots and arrows when multiple images are
            present, falling back to a single thumbnail otherwise.
          </li>
        </ul>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <header>
          <h2 style={{ marginBottom: '8px' }}>FullscreenMap Props</h2>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
            Extends `MapView` with layout, loading, and content configuration for the fullscreen
            shell.
          </p>
        </header>
        <PropsTable
          hideThemeColumn
          rows={[
            {
              name: 'locations',
              description: 'Array of locations to render. Type: LocationData[] (required)',
            },
            {
              name: 'defaultSelectedId',
              description: 'Initial location id for inspector/sidebar selection.',
            },
            {
              name: 'height',
              description: 'Container height. Accepts number (px) or string. Default: "100vh".',
            },
            {
              name: 'loading',
              description: 'Render the skeleton layout (map + cards) while data loads.',
            },
            {
              name: 'error',
              description: 'Show error summary via the location carousel (mobile-first surface).',
            },
            {
              name: 'errorTitle',
              description: 'Custom error title displayed in the carousel overlay.',
            },
            {
              name: 'errorMessage',
              description: 'Supporting error copy presented in the carousel overlay.',
            },
            {
              name: 'onErrorRetry',
              description: 'Callback used to expose a retry button within the carousel.',
            },
            {
              name: 'emptyTitle',
              description: 'Headline shown when no locations provided. Default: "No locations".',
            },
            {
              name: 'emptyMessage',
              description: 'Supporting text for empty state. Default: "No locations to display".',
            },
          ]}
        />
      </section>
    </div>
  );
};

export const FullscreenMaps = () => <FullscreenMapDoc />;
