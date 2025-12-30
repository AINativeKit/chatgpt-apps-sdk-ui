/**
 * @ainativekit/ui Components
 *
 * Extension components for ChatGPT Apps SDK.
 *
 * SDK Primitives (Button, Badge, Alert, Icon, etc.) should be imported directly
 * from @openai/apps-sdk-ui. This package provides pattern components that build
 * on top of the SDK primitives.
 *
 * @example
 * // SDK primitives - import directly
 * import { Button } from '@openai/apps-sdk-ui/components/Button';
 * import { Badge } from '@openai/apps-sdk-ui/components/Badge';
 * import { Alert } from '@openai/apps-sdk-ui/components/Alert';
 *
 * // AINativeKit patterns - import from this package
 * import { Carousel, SummaryCard, Map } from '@ainativekit/ui';
 */

// =============================================================================
// Extension Components - Our value-add beyond apps-sdk-ui
// =============================================================================

// Primitives (extensions)
export { Skeleton } from './Skeleton';
export type { SkeletonProps } from './Skeleton';

export { Features } from './Feature';
export type { FeaturesProps, FeatureItem } from './Feature';

export { Overlay } from './Overlay';
export type { OverlayProps } from './Overlay';

export { ExpandableText } from './ExpandableText';
export type { ExpandableTextProps } from './ExpandableText';

export { PhotoCarousel } from './PhotoCarousel';
export type { PhotoCarouselProps } from './PhotoCarousel';

export { AvatarList } from './AvatarList';
export type { AvatarListProps, AvatarListItem } from './AvatarList';

export { Sidebar } from './Sidebar';
export type { SidebarProps } from './Sidebar';

export { Modal } from './Modal';
export type { ModalProps } from './Modal';

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
  MapInspectorList,
} from './Map';
