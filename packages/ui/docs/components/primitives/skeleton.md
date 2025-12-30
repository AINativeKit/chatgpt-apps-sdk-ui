# Skeleton

Component for building user interfaces.

## Import

```tsx
// SDK styles must be imported first (in your entry point)
import '@openai/apps-sdk-ui/css';
import '@ainativekit/ui/styles';

// Then import the component
import { Skeleton } from '@ainativekit/ui';
```

## Basic Usage

```tsx
// Text skeleton
<Skeleton variant="text" width="80%" />

// Rectangular skeleton (default)
<Skeleton width={200} height={100} />

// Circular skeleton (avatar)
<Skeleton variant="circular" width={40} height={40} />

// Without animation
<Skeleton animation={false} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `import("/Users/jakelin/dev/ai/ai-native-kit/ainativekit-ui/packages/ui/src/components/Skeleton/Skeleton").SkeletonVariant \| undefined` | `'rectangular'` | The shape variant of the skeleton |
| `width` | `string \| number \| undefined` | - | Width of the skeleton. Can be a number (px) or CSS string |
| `height` | `string \| number \| undefined` | - | Height of the skeleton. Can be a number (px) or CSS string |
| `borderRadius` | `string \| number \| undefined` | - | Border radius of the skeleton. Can be a number (px) or CSS string |
| `animation` | `boolean \| undefined` | `true` | Whether to animate the skeleton |
| `'data-testid'` | `string \| undefined` | - | Optional test ID for testing purposes |
---

_Generated from TypeScript definitions. [View source](../../src/components/Skeleton/Skeleton.tsx)_