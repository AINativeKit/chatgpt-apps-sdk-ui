import type { Meta } from '@storybook/react';
import { AlbumCard, type AlbumCardProps } from './AlbumCard';
import type { Album } from './types';

const meta: Meta<AlbumCardProps> = {
  title: 'Composed Components/Cards/AlbumCard',
  component: AlbumCard,
  tags: ['!dev'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    album: {
      description: 'Album data object with photos',
      control: false,
      table: { type: { summary: 'Album' } },
    },
    onSelect: {
      description: 'Callback when album is clicked',
      control: false,
      table: { type: { summary: '(album: Album) => void' } },
    },
    onImageLoad: {
      description: 'Callback when cover image loads',
      control: false,
      table: { type: { summary: '() => void' } },
    },
    onImageError: {
      description: 'Callback when cover image fails to load',
      control: false,
      table: { type: { summary: '() => void' } },
    },
    width: {
      description: 'Card width',
      table: { type: { summary: 'number | string' }, defaultValue: { summary: '272px' } },
    },
    loading: {
      description: 'Shows skeleton placeholder',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    error: {
      description: 'Shows error message when true',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    errorTitle: {
      description: 'Custom error title',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Album unavailable' } },
    },
    errorMessage: {
      description: 'Custom error message',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'This album could not be loaded' } },
    },
    emptyTitle: {
      description: 'Empty state title',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'No album' } },
    },
    imageLoading: {
      description: 'Image loading strategy',
      table: { type: { summary: "'eager' | 'lazy'" }, defaultValue: { summary: 'lazy' } },
    },
    badgePosition: {
      description: 'Badge position on the image',
      table: { type: { summary: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'" }, defaultValue: { summary: 'top-right' } },
    },
    badgeVariant: {
      description: 'Badge visual style',
      table: { type: { summary: "'solid' | 'soft'" }, defaultValue: { summary: 'soft' } },
    },
    badgeSize: {
      description: 'Badge size',
      table: { type: { summary: "'sm' | 'md' | 'lg'" }, defaultValue: { summary: 'sm' } },
    },
    badgePill: {
      description: 'Use pill-shaped badge',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    badgeColor: {
      description: 'Badge color variant',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'secondary' } },
    },
    titleLines: {
      description: 'Max lines for title (1-3)',
      table: { type: { summary: '1 | 2 | 3' }, defaultValue: { summary: '1' } },
    },
    subtitleLines: {
      description: 'Max lines for subtitle (1-3)',
      table: { type: { summary: '1 | 2 | 3' }, defaultValue: { summary: '1' } },
    },
  },
} satisfies Meta<typeof AlbumCard>;

export default meta;

// Sample albums for stories
const SAMPLE_ALBUM: Album = {
  id: '1',
  title: 'Summer Vacation 2025',
  cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=544&q=80',
  photos: Array.from({ length: 24 }, (_, i) => ({
    id: `s${i}`,
    url: `https://images.unsplash.com/photo-150690${5900 + i}?w=800`,
    alt: `Summer photo ${i + 1}`,
  })),
};

const SAMPLE_ALBUM_2: Album = {
  id: '2',
  title: 'City Architecture',
  cover: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=544&q=80',
  photos: Array.from({ length: 15 }, (_, i) => ({
    id: `c${i}`,
    url: `https://images.unsplash.com/photo-148640${6140 + i}?w=800`,
    alt: `City photo ${i + 1}`,
  })),
};

const SAMPLE_ALBUM_3: Album = {
  id: '3',
  title: 'Nature & Wildlife',
  cover: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=544&q=80',
  photos: Array.from({ length: 8 }, (_, i) => ({
    id: `n${i}`,
    url: `https://images.unsplash.com/photo-144197${4230 + i}?w=800`,
    alt: `Nature photo ${i + 1}`,
  })),
};

const EMPTY_ALBUM: Album = {
  id: '0',
  title: '',
  cover: '',
  photos: [],
};

// Base story
export const Base = (args: AlbumCardProps) => <AlbumCard {...args} />;

Base.args = {
  album: SAMPLE_ALBUM,
  onSelect: (album: Album) => console.log('Selected:', album.title),
};

// Multiple albums grid
export const AlbumGrid = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <AlbumCard album={SAMPLE_ALBUM} onSelect={(album) => console.log('Selected:', album.title)} />
    <AlbumCard album={SAMPLE_ALBUM_2} onSelect={(album) => console.log('Selected:', album.title)} />
    <AlbumCard album={SAMPLE_ALBUM_3} onSelect={(album) => console.log('Selected:', album.title)} />
  </div>
);

