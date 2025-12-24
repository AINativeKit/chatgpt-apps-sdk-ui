/**
 * @ainativekit/ui Components
 *
 * Extension components for ChatGPT Apps SDK.
 * Primitives (Button, Badge, Alert, Icon, etc.) are provided by @openai/apps-sdk-ui.
 */

// =============================================================================
// Re-export apps-sdk-ui primitives for convenience
// Users can import from @ainativekit/ui or @openai/apps-sdk-ui directly
// =============================================================================
export { Button, ButtonLink } from '@openai/apps-sdk-ui/components/Button';
export type { ButtonProps } from '@openai/apps-sdk-ui/components/Button';

export { Badge } from '@openai/apps-sdk-ui/components/Badge';
export type { BadgeProps } from '@openai/apps-sdk-ui/components/Badge';

export { Alert } from '@openai/apps-sdk-ui/components/Alert';
export type { AlertProps } from '@openai/apps-sdk-ui/components/Alert';

// =============================================================================
// Extension Components - Our value-add beyond apps-sdk-ui
// =============================================================================

// Primitives (extensions)
export { Features } from './Feature';
export type { FeaturesProps, FeatureItem } from './Feature';

export { Overlay } from './Overlay';
export type { OverlayProps } from './Overlay';

export { ExpandableText } from './ExpandableText';
export type { ExpandableTextProps } from './ExpandableText';

export { PhotoCarousel } from './PhotoCarousel';
export type { PhotoCarouselProps } from './PhotoCarousel';

// Composed (medium complexity, general-purpose)
export { Card, ImageCard, SummaryCard, ListCard } from './Card';
export type {
  CardProps,
  CardBorder,
  ImageCardProps,
  SummaryCardProps,
  SummaryCardImage,
  ListCardProps,
  ListCardItem,
  ListCardImage,
} from './Card';

export { Carousel } from './Carousel';
export type { CarouselProps } from './Carousel';

export { List, ListItem } from './List';
export type { ListProps, ListHeaderProps, ListItemProps, Feature as ListFeature } from './List';

// Patterns (complex, domain-specific, feature-complete)
export { Album, AlbumCard, AlbumCarousel, AlbumViewer, FilmStrip } from './Album';
export type {
  AlbumProps,
  AlbumCardProps,
  AlbumCarouselProps,
  AlbumViewerProps,
  FilmStripProps,
  AlbumType,
  Photo,
} from './Album';

export {
  Map,
  MapView,
  CompactMap,
  LocationCarousel,
  MapPlaceCard,
  FullscreenMap,
  MapSidebar,
  MapInspector,
  ErrorStateDisplay,
  getErrorState,
  resolveErrorStateValues,
} from './Map';
export type {
  MapProps,
  MapViewProps,
  CompactMapProps,
  LocationCarouselProps,
  MapPlaceCardProps,
  FullscreenMapProps,
  MapSidebarProps,
  MapInspectorProps,
  ErrorStateDisplayProps,
  ErrorStateConfig,
  ErrorStateDefaults,
  ErrorStateProps,
  LocationData,
  Feature,
  Action,
  ListItem as MapListItem,
  GenericList,
} from './Map';
