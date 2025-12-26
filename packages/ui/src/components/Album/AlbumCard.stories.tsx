import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AlbumCard } from './AlbumCard';
import { PropsTable } from '../../tokens/PropsTable';
import type { Album } from './types';

const meta: Meta<typeof AlbumCard> = {
  title: 'Composed Components/Cards/Album Cards',
  component: AlbumCard,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// Sample albums
const SAMPLE_ALBUMS: Album[] = [
  {
    id: '1',
    title: 'Summer Vacation 2025',
    cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=544&q=80',
    photos: Array.from({ length: 24 }, (_, i) => ({
      id: `s${i}`,
      url: `https://images.unsplash.com/photo-150690${5900 + i}?w=800`,
      alt: `Summer photo ${i + 1}`,
    })),
  },
  {
    id: '2',
    title: 'City Architecture',
    cover: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=544&q=80',
    photos: Array.from({ length: 15 }, (_, i) => ({
      id: `c${i}`,
      url: `https://images.unsplash.com/photo-148640${6140 + i}?w=800`,
      alt: `City photo ${i + 1}`,
    })),
  },
  {
    id: '3',
    title: 'Nature & Wildlife',
    cover: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=544&q=80',
    photos: Array.from({ length: 8 }, (_, i) => ({
      id: `n${i}`,
      url: `https://images.unsplash.com/photo-144197${4230 + i}?w=800`,
      alt: `Nature photo ${i + 1}`,
    })),
  },
];

const EMPTY_ALBUM: Album = {
  id: '0',
  title: '',
  cover: '',
  photos: [],
};

const CARD_WIDTH = 272;

// Main unified showcase component
const AlbumCardShowcase: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '32px' }}>AlbumCard System</h1>

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
          Album cards display photo collections with a cover image, title, and photo count. Features
          loading, error, and empty states with badge support and multi-line text. Perfect for photo
          galleries, media libraries, and portfolio sections.
        </p>
      </section>

      {/* Basic Variations */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Basic Variations</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Standard album cards with different content
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <AlbumCard
            album={SAMPLE_ALBUMS[0]}
            onSelect={(album) => console.log('Selected:', album.title)}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <AlbumCard
            album={SAMPLE_ALBUMS[1]}
            onSelect={(album) => console.log('Selected:', album.title)}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <AlbumCard
            album={SAMPLE_ALBUMS[2]}
            onSelect={(album) => console.log('Selected:', album.title)}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
      </section>

      {/* With Badges */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Badge Support</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Add visual indicators with badges - supports variant, size, pill, and color props
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <AlbumCard
            album={SAMPLE_ALBUMS[0]}
            badge="New"
            badgeVariant="solid"
            badgeColor="info"
            badgePosition="top-left"
            onSelect={(album) => console.log('Selected:', album.title)}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <AlbumCard
            album={SAMPLE_ALBUMS[1]}
            badge={15}
            badgeVariant="solid"
            badgeColor="info"
            badgePill
            badgePosition="top-right"
            onSelect={(album) => console.log('Selected:', album.title)}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <AlbumCard
            album={SAMPLE_ALBUMS[2]}
            badge="Featured"
            badgeVariant="solid"
            badgeColor="success"
            badgePosition="top-right"
            onSelect={(album) => console.log('Selected:', album.title)}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
      </section>

      {/* Multi-line Text */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Multi-line Text Support</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Configurable line clamping for longer titles and subtitles
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <AlbumCard
            album={{
              ...SAMPLE_ALBUMS[0],
              title: 'Summer Vacation Road Trip Across America with Friends 2025',
            }}
            titleLines={2}
            onSelect={(album) => console.log('Selected:', album.title)}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <AlbumCard
            album={{
              ...SAMPLE_ALBUMS[1],
              title: 'Urban Architecture and City Life Photography Collection',
            }}
            titleLines={3}
            onSelect={(album) => console.log('Selected:', album.title)}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
      </section>

      {/* States Showcase */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>States Showcase</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Loading, error, and empty states with retry functionality
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {/* Loading */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                marginBottom: '12px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Loading
            </h3>
            <AlbumCard
              album={SAMPLE_ALBUMS[0]}
              loading={true}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
          </div>

          {/* Error */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                marginBottom: '12px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Error
            </h3>
            <AlbumCard
              album={SAMPLE_ALBUMS[0]}
              error={true}
              errorMessage="Failed to load album"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
          </div>

          {/* Empty */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                marginBottom: '12px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Empty
            </h3>
            <AlbumCard
              album={EMPTY_ALBUM}
              emptyTitle="No photos yet"
              emptyMessage="Add photos to get started"
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
          </div>
        </div>
      </section>

      {/* Performance Features */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Performance Features</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Lazy loading and image callbacks for optimal performance
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '14px',
                marginBottom: '12px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Eager Loading (Above-the-fold)
            </h3>
            <AlbumCard
              album={SAMPLE_ALBUMS[0]}
              imageLazy={false}
              onSelect={(album) => console.log('Selected:', album.title)}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
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
              With Image Callbacks
            </h3>
            <AlbumCard
              album={SAMPLE_ALBUMS[1]}
              onImageLoad={() => console.log('Cover image loaded')}
              onImageError={() => console.error('Cover image failed')}
              onSelect={(album) => console.log('Selected:', album.title)}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
            />
          </div>
        </div>
      </section>

      {/* Real-World Example */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Real-World Example</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Photo gallery with mixed features
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <AlbumCard
            album={SAMPLE_ALBUMS[0]}
            badge="New"
            badgeVariant="solid"
            onImageLoad={() => console.log('Image loaded')}
            onSelect={(album) => console.log('Opening album:', album.title)}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <AlbumCard
            album={SAMPLE_ALBUMS[1]}
            badge={15}
            badgeVariant="solid"
            titleLines={2}
            onSelect={(album) => console.log('Opening album:', album.title)}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
          <AlbumCard
            album={SAMPLE_ALBUMS[2]}
            onSelect={(album) => console.log('Opening album:', album.title)}
            style={{ maxWidth: `${CARD_WIDTH}px` }}
          />
        </div>
      </section>

      {/* Props Documentation */}
      <section style={{ marginBottom: '64px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Props</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Complete API reference for AlbumCard
          </p>
        </header>
        <PropsTable
          hideThemeColumn
          rows={[
            {
              name: 'album',
              description: 'Album data with id, title, cover, and photos array (Album type)',
            },
            {
              name: 'onSelect',
              description: 'Callback when card is clicked: (album: Album) => void',
            },
            {
              name: 'width',
              description: 'Card width - default: "272px"',
            },
            {
              name: 'loading',
              description: 'Show loading skeleton - default: false',
            },
            {
              name: 'error',
              description: 'Show error state - default: false',
            },
            {
              name: 'errorTitle',
              description: 'Error title text - default: "Album unavailable"',
            },
            {
              name: 'errorMessage',
              description: 'Error message text - default: "This album could not be loaded"',
            },
            {
              name: 'emptyTitle',
              description: 'Empty state title - default: "No album"',
            },
            {
              name: 'emptyMessage',
              description: 'Empty state message text',
            },
            {
              name: 'imageLazy',
              description: 'Enable lazy loading for cover image - default: true',
            },
            {
              name: 'onImageLoad',
              description: 'Callback when cover image loads: (event: SyntheticEvent) => void',
            },
            {
              name: 'onImageError',
              description: 'Callback when cover image fails: (event: SyntheticEvent) => void',
            },
            {
              name: 'badge',
              description: 'Badge content to display (string or number)',
            },
            {
              name: 'badgePosition',
              description: 'Badge position: "top-left" | "top-right" - default: "top-right"',
            },
            {
              name: 'badgeVariant',
              description: 'Badge style: "solid" | "soft" | "outline" - default: "soft"',
            },
            {
              name: 'badgeSize',
              description: 'Badge size: "sm" | "md" | "lg" - default: "sm"',
            },
            {
              name: 'badgePill',
              description: 'Badge pill shape (fully rounded) - default: true',
            },
            {
              name: 'badgeColor',
              description:
                'Badge color: "secondary" | "success" | "danger" | "warning" | "info" | "discovery" - default: "secondary"',
            },
            {
              name: 'titleLines',
              description: 'Number of lines for title: 1 | 2 | 3 - default: 1',
            },
            {
              name: 'subtitleLines',
              description: 'Number of lines for subtitle: 1 | 2 | 3 - default: 1',
            },
          ]}
        />
      </section>
    </div>
  );
};

// Export the unified story as the main showcase
export const AlbumCards: StoryObj = {
  render: () => <AlbumCardShowcase />,
};
