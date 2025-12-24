export interface Feature {
  /**
   * Optional icon to display before label.
   * Pass a React element (e.g., icon component from apps-sdk-ui).
   */
  icon?: React.ReactNode;

  /**
   * Label text to display (e.g., "4.8", "$$", "Open now").
   */
  label: string;
}

export interface Action {
  /**
   * Button label text.
   */
  label: string;

  /**
   * Button type (primary or secondary).
   */
  variant?: 'primary' | 'secondary';

  /**
   * Optional callback when button is clicked.
   */
  onClick?: () => void;
}

export interface ListItem {
  /**
   * Unique identifier for the list item.
   */
  id: string;

  /**
   * Optional image URL for display (can be avatar, icon, or any image).
   */
  image?: string;

  /**
   * Item title or name.
   */
  title: string;

  /**
   * Optional description or content.
   */
  description?: string;

  /**
   * Optional metadata (author, date, rating, etc.).
   */
  metadata?: string;
}

export interface GenericList {
  /**
   * List title.
   */
  title: string;

  /**
   * List items.
   */
  items: ListItem[];
}

// Forward declare LocationData to avoid circular reference
export interface LocationData {
  /**
   * Unique identifier for the location.
   */
  id: string;

  /**
   * Location name/title.
   */
  name: string;

  /**
   * Geographic coordinates [latitude, longitude].
   */
  coords: [number, number];

  /**
   * Optional subtitle (shown below title).
   */
  subtitle?: string;

  /**
   * Optional headline (shown between actions and description).
   * Typically used for auction/sale method information.
   * @example "Expressions of Interest Closing Tuesday 11 November at 5pm"
   */
  headline?: string;

  /**
   * Optional description (shown in main content area).
   */
  description?: string;

  /**
   * Thumbnail image URL.
   */
  thumbnail: string;

  /**
   * Array of image URLs for photo carousel.
   * If provided, MapInspector will display a photo carousel instead of single thumbnail.
   */
  images?: string[];

  /**
   * Optional overlay content to display on top of photos (e.g., branding, logo).
   * Typically used with PhotoCarousel.Overlay helper component.
   * @example
   * ```tsx
   * topOverlay={
   *   <PhotoCarousel.Overlay background="#0066CC" align="center">
   *     <img src="logo.png" alt="Brand" />
   *   </PhotoCarousel.Overlay>
   * }
   * ```
   */
  topOverlay?: React.ReactNode;

  /**
   * Configurable feature list (rating, price, etc.).
   */
  features?: Feature[];

  /**
   * Optional action buttons (independent of description).
   */
  actions?: Action[];

  /**
   * Optional bottom action button (rendered at bottom after description).
   * Typically used for link-style actions like "View full details".
   */
  bottomAction?: Action;

  /**
   * Optional generic lists (reviews, related items, etc.).
   */
  lists?: GenericList[];

  /**
   * Optional custom marker renderer for this specific location.
   * Overrides the global renderMarker prop on the Map component.
   *
   * Follows the same pattern as Ant Design Table's column render
   * and Material-UI DataGrid's renderCell.
   *
   * @example
   * ```tsx
   * // Return a React element (SVG, component, etc.)
   * renderMarker: ({ isSelected, variant, color }) => (
   *   variant === 'pin'
   *     ? <CustomPinIcon selected={isSelected} color={color} />
   *     : <CustomDotIcon selected={isSelected} color={color} />
   * )
   *
   * // Return null to fall back to default markers
   * renderMarker: ({ isSelected }) => {
   *   if (!isSelected) return null; // Use default for unselected
   *   return <CustomSelectedMarker />;
   * }
   * ```
   */
  renderMarker?: (params: RenderMarkerParams) => React.ReactElement | null;
}

/**
 * Parameters passed to the renderMarker function.
 * Provides all necessary context for rendering custom marker icons.
 */
export interface RenderMarkerParams {
  /**
   * The location data for this marker.
   */
  location: LocationData;

  /**
   * Whether this marker is currently selected.
   */
  isSelected: boolean;

  /**
   * Whether this marker is currently being hovered (active).
   */
  isActive: boolean;

  /**
   * The theme color to use for this marker.
   * Automatically resolved from the theme context.
   */
  color: string;

  /**
   * The marker variant for this marker.
   * When markerVariant="hybrid", this will be 'pin' for selected markers
   * and 'dot' for unselected markers.
   * For other markerVariant values, this will match the global setting.
   */
  variant: 'pin' | 'dot';
}
