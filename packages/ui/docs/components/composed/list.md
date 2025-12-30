# List

Component for building user interfaces.

## Import

```tsx
// SDK styles must be imported first (in your entry point)
import '@openai/apps-sdk-ui/css';
import '@ainativekit/ui/styles';

// Then import the component
import { List } from '@ainativekit/ui';
```

## Basic Usage

```tsx
<List />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `import("/Users/jakelin/dev/ai/ai-native-kit/ainativekit-ui/packages/ui/src/components/List/List").ListHeaderProps \| undefined` | - | Optional header configuration (title, subtitle, thumbnail, actions). |
| `items` | `T[]` | - | Array of data items to render. |
| `renderItem` | `(item: T, index: number) => React.ReactNode` | - | Render function for list rows. |
| `emptyMessage` | `React.ReactNode` | `"No items found."` | Message to show when the list is empty. |
| `showDividers` | `boolean \| undefined` | `true` | Controls whether divider lines are rendered between rows. |
| `loading` | `boolean \| undefined` | `false` | Loading state - renders items with loading context or skeleton items |
| `loadingItems` | `number \| undefined` | `3` | Number of skeleton items to show when loading and no items provided |
| `error` | `boolean \| undefined` | `false` | Error state - shows error message |
| `errorTitle` | `string \| undefined` | `'Failed to load items'` | Custom error title |
| `errorMessage` | `string \| undefined` | - | Custom error message |
| `onErrorRetry` | `(() => void) \| undefined` | - | Error retry handler - shows retry button when provided |
| `emptyTitle` | `string \| undefined` | `'No items'` | Empty state title when no items provided |
| `emptyState` | `React.ReactNode` | - | Custom empty state content |
---

_Generated from TypeScript definitions. [View source](../../src/components/List/List.tsx)_