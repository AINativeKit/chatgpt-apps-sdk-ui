import type { Meta } from '@storybook/react';
import { useState, type ReactNode } from 'react';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { Album, type AlbumProps } from './Album';
import { AlbumCarousel } from './AlbumCarousel';
import { AlbumViewer } from './AlbumViewer';
import type { Album as AlbumType } from './types';

// Wrapper for fullscreen viewer support in Canvas view
// Uses position: fixed when viewer is open to fill the Storybook canvas
const FullscreenStoryWrapper = ({
  children,
  isViewerOpen,
}: {
  children: ReactNode;
  isViewerOpen: boolean;
}) => {
  if (isViewerOpen) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          overflow: 'hidden',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        {children}
      </div>
    );
  }

  return <div style={{ padding: '16px' }}>{children}</div>;
};

// Sample album data
const sampleAlbums: AlbumType[] = [
  {
    id: 'mixed-ratios',
    title: 'Mixed Aspect Ratios',
    cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    photos: [
      {
        id: 'landscape',
        title: 'Landscape Photo (16:9)',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop',
        alt: 'Mountain landscape',
      },
      {
        id: 'portrait',
        title: 'Portrait Photo (2:3)',
        url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&h=1200&fit=crop',
        alt: 'Cat portrait',
      },
      {
        id: 'square',
        title: 'Square Photo (1:1)',
        url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1000&h=1000&fit=crop',
        alt: 'Coffee cup',
      },
    ],
  },
  {
    id: 'summer-escape',
    title: 'Summer Slice',
    cover: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
    photos: [
      {
        id: 's1',
        title: 'Waves',
        url: 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
        alt: 'Ocean waves',
      },
      {
        id: 's2',
        title: 'Palm trees',
        url: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
        alt: 'Tropical palm trees',
      },
    ],
  },
  {
    id: 'city-lights',
    title: 'Pepperoni Nights',
    cover: 'https://persistent.oaistatic.com/pizzaz/pizzaz-4.png',
    photos: [
      {
        id: 'c1',
        title: 'Downtown',
        url: 'https://persistent.oaistatic.com/pizzaz/pizzaz-5.png',
        alt: 'Downtown city view',
      },
      {
        id: 'c2',
        title: 'Neon',
        url: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
        alt: 'Neon lights',
      },
    ],
  },
  {
    id: 'into-the-woods',
    title: 'Truffle Forest',
    cover: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
    photos: [
      {
        id: 'n1',
        title: 'Forest path',
        url: 'https://persistent.oaistatic.com/pizzaz/pizzaz-6.png',
        alt: 'Path through the forest',
      },
    ],
  },
  {
    id: 'empty-album',
    title: 'Empty Album',
    cover: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
    photos: [],
  },
];

const meta: Meta<AlbumProps> = {
  title: 'Composed Components/Albums',
  component: Album,
  tags: ['!dev'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    albums: { description: 'Array of album data objects', control: false },
    onAlbumSelect: { description: 'Callback when album is selected or closed', control: false },
    selectedAlbum: { description: 'Currently selected album (controlled mode)', control: false },
    initialPhotoIndex: {
      description: 'Initial photo index when opening viewer',
      table: { defaultValue: { summary: '0' } },
    },
    cardWidth: {
      description: 'Width for each album card',
      table: { defaultValue: { summary: '272px' } },
    },
    loading: {
      description: 'Shows skeleton cards while loading',
      table: { defaultValue: { summary: 'false' } },
    },
    loadingCardCount: {
      description: 'Number of skeleton cards to show while loading',
      table: { defaultValue: { summary: '4' } },
    },
    error: {
      description: 'Shows error message when true',
      table: { defaultValue: { summary: 'false' } },
    },
    errorTitle: {
      description: 'Custom error title',
      table: { defaultValue: { summary: 'Failed to load albums' } },
    },
    emptyTitle: {
      description: 'Empty state title when no albums',
      table: { defaultValue: { summary: 'No albums yet' } },
    },
  },
};

