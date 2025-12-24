import { useState, useMemo } from 'react';
import type { FC } from 'react';
import type { Meta } from '@storybook/react';
import { CompactMap } from './CompactMap';
import type { LocationData } from './types';

const CHATGPT_APP_WIDTH = '766px';

// San Francisco sample locations for tile provider examples
const sampleLocations: LocationData[] = [
  {
    id: 'tonys-pizza',
    name: "Tony's Pizza Napoletana",
    subtitle: 'Neapolitan Pizzeria · North Beach',
    coords: [37.8001, -122.4098],
    description: 'Award-winning Neapolitan pies in North Beach.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
    features: [{ icon: 'star', label: '4.8' }, { label: '$$$' }],
  },
  {
    id: 'golden-boy',
    name: 'Golden Boy Pizza',
    subtitle: 'Focaccia Pizza · North Beach',
    coords: [37.799, -122.4093],
    description: 'Focaccia-style squares, late-night favorite.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
    features: [{ icon: 'star', label: '4.6' }, { label: '$' }],
  },
  {
    id: 'delfina',
    name: 'Pizzeria Delfina',
    subtitle: 'Thin-Crust Pizza · Mission District',
    coords: [37.7613, -122.4255],
    description: 'Thin-crust classics on 18th Street.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
    features: [{ icon: 'star', label: '4.5' }, { label: '$$' }],
  },
];

const meta: Meta<typeof CompactMap> = {
  title: 'Composed Components/Maps/Tile Providers',
  component: CompactMap,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

const CodeBlock: FC<{ code: string; title?: string }> = ({ code, title }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {title && (
      <div
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--color-text)',
        }}
      >
        {title}
      </div>
    )}
    <pre
      style={{
        margin: 0,
        padding: '16px',
        background: 'var(--color-surface-secondary)',
        borderRadius: '8px',
        overflow: 'auto',
        fontSize: '13px',
        lineHeight: '1.6',
        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, monospace',
        border: '1px solid var(--color-border)',
      }}
    >
      <code>{code}</code>
    </pre>
  </div>
);

const ExampleSection: FC<{
  title: string;
  description: string;
  children: React.ReactNode;
  code: string;
}> = ({ title, description, children, code }) => (
  <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <header>
      <h2 style={{ marginBottom: '8px', fontSize: '24px', fontWeight: 600 }}>{title}</h2>
      <p style={{ margin: 0, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
        {description}
      </p>
    </header>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        alignItems: 'start',
      }}
    >
      <div style={{ minHeight: '400px' }}>{children}</div>
      <CodeBlock code={code} />
    </div>
  </section>
);