AlbumGrid.parameters = {
  docs: {
    source: {
      code: `<AlbumCard
  album={{
    id: '1',
    title: 'Summer Vacation 2025',
    cover: 'https://example.com/cover.jpg',
    photos: [...],
  }}
  onSelect={(album) => console.log('Selected:', album.title)}
/>`,
    },
  },
};

// Badge variants
export const WithBadge = (args: AlbumCardProps) => <AlbumCard {...args} />;

WithBadge.args = {
  album: SAMPLE_ALBUM,
  badge: 'New',
  badgeVariant: 'solid',
  badgeColor: 'info',
  onSelect: (album: Album) => console.log('Selected:', album.title),
};

WithBadge.parameters = {
  docs: {
    source: {
      code: `<AlbumCard
  album={album}
  badge="New"
  badgeVariant="solid"
  badgeColor="info"
  onSelect={(album) => console.log('Selected:', album.title)}
/>`,
    },
  },
};

// Badge positions and styles
export const BadgeVariants = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <AlbumCard
      album={SAMPLE_ALBUM}
      badge="New"
      badgeVariant="solid"
      badgeColor="info"
      badgePosition="top-left"
      onSelect={(album) => console.log('Selected:', album.title)}
    />
    <AlbumCard
      album={SAMPLE_ALBUM_2}
      badge={15}
      badgeVariant="solid"
      badgeColor="info"
      badgePill
      badgePosition="top-right"
      onSelect={(album) => console.log('Selected:', album.title)}
    />
    <AlbumCard
      album={SAMPLE_ALBUM_3}
      badge="Featured"
      badgeVariant="solid"
      badgeColor="success"
      badgePosition="top-right"
      onSelect={(album) => console.log('Selected:', album.title)}
    />
  </div>
);

BadgeVariants.parameters = {
  docs: {
    source: {
      code: `// Text badge, top-left
<AlbumCard
  album={album}
  badge="New"
  badgeVariant="solid"
  badgeColor="info"
  badgePosition="top-left"
/>

// Numeric badge with pill shape
<AlbumCard
  album={album}
  badge={15}
  badgeVariant="solid"
  badgeColor="info"
  badgePill
/>

// Featured badge
<AlbumCard
  album={album}
  badge="Featured"
  badgeVariant="solid"
  badgeColor="success"
/>`,
    },
  },
};

// Multi-line text
export const MultiLineText = () => (
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
        ...SAMPLE_ALBUM,
        title: 'Summer Vacation Road Trip Across America with Friends 2025',
      }}
      titleLines={2}
      onSelect={(album) => console.log('Selected:', album.title)}
    />
    <AlbumCard
      album={{
        ...SAMPLE_ALBUM_2,
        title: 'Urban Architecture and City Life Photography Collection',
      }}
      titleLines={3}
      onSelect={(album) => console.log('Selected:', album.title)}
    />
  </div>
);

MultiLineText.parameters = {
  docs: {
    source: {
      code: `// 2-line title
<AlbumCard
  album={{ ...album, title: 'Summer Vacation Road Trip Across America with Friends 2025' }}
  titleLines={2}
/>

// 3-line title
<AlbumCard
  album={{ ...album, title: 'Urban Architecture and City Life Photography Collection' }}
  titleLines={3}
/>`,
    },
  },
};

// Loading state
export const Loading = (args: AlbumCardProps) => <AlbumCard {...args} />;

Loading.args = {
  album: SAMPLE_ALBUM,
  loading: true,
};

Loading.parameters = {
  docs: {
    source: {
      code: `<AlbumCard album={album} loading />`,
    },
  },
};

// Error state
export const Error = (args: AlbumCardProps) => <AlbumCard {...args} />;

Error.args = {
  album: SAMPLE_ALBUM,
  error: true,
  errorMessage: 'Failed to load album',
};

Error.parameters = {
  docs: {
    source: {
      code: `<AlbumCard
  album={album}
  error
  errorMessage="Failed to load album"
/>`,
    },
  },
};

// Empty state
export const Empty = (args: AlbumCardProps) => <AlbumCard {...args} />;

Empty.args = {
  album: EMPTY_ALBUM,
  emptyTitle: 'No photos yet',
  emptyMessage: 'Add photos to get started',
};