export default meta;

// Base demo with viewer toggle
export const Base = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);

  return (
    <FullscreenStoryWrapper isViewerOpen={selectedAlbum !== null}>
      <Album
        albums={sampleAlbums}
        align="center"
        showNavigation
        selectedAlbum={selectedAlbum}
        onAlbumSelect={setSelectedAlbum}
      />
    </FullscreenStoryWrapper>
  );
};

Base.parameters = {
  layout: 'fullscreen',
  docs: {
    description: {
      story:
        'The Album component orchestrates AlbumCarousel and AlbumViewer. Click any album to open the fullscreen viewer. For best experience, view in Canvas mode.',
    },
    source: {
      code: `<Album albums={albums} />`,
    },
    story: {
      inline: false,
      iframeHeight: 500,
    },
  },
};

// Loading state
export const Loading = () => {
  return (
    <AlbumCarousel albums={[]} loading loadingCardCount={4} align="center" showNavigation />
  );
};

Loading.parameters = {
  docs: {
    description: {
      story: 'Show skeleton cards while albums are loading with `loading={true}`.',
    },
    source: {
      code: `<AlbumCarousel albums={[]} loading loadingCardCount={4} />`,
    },
  },
};

// Error state
export const Error = () => {
  return (
    <AlbumCarousel
      albums={[]}
      error
      errorTitle="Failed to load albums"
      errorMessage="Please check your connection and try again."
      onErrorRetry={() => alert('Retry clicked')}
      align="center"
      showNavigation
    />
  );
};

Error.parameters = {
  docs: {
    description: {
      story: 'Display an error state with `error={true}`. Include retry functionality with `onErrorRetry`.',
    },
    source: {
      code: `<AlbumCarousel
  albums={[]}
  error
  errorTitle="Failed to load albums"
  errorMessage="Please check your connection."
  onErrorRetry={() => refetch()}
/>`,
    },
  },
};

// Empty state
export const Empty = () => {
  return (
    <AlbumCarousel
      albums={[]}
      emptyTitle="No albums yet"
      emptyMessage="Create your first album to get started."
      align="center"
      showNavigation
    />
  );
};

Empty.parameters = {
  docs: {
    description: {
      story: 'Show an empty state when there are no albums.',
    },
    source: {
      code: `<AlbumCarousel
  albums={[]}
  emptyTitle="No albums yet"
  emptyMessage="Create your first album to get started."
/>`,
    },
  },
};

// Viewer standalone
export const ViewerStandalone = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: 200,
      }}
    >
      <Button color="secondary" onClick={() => setIsOpen(true)}>Open Viewer</Button>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--color-surface)',
            zIndex: 1000,
          }}
        >
          <AlbumViewer
            album={sampleAlbums[0]}
            initialPhotoIndex={0}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

ViewerStandalone.parameters = {
  layout: 'fullscreen',
  docs: {
    description: {
      story:
        'AlbumViewer can be used standalone for custom integrations. Supports keyboard navigation (arrow keys, ESC to close).',
    },
    source: {
      code: `<AlbumViewer
  album={album}
  initialPhotoIndex={0}
  onClose={() => setIsOpen(false)}
/>`,
    },
    story: {
      inline: false,
      iframeHeight: 500,
    },
  },
};

// Viewer empty state
export const ViewerEmptyState = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: 200,
      }}
    >
      <Button color="secondary" onClick={() => setIsOpen(true)}>Open Empty Album</Button>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--color-surface)',
            zIndex: 1000,
          }}
        >
          <AlbumViewer album={sampleAlbums[4]} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
};

ViewerEmptyState.parameters = {
  layout: 'fullscreen',
  docs: {
    description: {
      story: 'AlbumViewer shows a default empty state when the album has no photos.',
    },
    source: {
      code: `<AlbumViewer album={emptyAlbum} onClose={() => setIsOpen(false)} />`,
    },
    story: {
      inline: false,
      iframeHeight: 300,
    },
  },
};
