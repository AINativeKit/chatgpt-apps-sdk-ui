import type { Meta } from '@storybook/react';
import { Album } from './Album';
import { AlbumCarousel } from './AlbumCarousel';
import { AlbumViewer } from './AlbumViewer';
import type { Album as AlbumType } from './types';
import { PropsTable } from '../../tokens/PropsTable';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { useState } from 'react';

// Sample album data with varied aspect ratios
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
      {
        id: 'wide',
        title: 'Ultra Wide (21:9)',
        url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=2100&h=900&fit=crop',
        alt: 'Nature panorama',
      },
      {
        id: 'standard',
        title: 'Standard Photo (4:3)',
        url: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=1200&h=900&fit=crop',
        alt: 'Sunset',
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
      {
        id: 's3',
        title: 'Sunset',
        url: 'https://persistent.oaistatic.com/pizzaz/pizzaz-6.png',
        alt: 'Beautiful sunset',
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
      {
        id: 'c3',
        title: 'Streets',
        url: 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
        alt: 'City streets at night',
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
      {
        id: 'n2',
        title: 'Misty',
        url: 'https://persistent.oaistatic.com/pizzaz/pizzaz-4.png',
        alt: 'Misty forest scene',
      },
      {
        id: 'n3',
        title: 'Waterfall',
        url: 'https://persistent.oaistatic.com/pizzaz/pizzaz-5.png',
        alt: 'Forest waterfall',
      },
    ],
  },
  {
    id: 'pizza-tour',
    title: 'Pizza Tour',
    cover: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
    photos: [
      {
        id: 'tonys-pizza-napoletana',
        title: "Tony's Pizza Napoletana",
        url: 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
      },
      {
        id: 'golden-boy-pizza',
        title: 'Golden Boy Pizza',
        url: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
      },
      {
        id: 'pizzeria-delfina-mission',
        title: 'Pizzeria Delfina (Mission)',
        url: 'https://persistent.oaistatic.com/pizzaz/pizzaz-6.png',
      },
      {
        id: 'ragazza',
        title: 'Ragazza',
        url: 'https://persistent.oaistatic.com/pizzaz/pizzaz-4.png',
      },
      {
        id: 'del-popolo',
        title: 'Del Popolo',
        url: 'https://persistent.oaistatic.com/pizzaz/pizzaz-5.png',
      },
      {
        id: 'square-pie-guys',
        title: 'Square Pie Guys',
        url: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
      },
      {
        id: 'zero-zero',
        title: 'Zero Zero',
        url: 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
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

const meta: Meta<typeof Album> = {
  title: 'Composed Components/Albums',
  component: Album,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// Unified Album System Documentation
const AlbumSystemComponent: React.FC = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);
  const [showViewer, setShowViewer] = useState(false);
  const [viewerAlbum, setViewerAlbum] = useState<AlbumType | null>(null);
  const [showEmptyDefault, setShowEmptyDefault] = useState(false);
  const [showEmptyCustom, setShowEmptyCustom] = useState(false);
  const [showEmptyHidden, setShowEmptyHidden] = useState(false);

  return (
    <div style={{ padding: '24px', maxWidth: '100%' }}>
      <h1 style={{ marginBottom: '32px' }}>Album System</h1>

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
          A comprehensive photo album system with carousel navigation, fullscreen viewer, and
          sophisticated state management. Perfect for photo galleries, media libraries, and
          portfolio showcases. Includes loading, error, and empty states with smooth transitions and
          keyboard navigation.
        </p>
      </section>

      {/* Album Carousel - Basic Examples */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Album Carousel</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Horizontal carousel of album cards with different alignments and navigation options
          </p>
        </header>

        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              marginBottom: '12px',
              color: 'var(--color-text-secondary)',
            }}
          >
            Center Aligned with Navigation
          </h3>
          <AlbumCarousel
            albums={sampleAlbums}
            onAlbumSelect={(album) => console.log('Selected:', album.title)}
            align="center"
            showNavigation={true}
            showEdgeGradients={true}
          />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              marginBottom: '12px',
              color: 'var(--color-text-secondary)',
            }}
          >
            Start Aligned
          </h3>
          <AlbumCarousel
            albums={sampleAlbums}
            onAlbumSelect={(album) => console.log('Selected:', album.title)}
            align="start"
            showNavigation={true}
          />
        </div>

        <div>
          <h3
            style={{
              fontSize: '14px',
              marginBottom: '12px',
              color: 'var(--color-text-secondary)',
            }}
          >
            Without Navigation
          </h3>
          <AlbumCarousel
            albums={sampleAlbums}
            onAlbumSelect={(album) => console.log('Selected:', album.title)}
            showNavigation={false}
            showEdgeGradients={true}
          />
        </div>
      </section>

      {/* Carousel State Management */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Carousel State Management</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Loading, error, and empty states for the carousel with retry functionality
          </p>
        </header>

        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              marginBottom: '12px',
              color: 'var(--color-text-secondary)',
            }}
          >
            Loading State (4 Skeleton Cards)
          </h3>
          <AlbumCarousel
            albums={[]}
            loading={true}
            loadingCardCount={4}
            align="center"
            showNavigation={true}
          />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              marginBottom: '12px',
              color: 'var(--color-text-secondary)',
            }}
          >
            Error State
          </h3>
          <AlbumCarousel
            albums={[]}
            error={true}
            errorTitle="Failed to load albums"
            errorMessage="Unable to retrieve album data. Please check your connection."
            align="center"
            showNavigation={true}
          />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              marginBottom: '12px',
              color: 'var(--color-text-secondary)',
            }}
          >
            Error State with Retry ({retryCount} attempts)
          </h3>
          <AlbumCarousel
            albums={[]}
            error={true}
            errorTitle="Connection Error"
            errorMessage="Failed to load albums. Please try again."
            onErrorRetry={() => {
              setRetryCount(retryCount + 1);
              console.log('Retry clicked, count:', retryCount + 1);
            }}
            align="center"
            showNavigation={true}
          />
        </div>

        <div>
          <h3
            style={{
              fontSize: '14px',
              marginBottom: '12px',
              color: 'var(--color-text-secondary)',
            }}
          >
            Empty State
          </h3>
          <AlbumCarousel
            albums={[]}
            emptyTitle="No albums yet"
            emptyMessage="Create your first album to get started"
            align="center"
            showNavigation={true}
          />
        </div>
      </section>

      {/* Album with Viewer - Full System */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Album with Viewer (Full System)</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Complete Album component with carousel and fullscreen viewer - click any album to open
          </p>
        </header>

        <Album
          albums={sampleAlbums}
          onAlbumSelect={(album) => console.log('Opening album:', album?.title)}
          align="center"
          showNavigation={true}
          showEdgeGradients={true}
        />
      </section>

      {/* Controlled State */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Controlled State Example</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            External control of album selection with state management
          </p>
        </header>

        <div
          style={{
            marginBottom: '16px',
            padding: '16px',
            backgroundColor: 'var(--color-surface-secondary)',
            borderRadius: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <strong>Selected Album:</strong>
            <span>{selectedAlbum?.title || 'None'}</span>
            <Button color="secondary" variant="outline" onClick={() => setSelectedAlbum(null)}>
              Reset Selection
            </Button>
          </div>
        </div>

        <Album
          albums={sampleAlbums}
          selectedAlbum={selectedAlbum}
          onAlbumSelect={setSelectedAlbum}
          align="center"
          showNavigation={true}
        />
      </section>

      {/* Album Viewer - Standalone */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Album Viewer (Standalone)</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Fullscreen photo viewer with navigation and keyboard controls
          </p>
        </header>

        <div style={{ marginBottom: '16px' }}>
          <Button
            color="primary"
            onClick={() => {
              setViewerAlbum(sampleAlbums[0]);
              setShowViewer(true);
            }}
          >
            Open Album Viewer (3 photos)
          </Button>{' '}
          <Button
            color="secondary"
            variant="outline"
            onClick={() => {
              setViewerAlbum(sampleAlbums[4]);
              setShowViewer(true);
            }}
          >
            Open Pizza Tour (7 photos)
          </Button>
        </div>

        {showViewer && viewerAlbum && (
          <AlbumViewer
            album={viewerAlbum}
            initialPhotoIndex={0}
            onClose={() => {
              setShowViewer(false);
              setViewerAlbum(null);
            }}
          />
        )}

        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface-secondary)',
            borderRadius: '8px',
            marginTop: '16px',
          }}
        >
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            <strong>Viewer Features:</strong> Arrow key navigation, ESC to close, photo counter,
            responsive layouts, smooth transitions, Embla carousel for touch/swipe navigation
          </p>
        </div>
      </section>

      {/* Responsive Behavior */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Responsive Behavior</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            AlbumViewer adapts to different screen sizes with three breakpoints
          </p>
        </header>

        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface-secondary)',
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        >
          <h3 style={{ fontSize: '14px', marginTop: 0, marginBottom: '12px' }}>
            Mobile (&lt; 640px)
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: '20px',
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
            }}
          >
            <li>No thumbnail sidebar</li>
            <li>Touch-enabled swipe navigation</li>
            <li>Prev/Next navigation buttons visible</li>
            <li>Minimal padding (8px horizontal, 8px vertical)</li>
            <li>Photo counter centered at bottom</li>
          </ul>
        </div>

        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface-secondary)',
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        >
          <h3 style={{ fontSize: '14px', marginTop: 0, marginBottom: '12px' }}>Tablet (≥ 640px)</h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: '20px',
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
            }}
          >
            <li>Thumbnail sidebar appears (160px width)</li>
            <li>Thumbnails centered vertically in sidebar</li>
            <li>Navigation buttons hidden (sidebar provides navigation)</li>
            <li>Increased padding (16px horizontal, 16px vertical)</li>
            <li>Photo counter offset to center over photo area</li>
            <li>Embla carousel synchronization between main view and thumbnails</li>
          </ul>
        </div>

        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface-secondary)',
            borderRadius: '8px',
          }}
        >
          <h3 style={{ fontSize: '14px', marginTop: 0, marginBottom: '12px' }}>
            Desktop-wide (≥ 1024px)
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: '20px',
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
            }}
          >
            <li>All tablet features maintained</li>
            <li>Maximum padding for optimal viewing (24px horizontal, 24px vertical)</li>
            <li>Generous breathing room around photos</li>
          </ul>
        </div>

        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface-tertiary)',
            borderRadius: '8px',
            marginTop: '16px',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              fontStyle: 'italic',
            }}
          >
            <strong>Note:</strong> All breakpoints use CSS custom properties from the design system
            (--breakpoint-tablet: 640px, --breakpoint-desktop-wide: 1024px)
          </p>
        </div>
      </section>

      {/* AlbumViewer Empty States */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>AlbumViewer Empty States</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Handling albums with no photos using default, custom, or hidden empty states
          </p>
        </header>

        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              marginBottom: '12px',
              color: 'var(--color-text-secondary)',
            }}
          >
            Default Empty State
          </h3>
          <p
            style={{
              fontSize: '14px',
              marginBottom: '12px',
              color: 'var(--color-text-secondary)',
            }}
          >
            Shows default "No photos available" message with close button
          </p>
          <Button color="primary" variant="solid" onClick={() => setShowEmptyDefault(true)}>
            Open Empty Album (Default)
          </Button>
          {showEmptyDefault && (
            <AlbumViewer album={sampleAlbums[5]} onClose={() => setShowEmptyDefault(false)} />
          )}
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              marginBottom: '12px',
              color: 'var(--color-text-secondary)',
            }}
          >
            Custom Empty State Content
          </h3>
          <p
            style={{
              fontSize: '14px',
              marginBottom: '12px',
              color: 'var(--color-text-secondary)',
            }}
          >
            Provide custom UI via emptyStateContent prop
          </p>
          <Button color="secondary" variant="outline" onClick={() => setShowEmptyCustom(true)}>
            Open Empty Album (Custom)
          </Button>
          {showEmptyCustom && (
            <AlbumViewer
              album={sampleAlbums[5]}
              onClose={() => setShowEmptyCustom(false)}
              emptyStateContent={
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '48px',
                    }}
                  >
                    📸
                  </div>
                  <h3 style={{ margin: 0, fontSize: '20px' }}>No Photos Yet</h3>
                  <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                    This album is waiting for its first photo
                  </p>
                  <Button color="primary" onClick={() => setShowEmptyCustom(false)}>
                    Close Viewer
                  </Button>
                </div>
              }
            />
          )}
        </div>

        <div>
          <h3
            style={{
              fontSize: '14px',
              marginBottom: '12px',
              color: 'var(--color-text-secondary)',
            }}
          >
            Hide When Empty
          </h3>
          <p
            style={{
              fontSize: '14px',
              marginBottom: '12px',
              color: 'var(--color-text-secondary)',
            }}
          >
            Returns null when album has no photos (hideWhenEmpty=true)
          </p>
          <Button color="secondary" variant="outline" onClick={() => setShowEmptyHidden(true)}>
            Try Opening Empty Album (Hidden)
          </Button>
          <p
            style={{
              fontSize: '12px',
              marginTop: '8px',
              color: 'var(--color-text-secondary)',
              fontStyle: 'italic',
            }}
          >
            Note: Nothing will appear because the viewer returns null when empty
          </p>
          {showEmptyHidden && (
            <AlbumViewer
              album={sampleAlbums[5]}
              onClose={() => setShowEmptyHidden(false)}
              hideWhenEmpty={true}
            />
          )}
        </div>
      </section>

      {/* Props Documentation */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Album Props</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Main Album component props (includes all AlbumCarousel props)
          </p>
        </header>
        <PropsTable
          hideThemeColumn
          rows={[
            {
              name: 'albums',
              description:
                'Array of album objects with id, title, cover, and photos. Type: Album[] (required)',
            },
            {
              name: 'onAlbumSelect',
              description: 'Callback when album is selected: (album: Album | null) => void',
            },
            {
              name: 'selectedAlbum',
              description: 'Currently selected album for controlled state. Type: Album | null',
            },
            {
              name: 'initialPhotoIndex',
              description: 'Starting photo index in viewer - default: 0',
            },
          ]}
        />
      </section>

      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>AlbumCarousel Props</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Carousel-specific props including state management
          </p>
        </header>
        <PropsTable
          hideThemeColumn
          rows={[
            {
              name: 'albums',
              description: 'Array of albums to display. Type: Album[] (required)',
            },
            {
              name: 'onAlbumSelect',
              description: 'Callback when album card is clicked: (album: Album) => void',
            },
            {
              name: 'cardWidth',
              description: 'Width for each album card - default: "272px"',
            },
            {
              name: 'loading',
              description: 'Show loading skeleton cards - default: false',
            },
            {
              name: 'loadingCardCount',
              description: 'Number of skeleton cards while loading - default: 4',
            },
            {
              name: 'error',
              description: 'Show error state - default: false',
            },
            {
              name: 'errorTitle',
              description: 'Error title text - default: "Failed to load albums"',
            },
            {
              name: 'errorMessage',
              description: 'Error message text',
            },
            {
              name: 'onErrorRetry',
              description: 'Retry callback for error state: () => void',
            },
            {
              name: 'emptyTitle',
              description: 'Empty state title - default: "No albums yet"',
            },
            {
              name: 'emptyMessage',
              description: 'Empty state message text',
            },
            {
              name: 'align',
              description: 'Carousel alignment: "start" | "center" - default: "center"',
            },
            {
              name: 'showNavigation',
              description: 'Show navigation arrows - default: true',
            },
            {
              name: 'showEdgeGradients',
              description: 'Show edge fade gradients - default: false',
            },
          ]}
        />
      </section>

      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>AlbumViewer Props</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Fullscreen photo viewer props including empty state handling
          </p>
        </header>
        <PropsTable
          hideThemeColumn
          rows={[
            {
              name: 'album',
              description: 'Album object to display. Type: Album (required)',
            },
            {
              name: 'initialPhotoIndex',
              description: 'Initial photo index to display - default: 0',
            },
            {
              name: 'onClose',
              description: 'Callback when viewer is closed: () => void',
            },
            {
              name: 'className',
              description: 'Additional CSS class name for the viewer',
            },
            {
              name: 'emptyStateContent',
              description:
                'Custom content to display when album has no photos. If not provided, shows default empty state with message and close button. Type: React.ReactNode',
            },
            {
              name: 'hideWhenEmpty',
              description:
                'Hide the viewer completely when album has no photos. When true, returns null instead of showing empty state - default: false',
            },
          ]}
        />
      </section>

      {/* Related Components */}
      <section>
        <header style={{ marginBottom: '16px' }}>
          <h2 style={{ marginBottom: '8px' }}>Related Components</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            For detailed <strong>AlbumCard</strong> documentation including badges, multi-line text,
            loading/error/empty states, and image controls, see the <strong>AlbumCard</strong> story
            in the sidebar.
          </p>
        </header>
      </section>
    </div>
  );
};

// Single unified story (like List)
export const Albums = () => <AlbumSystemComponent />;