export const TileProviders: FC = () => {
  const [selectedId1, setSelectedId1] = useState<string | undefined>(undefined);
  const [selectedId2, setSelectedId2] = useState<string | undefined>(undefined);
  const [selectedId3, setSelectedId3] = useState<string | undefined>(undefined);
  const [selectedId7, setSelectedId7] = useState<string | undefined>(undefined);
  const [selectedId8, setSelectedId8] = useState<string | undefined>(undefined);
  const [selectedId9, setSelectedId9] = useState<string | undefined>(undefined);
  const [selectedId10, setSelectedId10] = useState<string | undefined>(undefined);
  const [selectedId11, setSelectedId11] = useState<string | undefined>(undefined);

  const locations = useMemo(() => sampleLocations, []);

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '64px' }}>
      <section>
        <h1 style={{ marginBottom: '16px' }}>Tile Provider Styles</h1>
        <p
          style={{
            margin: 0,
            maxWidth: '720px',
            color: 'var(--color-text-secondary)',
            fontSize: '16px',
            lineHeight: 1.6,
          }}
        >
          The Map component supports 18+ tile provider styles powered by OpenStreetMap data. Choose
          from CARTO basemaps, OSM variants, specialized maps, and more. Simply pass the{' '}
          <code>tileProvider</code> prop to any Map component. Examples below show free providers
          that work without API keys.
        </p>

        <div
          style={{
            marginTop: '16px',
            background: 'var(--color-surface-secondary)',
            borderRadius: '12px',
            padding: '16px',
            maxWidth: CHATGPT_APP_WIDTH,
            color: 'var(--color-text-secondary)',
            fontSize: '14px',
          }}
        >
          <strong>All tile providers shown below are free to use</strong> (no API key required).
        </div>
      </section>

      {/* CARTO Basemaps */}
      <section
        style={{ paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}
      >
        <h2 style={{ marginBottom: '8px', fontSize: '28px', fontWeight: 600 }}>CARTO Basemaps</h2>
        <p
          style={{
            margin: '0 0 32px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
          }}
        >
          CARTO provides clean, modern basemap styles optimized for data visualization. Free to use
          via Fastly CDN.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
          <ExampleSection
            title="CARTO Light (Positron)"
            description="Clean, minimal light theme."
            code={`<Map
  locations={locations}
  tileProvider="carto-light"
/>`}
          >
            <CompactMap
              key="carto-light"
              locations={locations}
              selectedId={selectedId1}
              onLocationSelect={setSelectedId1}
              tileProvider="carto-light"
              defaultCenter={[37.7849, -122.4194]}
              defaultZoom={13}
            />
          </ExampleSection>

          <ExampleSection
            title="CARTO Dark (Dark Matter)"
            description="Dark theme with black/gray background. Use the 'Dark' toggle in the Storybook toolbar to see this map in dark mode."
            code={`<Map
  locations={locations}
  tileProvider="carto-dark"
/>`}
          >
            <CompactMap
              key="carto-dark"
              locations={locations}
              selectedId={selectedId2}
              onLocationSelect={setSelectedId2}
              tileProvider="carto-dark"
              defaultCenter={[37.7849, -122.4194]}
              defaultZoom={13}
            />
          </ExampleSection>

          <ExampleSection
            title="CARTO Voyager"
            description="Colorful, detailed theme with subtle colors for parks, water, and roads. Current default."
            code={`<Map
  locations={locations}
  tileProvider="carto-voyager"
/>`}
          >
            <CompactMap
              key="carto-voyager"
              locations={locations}
              selectedId={selectedId3}
              onLocationSelect={setSelectedId3}
              tileProvider="carto-voyager"
              defaultCenter={[37.7849, -122.4194]}
              defaultZoom={13}
            />
          </ExampleSection>
        </div>
      </section>

      {/* OpenStreetMap Styles */}
      <section
        style={{ paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}
      >
        <h2 style={{ marginBottom: '8px', fontSize: '28px', fontWeight: 600 }}>
          OpenStreetMap Styles
        </h2>
        <p
          style={{
            margin: '0 0 32px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
          }}
        >
          Official OpenStreetMap rendering styles. Free to use, donation-funded.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
          <ExampleSection
            title="OSM Standard"
            description="The default OpenStreetMap style. Detailed multi-color street map showing broad range of features."
            code={`<Map
  locations={locations}
  tileProvider="osm-standard"
/>`}
          >
            <CompactMap
              key="osm-standard"
              locations={locations}
              selectedId={selectedId7}
              onLocationSelect={setSelectedId7}
              tileProvider="osm-standard"
              defaultCenter={[37.7849, -122.4194]}
              defaultZoom={13}
            />
          </ExampleSection>

          <ExampleSection
            title="OSM Humanitarian (HOT)"
            description="Humanitarian OpenStreetMap Team style. Clearer differentiation useful for disaster mapping."
            code={`<Map
  locations={locations}
  tileProvider="osm-humanitarian"
/>`}
          >
            <CompactMap
              key="osm-humanitarian"
              locations={locations}
              selectedId={selectedId8}
              onLocationSelect={setSelectedId8}
              tileProvider="osm-humanitarian"
              defaultCenter={[37.7849, -122.4194]}
              defaultZoom={13}
            />
          </ExampleSection>
        </div>
      </section>

      {/* Specialized Maps */}
      <section
        style={{ paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}
      >
        <h2 style={{ marginBottom: '8px', fontSize: '28px', fontWeight: 600 }}>Specialized Maps</h2>
        <p
          style={{
            margin: '0 0 32px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
          }}
        >
          Purpose-built map styles for specific use cases like cycling, topography, and public
          transit.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
          <ExampleSection
            title="CyclOSM"
            description="Cycling-focused map highlighting bike routes, lanes, and topography. Perfect for outdoor apps."
            code={`<Map
  locations={locations}
  tileProvider="cyclOSM"
/>`}
          >
            <CompactMap
              key="cyclOSM"
              locations={locations}
              selectedId={selectedId9}
              onLocationSelect={setSelectedId9}
              tileProvider="cyclOSM"
              defaultCenter={[37.7849, -122.4194]}
              defaultZoom={13}
            />
          </ExampleSection>

          <ExampleSection
            title="OpenTopoMap"
            description="Topographic map with contour lines and relief shading. Mimics official topo maps."
            code={`<Map
  locations={locations}
  tileProvider="openTopoMap"
/>`}
          >
            <CompactMap
              key="openTopoMap"
              locations={locations}
              selectedId={selectedId10}
              onLocationSelect={setSelectedId10}
              tileProvider="openTopoMap"
              defaultCenter={[37.7849, -122.4194]}
              defaultZoom={13}
            />
          </ExampleSection>

          <ExampleSection
            title="ÖPNVKarte"
            description="Public transport map with German focus. Shows transit routes, stops, and railways."
            code={`<Map
  locations={locations}
  tileProvider="opnvkarte"
/>`}
          >
            <CompactMap
              key="opnvkarte"
              locations={locations}
              selectedId={selectedId11}
              onLocationSelect={setSelectedId11}
              tileProvider="opnvkarte"
              defaultCenter={[37.7849, -122.4194]}
              defaultZoom={13}
            />
          </ExampleSection>
        </div>
      </section>

      {/* Additional Features Section */}
      <section
        style={{ paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}
      >
        <h2 style={{ marginBottom: '16px', fontSize: '28px', fontWeight: 600 }}>
          Premium Providers & Custom Configuration
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              padding: '20px',
              background: 'var(--color-surface-secondary)',
              borderRadius: '12px',
            }}
          >
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: 600 }}>
              Using Premium Providers (API Key Required)
            </h3>
            <p
              style={{
                margin: '0 0 16px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
              }}
            >
              Additional tile providers are available that require API keys. All offer generous free
              tiers:
            </p>
            <ul
              style={{
                margin: '0 0 16px',
                paddingLeft: '20px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.8,
              }}
            >
              <li>
                <strong>Stamen Design Maps</strong> (via Stadia Maps) -{' '}
                <a
                  href="https://client.stadiamaps.com/signup/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--blue-400)' }}
                >
                  Sign up at Stadia Maps
                </a>
                <br />
                <code>stamen-toner</code>, <code>stamen-terrain</code>,{' '}
                <code>stamen-watercolor</code>
              </li>
              <li>
                <strong>Geoapify</strong> -{' '}
                <a
                  href="https://www.geoapify.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--blue-400)' }}
                >
                  Sign up at Geoapify
                </a>
                <br />
                <code>geoapify-osm-bright-grey</code>, <code>geoapify-osm-bright-smooth</code>
              </li>
              <li>
                <strong>Thunderforest</strong> -{' '}
                <a
                  href="https://www.thunderforest.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--blue-400)' }}
                >
                  Sign up at Thunderforest
                </a>
                <br />
                <code>thunderforest-transport</code>, <code>thunderforest-landscape</code>
              </li>
            </ul>
            <CodeBlock
              code={`// Example: Using Stamen Watercolor with API key
<Map
  locations={locations}
  tileProvider="stamen-watercolor"
  tileApiKey={process.env.REACT_APP_STADIA_MAPS_KEY}
/>

// Example: Geoapify OSM Bright
<Map
  locations={locations}
  tileProvider="geoapify-osm-bright-grey"
  tileApiKey={process.env.REACT_APP_GEOAPIFY_KEY}
/>

// Example: Thunderforest Transport
<Map
  locations={locations}
  tileProvider="thunderforest-transport"
  tileApiKey={process.env.REACT_APP_THUNDERFOREST_KEY}
/>`}
            />
          </div>

          <div
            style={{
              padding: '20px',
              background: 'var(--color-surface-secondary)',
              borderRadius: '12px',
            }}
          >
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: 600 }}>
              Custom Tile Configuration
            </h3>
            <p
              style={{
                margin: '0 0 16px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
              }}
            >
              You can also provide a custom tile configuration object for complete control:
            </p>
            <CodeBlock
              code={`<Map
  locations={locations}
  tileProvider={{
    url: 'https://your-tiles.com/{z}/{x}/{y}.png',
    attribution: '© Your Company',
    maxZoom: 19,
    detectRetina: true,
    subdomains: ['a', 'b', 'c'],
  }}
/>`}
            />
          </div>

          <div
            style={{
              padding: '20px',
              background: 'var(--color-surface-secondary)',
              borderRadius: '12px',
            }}
          >
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: 600 }}>
              Retina/High-DPI Support
            </h3>
            <p
              style={{
                margin: 0,
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
              }}
            >
              All tile providers have <code>detectRetina: true</code> enabled by default. Leaflet
              automatically requests tiles at double zoom on high-DPI displays (like iPhone Retina)
              for sharper imagery.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
