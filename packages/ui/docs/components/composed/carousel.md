# Carousel

Component for building user interfaces.

## Import

```tsx
// SDK styles must be imported first (in your entry point)
import '@openai/apps-sdk-ui/css';
import '@ainativekit/ui/styles';

// Then import the component
import { Carousel } from '@ainativekit/ui';
```

## Basic Usage

```tsx
<Carousel />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Slide content - typically Card components.
Optional when using loading, error, or empty states. |
| `align` | `"center" \| "start" \| "end" \| undefined` | `'center'` | Alignment of slides within the viewport. |
| `loop` | `boolean \| undefined` | `false` | Enable infinite looping. |
| `showNavigation` | `boolean \| undefined` | `true` | Show navigation buttons (prev/next arrows). |
| `showEdgeGradients` | `boolean \| undefined` | `true` | Show edge gradient overlays. |
| `gap` | `string \| undefined` | `'var(--ai-spacing-8)'` | Gap between slides using CSS custom property. |
| `onSlideChange` | `((index: number) => void) \| undefined` | - | Callback when slide changes. |
| `className` | `string \| undefined` | - | Additional class name for the container. |
| `style` | `React.CSSProperties \| undefined` | - | Additional inline styles for the container. |
| `flushStart` | `boolean \| undefined` | `false` | Remove the leading offset so the first slide is flush with the viewport start. |
| `startInset` | `string \| undefined` | `'0'` | Custom left inset inside the carousel container.
Useful for re-introducing padding when using `flushStart`. |
| `viewportPadding` | `string \| undefined` | `'0'` | Custom viewport padding (top and bottom). |
| `onApi` | `((api: import("/Users/jakelin/dev/ai/ai-native-kit/ainativekit-ui/node_modules/.pnpm/embla-carousel@8.6.0/node_modules/embla-carousel/esm/components/EmblaCarousel").EmblaCarouselType \| null) => void) \| undefined` | - | Optional callback that receives the Embla API instance once ready. |
| `loading` | `boolean \| undefined` | `false` | Loading state - renders children with loading prop or skeleton slides |
| `loadingSlides` | `number \| undefined` | `6` | Number of skeleton slides to show when loading and no children provided |
| `error` | `boolean \| undefined` | `false` | Error state - shows error message |
| `errorTitle` | `string \| undefined` | `'Failed to load items'` | Custom error title |
| `errorMessage` | `string \| undefined` | - | Custom error message |
| `onErrorRetry` | `(() => void) \| undefined` | - | Error retry handler - shows retry button when provided |
| `emptyTitle` | `string \| undefined` | `'No items'` | Empty state title when no children provided |
| `emptyMessage` | `string \| undefined` | - | Empty state message |
| `emptyState` | `React.ReactNode` | - | Custom empty state content |
---

_Generated from TypeScript definitions. [View source](../../src/components/Carousel/Carousel.tsx)_