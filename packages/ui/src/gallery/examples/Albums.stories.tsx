import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Album } from '../../components/Album';
import type { Album as AlbumType } from '../../components/Album/types';
import { PropsTable } from '../../tokens/PropsTable';
import { codeBlockStyles } from '../../components/storybook/codeBlockStyles';

// Dummy component for Storybook
const AlbumsExample = () => null;

const meta: Meta<typeof AlbumsExample> = {
  title: 'Gallery/Albums',
  component: AlbumsExample,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof AlbumsExample>;

// Sample album data with diverse, attractive images from Unsplash
const sampleAlbums: AlbumType[] = [
  {
    id: 'responsive-showcase',
    title: 'Responsive Design Showcase',
    cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    photos: [
      {
        id: 'landscape',
        title: 'Mountain Majesty (16:9)',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop',
        alt: 'Majestic mountain landscape in full resolution',
      },
      {
        id: 'portrait',
        title: 'Winter Portrait (2:3)',
        url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&h=1200&fit=crop',
        alt: 'Winter portrait in full resolution',
      },
      {
        id: 'square',
        title: 'Coffee Culture (1:1)',
        url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1000&h=1000&fit=crop',
        alt: 'Coffee cup on wooden table in full resolution',
      },
      {
        id: 'wide',
        title: 'Ocean Horizon (21:9)',
        url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=2100&h=900&fit=crop',
        alt: 'Wide ocean horizon photo in full resolution',
      },
      {
        id: 'standard',
        title: 'Golden Sunset (4:3)',
        url: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=1200&h=900&fit=crop',
        alt: 'Golden sunset over landscape in full resolution',
      },
    ],
  },
  {
    id: 'nature-wonders',
    title: 'Nature Wonders',
    cover: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    photos: [
      {
        id: 'n1',
        title: 'Forest Serenity',
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop',
        alt: 'Peaceful forest with natural light filtering through trees',
      },
      {
        id: 'n2',
        title: 'Alpine Peaks',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
        alt: 'Snow-covered mountain peaks reaching towards the sky',
      },
      {
        id: 'n3',
        title: 'Waterfall Magic',
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop',
        alt: 'Cascading waterfall surrounded by lush forest',
      },
      {
        id: 'n4',
        title: 'Northern Lights',
        url: 'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=1200&h=800&fit=crop',
        alt: 'Aurora borealis dancing across the night sky',
      },
    ],
  },
  {
    id: 'urban-exploration',
    title: 'Urban Exploration',
    cover: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    photos: [
      {
        id: 'u1',
        title: 'City Skyline',
        url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop',
        alt: 'Modern city skyline illuminated at dusk',
      },
      {
        id: 'u2',
        title: 'Street Art',
        url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=800&fit=crop',
        alt: 'Vibrant street art and colorful murals on city walls',
      },
      {
        id: 'u3',
        title: 'Neon Nights',
        url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=800&fit=crop',
        alt: 'Neon lights illuminating urban night streets',
      },
      {
        id: 'u4',
        title: 'Urban Architecture',
        url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=800&fit=crop',
        alt: 'Modern building architecture with geometric patterns',
      },
      {
        id: 'u5',
        title: 'Downtown Vibes',
        url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop',
        alt: 'Busy downtown street scene with urban energy',
      },
    ],
  },
  {
    id: 'travel-adventures',
    title: 'Travel Adventures',
    cover: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
    photos: [
      {
        id: 't1',
        title: 'Tropical Paradise',
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop',
        alt: 'Tropical beach with swaying palm trees and turquoise water',
      },
      {
        id: 't2',
        title: 'Desert Dunes',
        url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=800&fit=crop',
        alt: 'Golden sand dunes glowing at sunset',
      },
      {
        id: 't3',
        title: 'Ancient Temple',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
        alt: 'Historic temple architecture with intricate details',
      },
      {
        id: 't4',
        title: 'Island Escape',
        url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&h=800&fit=crop',
        alt: 'Serene island with crystal clear turquoise waters',
      },
    ],
  },
  {
    id: 'lifestyle-moments',
    title: 'Lifestyle Moments',
    cover: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=600&fit=crop',
    photos: [
      {
        id: 'l1',
        title: 'Morning Coffee',
        url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200&h=800&fit=crop',
        alt: 'Cozy morning coffee scene with natural window light',
      },
      {
        id: 'l2',
        title: 'Creative Workspace',
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop',
        alt: 'Modern creative workspace with plants and inspiration',
      },
      {
        id: 'l3',
        title: 'Fitness Journey',
        url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop',
        alt: 'Active lifestyle and outdoor fitness activities',
      },
      {
        id: 'l4',
        title: 'Cherished Moments',
        url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop',
        alt: 'Happy moments shared with loved ones',
      },
    ],
  },
];

// Albums component
const AlbumsComponent: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);

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
          📸 Photo Gallery - Albums
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: 'var(--color-text-secondary)',
            margin: 0,
            lineHeight: '1.6',
          }}
        >
          A complete photo gallery system with carousel navigation and fullscreen viewer. Browse
          albums, view photos in different aspect ratios, and see them beautifully displayed when
          opened in full screen. Perfect for portfolios, image collections, and social media
          integrations in your ChatGPT App.
        </p>
      </section>

      {/* Live Demo */}
      <section style={{ marginBottom: '64px' }}>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '24px',
            color: 'var(--color-text)',
          }}
        >
          Live Demo
        </h2>

        <div style={{ marginBottom: '24px' }}>
          <Album
            albums={sampleAlbums}
            selectedAlbum={selectedAlbum}
            onAlbumSelect={setSelectedAlbum}
            align="center"
            showNavigation
            flushStart
          />
        </div>

        <div
          style={{
            padding: '16px',
            background: 'var(--color-surface-secondary)',
            borderRadius: '8px',
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
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
            <li>Click any album card to browse photos in fullscreen</li>
            <li>Use arrow keys to navigate between photos</li>
            <li>Responsive design works on all devices</li>
            <li>Smooth carousel scrolling and transitions</li>
            <li>Loading, error, and empty states supported</li>
          </ul>
        </div>
      </section>

      {/* Data Structure Section */}
      <section style={{ marginBottom: '64px' }}>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '24px',
            color: 'var(--color-text)',
          }}
        >
          Data Structure
        </h2>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            marginBottom: '16px',
            lineHeight: '1.6',
          }}
        >
          Define your albums using this TypeScript interface. Each album contains metadata and an
          array of photos.
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
            {`interface Album {
  id: string;
  title: string;
  cover: string;
  photos: Photo[];
}

interface Photo {
  id: string;
  title?: string;
  url: string;
  alt?: string;
}

// Example:
const albums: Album[] = [
  {
    id: 'summer-2024',
    title: 'Summer Vacation',
    cover: 'https://example.com/cover.jpg',
    photos: [
      {
        id: 'photo-1',
        title: 'Beach Day',
        url: 'https://example.com/beach.jpg',
        alt: 'People enjoying the beach',
      },
      // ... more photos
    ],
  },
];`}
          </pre>
        </div>

        <div
          style={{
            background: 'var(--color-surface-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
          }}
        >
          <p style={{ margin: '0 0 12px 0' }}>
            <strong style={{ color: 'var(--color-text)' }}>💡 Pro Tip:</strong> Use the{' '}
            <code
              style={{
                background: 'var(--color-surface)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontFamily: 'monospace',
              }}
            >
              alt
            </code>{' '}
            field for accessibility and SEO. It describes the image for screen readers and search
            engines.
          </p>
        </div>
      </section>

      {/* Usage Section */}
      <section style={{ marginBottom: '64px' }}>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '24px',
            color: 'var(--color-text)',
          }}
        >
          Quick Start
        </h2>

        <div style={codeBlockStyles.primary}>
          <pre
            style={{
              margin: 0,
              color: 'var(--color-text)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {`import { Album } from '@ainativekit/ui';

// 1. Define your albums data
const albums = [
  {
    id: 'album-1',
    title: 'My Photos',
    cover: 'https://example.com/cover.jpg',
    photos: [
      {
        id: 'photo-1',
        title: 'Photo Title',
        url: 'https://example.com/photo.jpg',
        alt: 'Photo description',
      },
      // ... more photos
    ],
  },
];

// 2. Render the component
function MyGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <Album
      albums={albums}
      selectedAlbum={selected}
      onAlbumSelect={setSelected}
      align="center"
      showNavigation={true}
    />
  );
}`}
          </pre>
        </div>
      </section>

      {/* Component Props Section */}
      <section style={{ marginBottom: '48px' }}>
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

        <PropsTable
          hideThemeColumn
          rows={[
            {
              name: 'albums',
              description: 'Array of album objects to display (required)',
            },
            {
              name: 'onAlbumSelect',
              description: 'Callback when album is selected: (album: Album | null) => void',
            },
            {
              name: 'selectedAlbum',
              description: 'Currently selected album for controlled state (Album | null)',
            },
            {
              name: 'align',
              description: 'Carousel alignment: "start" | "center" (default: "center")',
            },
            {
              name: 'showNavigation',
              description: 'Show previous/next carousel buttons (default: true)',
            },
            {
              name: 'showEdgeGradients',
              description: 'Show fade effect at carousel edges (default: false)',
            },
            {
              name: 'initialPhotoIndex',
              description: 'Starting photo index in viewer (default: 0)',
            },
          ]}
        />
      </section>

      {/* Use Cases Section */}
      <section style={{ marginBottom: '48px' }}>
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
          }}
        >
          {[
            {
              emoji: '🖼️',
              title: 'Portfolio Showcase',
              desc: 'Display your design or photography portfolio with organized collections',
            },
            {
              emoji: '📱',
              title: 'Social Media Integration',
              desc: 'Embed Instagram, Flickr, or other photo feeds in your ChatGPT App',
            },
            {
              emoji: '🏢',
              title: 'Product Gallery',
              desc: 'Showcase product images, variations, and detailed views',
            },
            {
              emoji: '📸',
              title: 'Memory Archive',
              desc: 'Create organized albums for trips, events, or personal memories',
            },
          ].map((useCase) => (
            <div
              key={useCase.title}
              style={{
                background: 'var(--color-surface-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{useCase.emoji}</div>
              <h4
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                }}
              >
                {useCase.title}
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.5',
                }}
              >
                {useCase.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Components */}
      <section>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
            color: 'var(--color-text)',
          }}
        >
          Related Components
        </h2>

        <div
          style={{
            background: 'var(--color-surface-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '14px',
            lineHeight: '1.6',
            color: 'var(--color-text-secondary)',
          }}
        >
          <p style={{ margin: '0 0 12px 0' }}>
            The Album component is built from these core components:
          </p>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>
              <strong>AlbumCarousel</strong> - Horizontal carousel for browsing albums
            </li>
            <li>
              <strong>AlbumCard</strong> - Individual album preview card
            </li>
            <li>
              <strong>AlbumViewer</strong> - Fullscreen photo viewer with navigation
            </li>
            <li>
              <strong>Carousel</strong> - Base carousel component used internally
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

// Single comprehensive story
export const Albums: Story = {
  render: () => <AlbumsComponent />,
};
