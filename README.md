# 🧩 AINativeKit UI - ChatGPT Apps SDK Extension

**Production-ready pattern components for ChatGPT Apps**

100% compatible with [@openai/apps-sdk-ui](https://github.com/openai/apps-sdk-ui). Use their primitives + our patterns = ship faster.

[![npm version](https://img.shields.io/npm/v/@ainativekit/ui.svg)](https://www.npmjs.com/package/@ainativekit/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Storybook](https://img.shields.io/badge/Storybook-%23FF4785.svg?logo=storybook&logoColor=white)](https://www.ainativekit.com)

<p>
  <b><a href="https://www.ainativekit.com">Live Storybook</a></b> ·
  <b><a href="#quick-start">Quick Start</a></b> ·
  <b><a href="#components">Components</a></b>
</p>

## Why @ainativekit/ui?

| Without this library | With @ainativekit/ui |
|---------------------|----------------------|
| Build card layouts from scratch | `<SummaryCard {...data} />` |
| Wire up carousels manually | `<Carousel>{items}</Carousel>` |
| Create map components yourself | `<CompactMap locations={...} />` |
| Write ChatGPT integration hooks | `useTheme()`, `useDisplayMode()`, `useWidgetState()` |

**Fully compatible** with apps-sdk-ui - use their 700+ icons, buttons, badges, and design tokens alongside our pattern components.

## Architecture

```
┌─────────────────────────────────────────┐
│           Your ChatGPT App              │
├─────────────────────────────────────────┤
│  @ainativekit/ui (Pattern Components)   │
│  Card, Album, Carousel, List, Map       │
├─────────────────────────────────────────┤
│  @openai/apps-sdk-ui (Primitives)       │
│  Button, Badge, Icon, Alert, Avatar     │
└─────────────────────────────────────────┘
```

## What's Included

| Category | Components |
|----------|------------|
| **Cards** | Card, SummaryCard, ImageCard, ListCard |
| **Media** | Album, Carousel, PhotoCarousel |
| **Lists** | List, ListItem, AvatarList |
| **Maps** | CompactMap, FullscreenMap, MapPlaceCard |
| **Feedback** | Modal, Sidebar, Skeleton, Overlay |
| **ChatGPT Hooks** | useTheme, useDisplayMode, useMaxHeight, useWidgetState |

## Quick Start

### Install

```bash
npm install @ainativekit/ui @openai/apps-sdk-ui
```

### Setup

```tsx
import '@openai/apps-sdk-ui/css';
import '@ainativekit/ui/styles';
```

### Use

```tsx
import { SummaryCard } from '@ainativekit/ui';
import { StarFilled, Clock } from '@openai/apps-sdk-ui/components/Icon';

function RestaurantCard({ data }) {
  return (
    <SummaryCard
      images={data.images}
      title={data.name}
      subtitle={data.address}
      badge={data.rating}
      description={data.description}
      metadata={[
        { icon: <StarFilled />, label: data.rating },
        { icon: <Clock />, label: 'Open now' }
      ]}
      buttonText="Reserve"
      onButtonClick={() => {}}
    />
  );
}
```

## Components

### Cards

```tsx
import { Card, SummaryCard, ImageCard, ListCard } from '@ainativekit/ui';

// Compound card for custom layouts
<Card elevationLevel={1} interactive>
  <Card.Image src="..." />
  <Card.Body>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Body>
  <Card.Footer>
    <Card.ActionButton>Action</Card.ActionButton>
  </Card.Footer>
</Card>

// Pre-composed cards
<SummaryCard images={...} title="..." description="..." />
<ImageCard images={...} title="..." />
<ListCard items={...} />
```

### Carousel

```tsx
import { Carousel } from '@ainativekit/ui';

<Carousel>
  {items.map(item => (
    <SummaryCard key={item.id} {...item} />
  ))}
</Carousel>
```

### List

```tsx
import { List, ListItem } from '@ainativekit/ui';
import { StarFilled } from '@openai/apps-sdk-ui/components/Icon';

<List
  header={{ title: 'Top Places', subtitle: 'Based on ratings' }}
  items={places}
  renderItem={(place, index) => (
    <ListItem
      rank={index + 1}
      title={place.name}
      metadata={place.city}
      media={place.thumbnail}
      features={[{ icon: <StarFilled />, label: place.rating }]}
    />
  )}
/>
```

### Album

```tsx
import { Album } from '@ainativekit/ui';

<Album
  albums={[
    {
      id: '1',
      title: 'Photos',
      cover: '...',
      photos: [{ id: '1', url: '...', title: '...' }]
    }
  ]}
  onAlbumSelect={setSelectedAlbum}
  selectedAlbum={selectedAlbum}
/>
```

### Map

```tsx
import { CompactMap } from '@ainativekit/ui';
import { StarFilled } from '@openai/apps-sdk-ui/components/Icon';

<CompactMap
  locations={[
    {
      id: '1',
      name: 'Restaurant',
      coords: [37.7749, -122.4194],
      features: [{ icon: <StarFilled />, label: '4.8' }]
    }
  ]}
  onLocationSelect={setSelected}
/>
```

## ChatGPT Hooks

Hooks for integrating with the ChatGPT Apps SDK runtime - **unique to @ainativekit/ui**:

```tsx
import {
  useTheme,
  useDisplayMode,
  useMaxHeight,
  useWidgetState,
  useOpenAiGlobal,
} from '@ainativekit/ui';

function MyWidget() {
  const { theme } = useTheme();                    // 'light' | 'dark'
  const displayMode = useDisplayMode();            // 'inline' | 'pip' | 'fullscreen'
  const maxHeight = useMaxHeight();                // number | null
  const [state, setState] = useWidgetState(() => ({ count: 0 }));

  return (
    <div style={{ maxHeight: maxHeight ?? 600 }}>
      {/* widget content */}
    </div>
  );
}
```

| Hook | Description |
|------|-------------|
| `useTheme()` | Get current theme from ChatGPT |
| `useDisplayMode()` | Get display mode (inline/pip/fullscreen) |
| `useMaxHeight()` | Get max height constraint |
| `useWidgetState()` | Persistent state across re-renders |
| `useWidgetProps()` | Access tool input/output |
| `useOpenAiGlobal(key)` | Access any `window.openai` property |

## Using apps-sdk-ui Primitives

Icons, buttons, and other primitives come from `@openai/apps-sdk-ui`:

```tsx
// 700+ Icons
import { StarFilled, Clock, MapPin } from '@openai/apps-sdk-ui/components/Icon';

// Buttons (also re-exported from @ainativekit/ui)
import { Button } from '@openai/apps-sdk-ui/components/Button';

// Badges (also re-exported from @ainativekit/ui)
import { Badge } from '@openai/apps-sdk-ui/components/Badge';

// Breakpoints hook
import { useBreakpoint } from '@openai/apps-sdk-ui/hooks/useBreakpoints';
```

## TypeScript

Full TypeScript support with `window.openai` types:

```tsx
import type { Theme, DisplayMode, LocationData } from '@ainativekit/ui';

// window.openai is fully typed when you import @ainativekit/ui
const theme = window.openai?.theme; // 'light' | 'dark' | undefined
```

## Development

```bash
pnpm install          # install deps
pnpm storybook        # run interactive docs
pnpm test             # run tests
pnpm build            # build the library
```

## Links

- [Live Storybook](https://www.ainativekit.com) - Interactive examples
- [GitHub](https://github.com/AINativeKit/chatgpt-apps-sdk-ui)
- [apps-sdk-ui](https://github.com/openai/apps-sdk-ui) - Base primitives

## License

MIT
