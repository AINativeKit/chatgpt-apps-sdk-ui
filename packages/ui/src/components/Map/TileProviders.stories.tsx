import { useState } from 'react';
import type { Meta } from '@storybook/react';
import { CompactMap, type CompactMapProps } from './CompactMap';
import type { LocationData } from './types';
import { StarFilled } from '@openai/apps-sdk-ui/components/Icon';

const CHATGPT_APP_HEIGHT = '400px';

const sampleLocations: LocationData[] = [
  {
    id: 'tonys-pizza',
    name: "Tony's Pizza Napoletana",
    subtitle: 'Neapolitan Pizzeria · North Beach',
    coords: [37.8001, -122.4098],
    description: 'Award-winning Neapolitan pies in North Beach.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
    features: [{ icon: <StarFilled />, label: '4.8' }, { label: '$$$' }],
  },
  {
    id: 'golden-boy',
    name: 'Golden Boy Pizza',
    subtitle: 'Focaccia Pizza · North Beach',
    coords: [37.799, -122.4093],
    description: 'Focaccia-style squares, late-night favorite.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
    features: [{ icon: <StarFilled />, label: '4.6' }, { label: '$' }],
  },
  {
    id: 'delfina',
    name: 'Pizzeria Delfina',
    subtitle: 'Thin-Crust Pizza · Mission District',
    coords: [37.7613, -122.4255],
    description: 'Thin-crust classics on 18th Street.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
    features: [{ icon: <StarFilled />, label: '4.5' }, { label: '$$' }],
  },
];

const meta: Meta<CompactMapProps> = {
  title: 'Composed Components/Maps/Tile Providers',
  component: CompactMap,
  tags: ['!dev'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    locations: { control: false },
    onLocationSelect: { control: false },
    onLocationActive: { control: false },
    onExpand: { control: false },
    carouselProps: { control: false },
    renderMarker: { control: false },
  },
};

export default meta;

// CARTO Light (Positron)
export const CartoLight = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  return (
    <CompactMap
      locations={sampleLocations}
      selectedId={selectedId}
      onLocationSelect={setSelectedId}
      tileProvider="carto-light"
      defaultCenter={[37.7849, -122.4194]}
      defaultZoom={13}
      height={CHATGPT_APP_HEIGHT}
    />
  );
};

CartoLight.parameters = {
  docs: {
    description: {
      story: 'Clean, minimal light theme from CARTO. Great for data visualization overlays.',
    },
    source: {
      code: `<CompactMap
  locations={locations}
  tileProvider="carto-light"
/>`,
    },
  },
};

// CARTO Dark (Dark Matter)
export const CartoDark = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  return (
    <CompactMap
      locations={sampleLocations}
      selectedId={selectedId}
      onLocationSelect={setSelectedId}
      tileProvider="carto-dark"
      defaultCenter={[37.7849, -122.4194]}
      defaultZoom={13}
      height={CHATGPT_APP_HEIGHT}
    />
  );
};

CartoDark.parameters = {
  docs: {
    description: {
      story:
        'Dark theme with black/gray background. Use the "Dark" toggle in Storybook toolbar to see full effect.',
    },
    source: {
      code: `<CompactMap
  locations={locations}
  tileProvider="carto-dark"
/>`,
    },
  },
};

// CARTO Voyager (default)
export const CartoVoyager = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  return (
    <CompactMap
      locations={sampleLocations}
      selectedId={selectedId}
      onLocationSelect={setSelectedId}
      tileProvider="carto-voyager"
      defaultCenter={[37.7849, -122.4194]}
      defaultZoom={13}
      height={CHATGPT_APP_HEIGHT}
    />
  );
};

CartoVoyager.parameters = {
  docs: {
    description: {
      story:
        'Colorful, detailed theme with subtle colors for parks, water, and roads. This is the default tile provider.',
    },
    source: {
      code: `<CompactMap
  locations={locations}
  tileProvider="carto-voyager"
/>`,
    },
  },
};

// OSM Standard
export const OsmStandard = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  return (
    <CompactMap
      locations={sampleLocations}
      selectedId={selectedId}
      onLocationSelect={setSelectedId}
      tileProvider="osm-standard"
      defaultCenter={[37.7849, -122.4194]}
      defaultZoom={13}
      height={CHATGPT_APP_HEIGHT}
    />
  );
};

