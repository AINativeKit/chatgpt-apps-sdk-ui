# Card

Component for building user interfaces.

## Import

```tsx
// SDK styles must be imported first (in your entry point)
import '@openai/apps-sdk-ui/css';
import '@ainativekit/ui/styles';

// Then import the component
import { Card } from '@ainativekit/ui';
```

## Basic Usage

```tsx
<Card />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `elevationLevel` | `import("/Users/jakelin/dev/ai/ai-native-kit/ainativekit-ui/packages/ui/src/tokens/elevation").ElevationLevel \| undefined` | `1` | Elevation level for the card. |
| `border` | `import("/Users/jakelin/dev/ai/ai-native-kit/ainativekit-ui/packages/ui/src/components/Card/Card").CardBorder \| undefined` | `'heavy'` | Border weight token. |
| `hoverElevationLevel` | `import("/Users/jakelin/dev/ai/ai-native-kit/ainativekit-ui/packages/ui/src/tokens/elevation").ElevationLevel \| undefined` | - | Elevation applied on hover when `interactive` is true.
Defaults to the next elevation level. |
| `interactive` | `boolean \| undefined` | `false` | Enables hover affordance. |
| `padding` | `string \| number \| undefined` | `'var(--ai-spacing-12)'` | Padding for the card. Can be a CSS value string or number (in px). |
| `loading` | `boolean \| undefined` | `false` | Show loading skeleton state |
| `skeleton` | `React.ReactNode` | - | Custom skeleton content to show when loading
If not provided, shows default skeleton layout |
| `error` | `boolean \| undefined` | `false` | Show error state |
| `errorTitle` | `string \| undefined` | `'Something went wrong'` | Error title to display |
| `errorMessage` | `string \| undefined` | - | Error message to display |
| `onErrorRetry` | `(() => void) \| undefined` | - | Retry handler for error state
When provided, shows a retry button |
| `errorContent` | `React.ReactNode` | - | Custom error content to show when error is true
If not provided, shows default error message |
| `'data-testid'` | `string \| undefined` | - | Optional test ID for testing purposes |
---

_Generated from TypeScript definitions. [View source](../../src/components/Card/Card.tsx)_