Empty.parameters = {
  docs: {
    source: {
      code: `<AlbumCard
  album={{ id: '0', title: '', cover: '', photos: [] }}
  emptyTitle="No photos yet"
  emptyMessage="Add photos to get started"
/>`,
    },
  },
};

// All states showcase
export const States = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <div>
      <div
        style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}
      >
        Loading
      </div>
      <AlbumCard album={SAMPLE_ALBUM} loading />
    </div>
    <div>
      <div
        style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}
      >
        Error
      </div>
      <AlbumCard album={SAMPLE_ALBUM} error errorMessage="Failed to load album" />
    </div>
    <div>
      <div
        style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}
      >
        Empty
      </div>
      <AlbumCard album={EMPTY_ALBUM} emptyTitle="No photos yet" emptyMessage="Add photos to get started" />
    </div>
  </div>
);

States.parameters = {
  docs: {
    source: {
      code: `// Loading state
<AlbumCard album={album} loading />

// Error state
<AlbumCard album={album} error errorMessage="Failed to load album" />

// Empty state
<AlbumCard
  album={{ id: '0', title: '', cover: '', photos: [] }}
  emptyTitle="No photos yet"
  emptyMessage="Add photos to get started"
/>`,
    },
  },
};

// Eager loading for above-the-fold
export const EagerLoading = (args: AlbumCardProps) => <AlbumCard {...args} />;

EagerLoading.args = {
  album: SAMPLE_ALBUM,
  imageLoading: 'eager',
  onSelect: (album: Album) => console.log('Selected:', album.title),
};

EagerLoading.parameters = {
  docs: {
    source: {
      code: `<AlbumCard
  album={album}
  imageLoading="eager"
  onSelect={(album) => console.log('Selected:', album.title)}
/>`,
    },
  },
};

// Image callbacks
export const WithImageCallbacks = (args: AlbumCardProps) => <AlbumCard {...args} />;

WithImageCallbacks.args = {
  album: SAMPLE_ALBUM_2,
  onImageLoad: () => console.log('Cover image loaded'),
  onImageError: () => console.error('Cover image failed'),
  onSelect: (album: Album) => console.log('Selected:', album.title),
};

WithImageCallbacks.parameters = {
  docs: {
    source: {
      code: `<AlbumCard
  album={album}
  onImageLoad={() => console.log('Cover image loaded')}
  onImageError={() => console.error('Cover image failed')}
  onSelect={(album) => console.log('Selected:', album.title)}
/>`,
    },
  },
};

// Performance features showcase
export const Performance = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <div>
      <div
        style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}
      >
        Eager Loading (Above-the-fold)
      </div>
      <AlbumCard
        album={SAMPLE_ALBUM}
        imageLoading="eager"
        onSelect={(album) => console.log('Selected:', album.title)}
      />
    </div>
    <div>
      <div
        style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}
      >
        With Image Callbacks
      </div>
      <AlbumCard
        album={SAMPLE_ALBUM_2}
        onImageLoad={() => console.log('Cover image loaded')}
        onImageError={() => console.error('Cover image failed')}
        onSelect={(album) => console.log('Selected:', album.title)}
      />
    </div>
  </div>
);

Performance.parameters = {
  docs: {
    source: {
      code: `// Eager loading for above-the-fold images
<AlbumCard
  album={album}
  imageLoading="eager"
/>

// Track image load/error events
<AlbumCard
  album={album}
  onImageLoad={() => console.log('Cover image loaded')}
  onImageError={() => console.error('Cover image failed')}
/>`,
    },
  },
};

// Real-world example
export const RealWorld = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <AlbumCard
      album={SAMPLE_ALBUM}
      badge="New"
      badgeVariant="solid"
      onImageLoad={() => console.log('Image loaded')}
      onSelect={(album) => console.log('Opening album:', album.title)}
    />
    <AlbumCard
      album={SAMPLE_ALBUM_2}
      badge={15}
      badgeVariant="solid"
      titleLines={2}
      onSelect={(album) => console.log('Opening album:', album.title)}
    />
    <AlbumCard
      album={SAMPLE_ALBUM_3}
      onSelect={(album) => console.log('Opening album:', album.title)}
    />
  </div>
);

RealWorld.parameters = {
  docs: {
    source: {
      code: `<AlbumCard
  album={album}
  badge="New"
  badgeVariant="solid"
  onImageLoad={() => console.log('Image loaded')}
  onSelect={(album) => console.log('Opening album:', album.title)}
/>`,
    },
  },
};
