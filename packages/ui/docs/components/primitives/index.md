# Primitives

## SDK Primitives

AINativeKit does not re-export SDK primitives. Import them directly from `@openai/apps-sdk-ui`:

```tsx
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { Badge } from '@openai/apps-sdk-ui/components/Badge';
import { Alert } from '@openai/apps-sdk-ui/components/Alert';
import { Sun, Warning, MapPin } from '@openai/apps-sdk-ui/components/Icon';
import { Image } from '@openai/apps-sdk-ui/components/Image';
```

See [OpenAI Apps SDK UI Documentation](https://openai.github.io/apps-sdk-ui/) for the full component reference.

## Extension Primitives

These are AINativeKit primitives that extend beyond what the SDK provides:

### [Skeleton](./skeleton.md)

Loading placeholder component for content that is still being fetched.