OsmStandard.parameters = {
  docs: {
    description: {
      story:
        'The default OpenStreetMap style. Detailed multi-color street map showing broad range of features.',
    },
    source: {
      code: `<CompactMap
  locations={locations}
  tileProvider="osm-standard"
/>`,
    },
  },
};

// OSM Humanitarian (HOT)
export const OsmHumanitarian = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  return (
    <CompactMap
      locations={sampleLocations}
      selectedId={selectedId}
      onLocationSelect={setSelectedId}
      tileProvider="osm-humanitarian"
      defaultCenter={[37.7849, -122.4194]}
      defaultZoom={13}
      height={CHATGPT_APP_HEIGHT}
    />
  );
};

OsmHumanitarian.parameters = {
  docs: {
    description: {
      story:
        'Humanitarian OpenStreetMap Team style. Clearer differentiation useful for disaster mapping.',
    },
    source: {
      code: `<CompactMap
  locations={locations}
  tileProvider="osm-humanitarian"
/>`,
    },
  },
};

// CyclOSM
export const CyclOSM = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  return (
    <CompactMap
      locations={sampleLocations}
      selectedId={selectedId}
      onLocationSelect={setSelectedId}
      tileProvider="cyclOSM"
      defaultCenter={[37.7849, -122.4194]}
      defaultZoom={13}
      height={CHATGPT_APP_HEIGHT}
    />
  );
};

CyclOSM.parameters = {
  docs: {
    description: {
      story:
        'Cycling-focused map highlighting bike routes, lanes, and topography. Great for outdoor apps.',
    },
    source: {
      code: `<CompactMap
  locations={locations}
  tileProvider="cyclOSM"
/>`,
    },
  },
};

// OpenTopoMap
export const OpenTopoMap = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  return (
    <CompactMap
      locations={sampleLocations}
      selectedId={selectedId}
      onLocationSelect={setSelectedId}
      tileProvider="openTopoMap"
      defaultCenter={[37.7849, -122.4194]}
      defaultZoom={13}
      height={CHATGPT_APP_HEIGHT}
    />
  );
};

OpenTopoMap.parameters = {
  docs: {
    description: {
      story: 'Topographic map with contour lines and relief shading. Mimics official topo maps.',
    },
    source: {
      code: `<CompactMap
  locations={locations}
  tileProvider="openTopoMap"
/>`,
    },
  },
};

// ÖPNVKarte (Public Transport)
export const Opnvkarte = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  return (
    <CompactMap
      locations={sampleLocations}
      selectedId={selectedId}
      onLocationSelect={setSelectedId}
      tileProvider="opnvkarte"
      defaultCenter={[37.7849, -122.4194]}
      defaultZoom={13}
      height={CHATGPT_APP_HEIGHT}
    />
  );
};

Opnvkarte.parameters = {
  docs: {
    description: {
      story: 'Public transport map with German focus. Shows transit routes, stops, and railways.',
    },
    source: {
      code: `<CompactMap
  locations={locations}
  tileProvider="opnvkarte"
/>`,
    },
  },
};

// Custom Configuration
export const CustomConfig = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  return (
    <CompactMap
      locations={sampleLocations}
      selectedId={selectedId}
      onLocationSelect={setSelectedId}
      tileProvider={{
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 20,
        detectRetina: true,
        subdomains: ['a', 'b', 'c', 'd'],
      }}
      defaultCenter={[37.7849, -122.4194]}
      defaultZoom={13}
      height={CHATGPT_APP_HEIGHT}
    />
  );
};

CustomConfig.parameters = {
  docs: {
    description: {
      story: 'Use a custom tile configuration object for complete control over the tile source.',
    },
    source: {
      code: `<CompactMap
  locations={locations}
  tileProvider={{
    url: 'https://your-tiles.com/{z}/{x}/{y}.png',
    attribution: '© Your Company',
    maxZoom: 19,
    detectRetina: true,
    subdomains: ['a', 'b', 'c'],
  }}
/>`,
    },
  },
};

