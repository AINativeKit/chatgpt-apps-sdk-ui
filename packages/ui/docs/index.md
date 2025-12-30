# AINativeKit UI Documentation

> React component library optimized for ChatGPT Apps SDK with JSON-to-UI mapping, 417 Figma-aligned icons, and AI-native patterns.

## Quick Start

```bash
npm install @ainativekit/ui
```

```tsx
// SDK styles must be imported first (in your entry point)
import '@openai/apps-sdk-ui/css';
import '@ainativekit/ui/styles';

// SDK primitives - import directly
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { Badge } from '@openai/apps-sdk-ui/components/Badge';

// AINativeKit patterns - import from this package
import { SummaryCard } from '@ainativekit/ui';

function App() {
  return (
    <SummaryCard
      title="Little Nona's"
      subtitle="1427 Via Campania"
      badge="9.2"
      badgeVariant="success"
      images={["restaurant.jpg"]}
      buttonText="Order Now"
    />
  );
}
```

## Guides

### [useOpenAiGlobal](/guides/useOpenAiGlobal.md)
Reactive access to ChatGPT's global state with automatic re-rendering.

### [Performance](/guides/performance.md)
Best practices for component performance and optimization.

---

## Component Categories

### [Primitives](/components/primitives/)
Basic building block components.

**SDK Primitives** (import from `@openai/apps-sdk-ui`):
- Button, Badge, Alert, Icon, Chip, EmptyMessage, Image

**Extension Primitives** (import from `@ainativekit/ui`):
- [Skeleton](/components/primitives/skeleton.md)

### [Composed](/components/composed/)
Medium complexity, general-purpose components.

- [Card](/components/composed/card.md)
- [ImageCard](/components/composed/imagecard.md)
- [SummaryCard](/components/composed/summarycard.md)
- [ListCard](/components/composed/listcard.md)
- [Carousel](/components/composed/carousel.md)
- [List](/components/composed/list.md)
- [ListItem](/components/composed/listitem.md)

### [Patterns](/components/patterns/)
Complex, domain-specific, feature-complete patterns.

- [Album](/components/patterns/album.md)
- [AlbumCard](/components/patterns/albumcard.md)
- [AlbumCarousel](/components/patterns/albumcarousel.md)
- [AlbumViewer](/components/patterns/albumviewer.md)
- [FilmStrip](/components/patterns/filmstrip.md)
- [MapView](/components/patterns/mapview.md)
- [CompactMap](/components/patterns/compactmap.md)
- [FullscreenMap](/components/patterns/fullscreenmap.md)
- [LocationCard](/components/patterns/locationcard.md)
- [LocationCarousel](/components/patterns/locationcarousel.md)
- [MapSidebar](/components/patterns/mapsidebar.md)
- [MapInspector](/components/patterns/mapinspector.md)

## Features

- 🎯 **Apps SDK Optimized:** Components designed for ChatGPT Apps SDK
- 🔄 **JSON → UI Mapping:** Render structured MCP results with minimal code
- 🎨 **417 Figma-Aligned Icons:** Fully typed with semantic categories
- ♿ **Accessibility First:** ARIA attributes & sensible focus management
- 🌗 **Dark/Light Themes:** Built-in theme switching
- 📦 **Type-Safe:** Full TypeScript support with JSDoc documentation

## Links

- [GitHub Repository](https://github.com/AINativeKit/chatgpt-apps-sdk-ui)
- [Storybook](https://www.ainativekit.com)
- [NPM Package](https://www.npmjs.com/package/@ainativekit/ui)
