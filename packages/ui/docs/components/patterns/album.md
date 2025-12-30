# Album

Component for building user interfaces.

## Import

```tsx
// SDK styles must be imported first (in your entry point)
import '@openai/apps-sdk-ui/css';
import '@ainativekit/ui/styles';

// Then import the component
import { Album } from '@ainativekit/ui';
```

## Basic Usage

```tsx
// Uncontrolled (manages its own state)
<Album albums={albumsData} />

// Controlled (external state)
<Album
  albums={albumsData}
  selectedAlbum={currentAlbum}
  onAlbumSelect={setCurrentAlbum}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `albums` | `import("/Users/jakelin/dev/ai/ai-native-kit/ainativekit-ui/packages/ui/src/components/Album/types").Album[]` | - | Array of albums to display |
| `onAlbumSelect` | `((album: import("/Users/jakelin/dev/ai/ai-native-kit/ainativekit-ui/packages/ui/src/components/Album/types").Album \| null) => void) \| undefined` | - | Callback when an album is selected (optional - external state control) |
| `selectedAlbum` | `import("/Users/jakelin/dev/ai/ai-native-kit/ainativekit-ui/packages/ui/src/components/Album/types").Album \| null \| undefined` | - | Controlled selected album (optional - for external state control) |
| `initialPhotoIndex` | `number \| undefined` | `0` | Initial photo index when opening viewer |
---

_Generated from TypeScript definitions. [View source](../../src/components/Album/Album.tsx)_