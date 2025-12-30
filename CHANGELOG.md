# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Breaking Changes

- **Removed SDK Primitive Re-exports**: Button, Badge, Alert, and ButtonLink are no longer re-exported from `@ainativekit/ui`. Import them directly from `@openai/apps-sdk-ui`:
  ```tsx
  // Before (no longer works)
  import { Button, Badge, Alert } from '@ainativekit/ui';

  // After
  import { Button } from '@openai/apps-sdk-ui/components/Button';
  import { Badge } from '@openai/apps-sdk-ui/components/Badge';
  import { Alert } from '@openai/apps-sdk-ui/components/Alert';
  ```

### Why This Change

Re-exporting SDK primitives caused CSS loading issues - SDK CSS variables (`--alert-gutter`, `--alert-gap`, etc.) weren't available when importing through AINativeKit. Direct imports ensure proper CSS variable loading.

## [1.0.0] - 2025-12-28

### Breaking Changes

- **Architecture Shift**: @ainativekit/ui is now an extension layer built on @openai/apps-sdk-ui
  - Added `@openai/apps-sdk-ui@^0.2.0` as peer dependency
  - Must import base CSS: `import '@openai/apps-sdk-ui/css'` before `import '@ainativekit/ui/styles'`

- **Removed Primitives** (use @openai/apps-sdk-ui instead):
  - `Button` → `import { Button } from '@openai/apps-sdk-ui/components/Button'`
  - `Badge` → `import { Badge } from '@openai/apps-sdk-ui/components/Badge'`
  - `Alert` → `import { Alert } from '@openai/apps-sdk-ui/components/Alert'`
  - `Icon` → `import { StarFilled } from '@openai/apps-sdk-ui/components/Icon'`
  - `Chip` → `import { Chip } from '@openai/apps-sdk-ui/components/Chip'`
  - `Avatar` → `import { Avatar } from '@openai/apps-sdk-ui/components/Avatar'`

- **Removed Hook**: `useBreakpoint` → `import { useBreakpoint } from '@openai/apps-sdk-ui'`

### Added

- **New Components**:
  - `Modal`: Centered overlay dialog with customizable content
  - `Sidebar`: Animated slide-in panel (left/right positioning)
  - `AvatarList`: Reusable list with avatar, title, metadata, and description

- **Comprehensive MDX Documentation**:
  - All components now have dedicated .mdx documentation files
  - Interactive examples with code snippets
  - Props tables with type hints

- **Gallery Stories**:
  - Production-ready pattern examples (Cards, Carousel, List, Albums, Maps)
  - CodeBlock integration for syntax-highlighted code examples

- **Design Tokens Page**: Documents base tokens from apps-sdk-ui + component-specific tokens

### Changed

- **Storybook Organization**: Reorganized into categories
  - Cards: Card, SummaryCard, ImageCard, ListCard
  - Media: Album, AlbumCard, Carousel, PhotoCarousel
  - Maps: CompactMap, FullscreenMap, MapPlaceCard, TileProviders, CustomMarkers
  - Layout: Modal, Sidebar, Skeleton, Overlay
  - Utilities: ExpandableText, Features, AvatarList, List
  - Hooks: OpenAI Integration (useTheme, useDisplayMode, useWidgetState)
  - Gallery: Interactive showcases

- **All Components**: Updated to use apps-sdk-ui primitives (Button, Badge, Icon, Avatar)

- **Documentation**:
  - README updated to "🧩 AINativeKit UI - ChatGPT Apps SDK Extension"
  - Positions library as 100% compatible extension layer
  - Accurate feature descriptions (no false claims about icons)

### Migration Guide

1. Install peer dependency:
   ```bash
   npm install @openai/apps-sdk-ui
   ```

2. Update CSS imports:
   ```tsx
   // Before
   import '@ainativekit/ui/styles';

   // After
   import '@openai/apps-sdk-ui/css';
   import '@ainativekit/ui/styles';
   ```

3. Update primitive imports:
   ```tsx
   // Before
   import { Button, Badge, Icon } from '@ainativekit/ui';

   // After
   import { Button } from '@openai/apps-sdk-ui/components/Button';
   import { Badge } from '@openai/apps-sdk-ui/components/Badge';
   import { StarFilled } from '@openai/apps-sdk-ui/components/Icon';
   ```

## [0.17.0] - 2025-11-26

### Fixed

- **Map Component**:
  - Resolved Stamen tile 401 errors by adding free tile provider alternatives
  - Removed non-functional settings icon from sidebar header

- **PhotoCarousel Component**:
  - Navigation arrows now use Button component for consistent styling
  - Added dark mode support to navigation dots using design tokens
  - Improved nav button hover/active states to match Carousel component

### Changed

- **Carousel Component**:
  - Updated nav button hover/active states for consistency with PhotoCarousel

### Documentation

- Added `images` array example to FullscreenMap stories showing multi-photo locations
- Documented PhotoCarousel integration with MapInspector

## [0.16.0] - 2025-11-25

### Added

- **Map Component Features**:
  - **Multi-Tile Provider Support**: Added 15+ built-in tile provider presets
    - OpenStreetMap variants (Standard, HOT, France, Black & White)
    - CartoDB variants (Positron, Voyager, Dark Matter)
    - Stadia Maps (OSM Bright, Outdoors, Alidade Smooth)
    - Stamen terrain maps
    - USGS topographic maps
    - Easily switch between providers with `tileProvider` prop
  - **Attribution Control**: New `hideAttribution` prop to hide tile provider attribution
    - Default: `false` (attribution shown)
    - Useful for screenshots or when attribution is provided elsewhere

### Changed

- **ExpandableText Component**:
  - Enhanced text truncation logic for more accurate line counting
  - Updated default labels: "view more" → "View more", "view less" → "View less" (capitalized)
  - Improved HTML tag support documentation with `<br>` tag examples
  - Increased default `maxLines` from 3 to 4 for better content preview

### Fixed

- **Map Component**:
  - Cleaner attribution display with proper spacing and formatting
- **ExpandableText Component**:
  - Fixed text rendering to properly handle browser default line heights
  - Improved expand/collapse behavior for edge cases
- **MapInspector Component**:
  - Fixed literal `<br>` tags displaying in descriptions instead of line breaks
  - Now properly renders HTML line breaks in location descriptions
- **Storybook**:
  - Fixed dark mode toggle functionality in Storybook environment
  - Theme switching now works correctly for development and documentation

## [0.15.0] - 2025-11-25

### Added

- **Map Component Features**:
  - **Display Mode Synchronization**: Map component now automatically syncs with ChatGPT's `displayMode` changes
    - Uses `useDisplayMode()` hook to listen for display mode changes from ChatGPT
    - Clicking ChatGPT's X button automatically collapses the map to compact view
    - Two-way sync: widget responds to both internal and external display mode changes
    - Only syncs in uncontrolled mode (respects external state management)
  - **Auto-Expand on Carousel Click**: New `autoExpandOnCarouselClick` prop for Map component
    - Automatically expands to fullscreen when user clicks a carousel card
    - Provides faster access to detailed location information (one click instead of two)
    - Default: `false` (opt-in behavior)
  - **Popup Control**: New `showPopup` prop to disable marker popup bubbles
    - Useful when using external UI like Inspector panels or sidebars for location details
    - Default: `true` (popups enabled)
  - **Scroll Wheel Zoom Control**: New `scrollWheelZoom` prop for zoom behavior customization
    - `true`: Native Leaflet scroll zoom (best for fullscreen maps)
    - `false`: Custom pinch-to-zoom for embedded maps (default)
  - **Custom Marker Rendering**: New `renderMarker` API for customizing map markers
    - Supports React components for markers
    - Global styling, per-location customization, and hybrid modes
    - Performance optimized with proper cleanup

### Changed

- **Storybook Documentation**:
  - Updated Map component docs to document display mode sync behavior
  - Added ChatGPT Apps SDK Integration section explaining automatic sync
  - Documented new interaction control props (showPopup, scrollWheelZoom, autoExpandOnCarouselClick)
  - Added examples for custom marker rendering

### Fixed

- **Map Display Mode Bug**: Fixed issue where clicking ChatGPT's X button didn't collapse the Map component
  - Previously: Map stayed in fullscreen mode when ChatGPT's displayMode changed to 'inline'
  - Now: Map automatically collapses to compact view when ChatGPT closes fullscreen
  - Root cause: Map wasn't listening to ChatGPT's displayMode changes
  - Solution: Added useDisplayMode() hook with useEffect to sync internal state

## [0.14.0] - 2025-11-24

### Breaking Changes

- **Map Components**: Removed `markerColor` and `selectedMarkerColor` props
  - Markers now use `var(--ai-color-brand-primary)` from ThemeProvider
  - **Migration**: Remove color props, customize via `<ThemeProvider brandColors={{ primary: '#your-color' }}>`
  - Simplifies API by 40% (fewer props to manage)

- **Component Rename**: `LocationCard` → `MapPlaceCard`
  - Updated all exports, tests, and documentation
  - **Migration**: Update imports from `LocationCard` to `MapPlaceCard`
  - Added new `variant` prop: `'carousel' | 'list'`

### Added

- **Map Features**:
  - Hybrid marker variant: dots for unselected, pins for selected markers
  - React element support for Feature icons (custom SVG components)
  - Three marker variants: `'pin'`, `'dot'`, `'hybrid'` (recommended)

- **New Components**:
  - `PhotoCarousel`: Embla-based carousel with navigation dots and arrows
  - `ExpandableText`: Text with inline "view more/less" functionality
  - `Overlay`: Generic overlay component for images (extracted from SummaryCard)

- **MapInspector Enhancements**:
  - Multiple images support with PhotoCarousel
  - ExpandableText for long descriptions
  - Uses Button component for bottom actions
  - Added `images` and `topOverlay` fields to LocationData type

- **Storybook**:
  - ThemeProvider integration with `brandColors` configuration
  - Marker variants showcase (pin, dot, hybrid side-by-side)
  - Separate state per example to prevent race conditions

### Changed

- **Visual Design**:
  - Replaced box-shadows with borders for cleaner appearance
  - Map popup arrow positioning improved (seamless connection)
  - MapInspector image aspect ratio: 16:9 → 5:4 (better for property photos)
  - Overlay default height: 40px → 56px

- **Theme System**:
  - All accent colors standardized to `var(--ai-color-brand-primary)`
  - Components: AlbumCard, FilmStrip, Button, List, LocationCard focus outlines
  - Optional theme context with graceful CSS variable fallback

- **Code Quality**:
  - MapPlaceCard variant system (~700 lines removed)
  - SummaryCard uses shared Overlay component
  - MapInspector uses Button component instead of custom CSS
  - MapSidebar simplified (92 lines removed)

### Fixed

- Map popup arrow displays cleanly below popup box (no overlapping borders)
- Dot marker variant now properly shows dots for selected state
- React Hook dependency warnings (added MARKER_COLOR to deps)
- TypeScript errors with optional theme context
- SummaryCard test selectors updated for renamed CSS classes

## [0.12.0] - 2025-11-17

### Changed

- **Carousel**: Default viewport padding is now `0` instead of `var(--ai-spacing-10)`
  - Padding is now opt-in instead of opt-out
  - Prevents layout issues in constrained spaces (e.g., 640px ChatGPT iframe)
  - Use `viewportPadding="var(--ai-spacing-10)"` to restore previous behavior

### Fixed

- **SummaryCard.Overlay**: Height calculation now correctly includes padding
  - Added `box-sizing: border-box` so `height={40}` with `padding={8}` results in 40px total, not 56px
  - Overlay content now clips properly to image rounded corners with `overflow: hidden`

## [0.11.0] - 2025-11-16

### Added

- **Light/Dark Mode Brand Colors**: Brand colors now support theme-aware variants
  - New `BrandColorValue` type: `string | { light: string; dark: string }`
  - Specify different colors for light and dark themes: `{ light: '#059669', dark: '#34D399' }`
  - Backward compatible - existing string colors work unchanged
  - Automatic CSS generation for both themes using data-attribute selectors
  - Validation caching prevents duplicate console warnings for string colors
  - Comprehensive unit tests for all light/dark mode scenarios

### Changed

- **Documentation**: Updated all README files with brand color customization examples
  - Added "Brand Color Customization" section with light/dark mode examples
  - Replaced brand-specific color examples with generic Tailwind CSS colors
  - Updated TOKEN_USAGE.md with CSS variable reference table

### Fixed

- **ESLint Configuration**: Added missing TypeScript ESLint plugins to workspace root
  - Resolves ESLint plugin resolution errors

## [0.10.0] - 2025-11-11

### Changed

- **Repository Rename**: Renamed from `ainativekit-ui` to `chatgpt-apps-sdk-ui` for improved discoverability
  - GitHub repository now at `AINativeKit/chatgpt-apps-sdk-ui`
  - NPM package name remains `@ainativekit/ui` for backward compatibility
  - All documentation URLs updated to reflect new repository name

- **Branding & Positioning**: Updated to "AINativeKit - ChatGPT Apps SDK UI"
  - Emphasizes "ChatGPT Apps SDK" positioning for better SEO and target audience clarity
  - Subtitle: "The React UI library for ChatGPT Apps SDK"
  - Tagline: "Build beautiful ChatGPT Apps 10x faster"

- **Documentation Enhancements**:
  - Added "Who This Is For" section targeting ChatGPT Apps developers
  - Added comparison table showing value proposition (before/after scenarios)
  - Replaced Contributing section with "Support the Project" featuring stronger CTAs
  - Added SEO footer with keywords and descriptive paragraph for search optimization
  - Updated badges: added npm downloads and GitHub stars, removed TypeScript badge

- **NPM Optimization**:
  - Updated package description to emphasize "ChatGPT Apps SDK"
  - Added 5 new high-value keywords: `chatgpt-apps-sdk`, `react-components`, `ui-components`, `chatgpt-ui`, `mcp`

**Note**: This is a documentation and marketing release. No breaking changes to components or APIs.

## [0.9.0] - 2025-11-10

### Fixed

- **Carousel**: Fixed horizontal page overflow in width-constrained containers (Issue #17)
  - Replaced negative margin gap implementation with CSS `gap` property
  - Carousel now properly contains itself without requiring parent containers to use `overflow-x: hidden`
  - Self-contained component handles its own overflow correctly

## [0.8.0] - 2025-11-09

### Fixed

- **SummaryCard**: Button skeleton width now matches button width (Issue #15)
  - Skeleton buttons use the same width logic as real buttons
  - `buttonFullWidth={false}` → auto-width (min 120px) for both skeleton and button
  - `buttonFullWidth={true}` → full-width (100%) for both skeleton and button
  - `buttonFullWidth={undefined}` → variant-based (full for default, auto for flat)

### Changed

- **SummaryCard**: Simplified `buttonFullWidth` behavior
  - `buttonFullWidth={false}`: Always auto-width (min 120px)
  - `buttonFullWidth={true}`: Always full-width (100%)
  - `buttonFullWidth={undefined}`: Full-width for default variant, auto-width for flat variant
  - Button width is now fixed and predictable - no responsive behavior
  - Simpler implementation using standard CSS

### Technical Details

All components use simple, predictable viewport-based media queries for responsive behavior:

```css
/* SummaryCard: Fixed button widths based on prop */
.buttonSection[data-full-width='false'] .button {
  width: auto;
  min-width: 120px;
}

/* List & AlbumViewer: Viewport-based responsive behavior */
@media (min-width: 640px) {
  /* Tablet/desktop styles */
}
```

## [0.7.0] - 2025-11-08

### Added

- **Responsive Breakpoints**: Standardized breakpoint system across all components
  - Added design tokens for breakpoints (640px tablet, 768px desktop, 1024px desktop-wide)
  - Comprehensive Storybook documentation with interactive demos
  - Live viewport width indicators for testing responsive behavior
  - ChatGPT Desktop widget strategy (768px width optimization)

### Fixed

- **SummaryCard**: Button skeleton width now responsive in loading states
  - Use CSS custom property (--button-skeleton-width) for dynamic width calculation
  - Calculate width based on button text length (min 88px, max 200px)
  - Preserve media query behavior for responsive breakpoints
  - Loading state buttons now match data state widths at all breakpoints

### Changed

- **Responsive Breakpoints**: Standardized media queries across components
  - List component: 640px (ensures desktop layout at 768px ChatGPT widget width)
  - Card/SummaryCard/Album: 768px (button auto-width at ChatGPT widget size)
  - FullscreenMap: 1024px (sidebar only on wide screens)
  - All breakpoints use hardcoded px values with inline comments
  - Design tokens serve as documentation reference

## [0.6.0] - 2025-11-07

### Fixed

- **SummaryCard**: Prevent layout shift during loading to data mode transition
  - Set explicit height on description skeleton wrapper to match description's rendered height
  - Normal mode: includes marginTop spacing (2px between lines)
  - Compact mode: accounts for webkit-line-clamp rendering difference (-2px adjustment)
  - Button skeleton width now matches actual button width for flat variant (auto-width 160px)

## [0.5.0] - 2025-11-06

### Added

- **SummaryCard Enhancements**:
  - Top overlay support with `topOverlay` prop and helper component
  - Configurable description lines with `maxDescriptionLines` prop
  - Loading skeleton states for better UX
  - Flat variant with edge-to-edge layout for immersive designs
- **Map Component**: Configurable scroll wheel zoom controls
- **Carousel Component**: Drag-free scrolling and trackpad support
- **Typography System**: Complete font weight token system with light variants

### Changed

- **Card Component**: Reduced spacing for more compact design
- **Card Loading UI**: Improve loading UI to be responsive to smoothly transit to data state.
- **SummaryCard**: Consolidated DiscoveryCard functionality with improved structure

### Fixed

- Pizza restaurant description and SummaryCard dimension adjustments

## [0.4.0] - 2025-11-03

### Added

- **ThemeProvider**: New provider component for programmatic theme control
  - Enables theme switching in standalone apps and development environments
  - Respects ChatGPT theme authority when running inside ChatGPT (read-only mode)
  - Supports localStorage persistence and system preference detection
  - See [Theme Management](packages/ui/README.md#-openai-hooks--theme-management) for usage
- [Performance Best Practices](packages/ui/docs/guides/performance.md) guide
  - Clarifies typical ChatGPT Apps SDK usage patterns (10-20 items)
  - Explains why virtualization is not needed for conversational UI
  - Provides optimization tips for image-heavy content
  - Documents when to consider pagination vs virtualization

### Changed

- **useTheme()**: Enhanced to return object with `{ theme, setTheme, isControlledByChatGPT }`
  - **Breaking Change**: Previously returned `Theme | null`, now returns `UseThemeResult` object
  - Works seamlessly with or without ThemeProvider
  - Inside ChatGPT: Read-only theme from `window.openai.theme`
  - Inside ThemeProvider: Full theme control with localStorage persistence
- Icon system documentation updated to remove misleading tree-shaking claims
  - Icons use runtime lookup (not tree-shakeable)
  - Bundle includes all 417 icons (606KB source, 206KB gzipped)
  - Focus on actual benefits: type safety, autocompletion, semantic categories

### Fixed

- Icon data generation script now handles missing source directory gracefully
- Storybook build no longer fails when icon source files are unavailable
- ESLint errors in theme implementation (Rules of Hooks violations)

## [0.1.0] - 2025-10-28

### Added

#### Components

- **Core Primitives** (Production-Ready): Button, Icon, Badge, Chip, Alert, Skeleton, Feature, Card (Base)
- **Example Patterns** (Reference Implementations):
  - Card Variants (Image, Summary, List, Discovery)
  - Carousel, List
  - Album (photo gallery pattern - adapt for your media type)
  - Map (location pattern - adapt for your data source)

#### Design System

- Complete design token system (colors, typography, spacing, elevation, radius, opacity)
- 417 fully type-safe icons across 7 categories
- Light and dark theme support
- CSS custom properties for all tokens

#### OpenAI Integration

- `useOpenAiGlobal()` - Access ChatGPT global object
- `useWidgetProps()` - Widget-specific props management
- `useWidgetState()` - State management for widgets
- `useMaxHeight()` - Responsive height handling
- `useDisplayMode()` - Detect display mode (inline/fullscreen)

#### Developer Experience

- Full TypeScript support with JSDoc documentation
- ESM and CJS builds
- Multiple export paths for granular imports
- Comprehensive Storybook with 29 stories
- 15 test files with Vitest + React Testing Library
- Custom ESLint rule for tier dependency enforcement

#### Documentation

- 29 Storybook stories with interactive examples
- Gallery examples showing real-world patterns

### Infrastructure

- pnpm workspace monorepo setup
- Vite build system
- Vitest testing setup
- ESLint + Prettier code quality
- Icon normalization scripts
- Automated icon component generation

---

## Versioning

This library follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality in a backward-compatible manner
- **PATCH** version for backward-compatible bug fixes

---

[1.0.0]: https://github.com/AINativeKit/chatgpt-apps-sdk-ui/releases/tag/v1.0.0
[0.17.0]: https://github.com/AINativeKit/chatgpt-apps-sdk-ui/releases/tag/v0.17.0
[0.16.0]: https://github.com/AINativeKit/chatgpt-apps-sdk-ui/releases/tag/v0.16.0
[0.15.0]: https://github.com/AINativeKit/chatgpt-apps-sdk-ui/releases/tag/v0.15.0
[0.14.0]: https://github.com/AINativeKit/chatgpt-apps-sdk-ui/releases/tag/v0.14.0
[0.12.0]: https://github.com/AINativeKit/chatgpt-apps-sdk-ui/releases/tag/v0.12.0
[0.11.0]: https://github.com/AINativeKit/chatgpt-apps-sdk-ui/releases/tag/v0.11.0
[0.10.0]: https://github.com/AINativeKit/chatgpt-apps-sdk-ui/releases/tag/v0.10.0
[0.9.0]: https://github.com/AINativeKit/chatgpt-apps-sdk-ui/releases/tag/v0.9.0
[0.8.0]: https://github.com/AINativeKit/chatgpt-apps-sdk-ui/releases/tag/v0.8.0
[0.7.0]: https://github.com/AINativeKit/chatgpt-apps-sdk-ui/releases/tag/v0.7.0
[0.6.0]: https://github.com/AINativeKit/chatgpt-apps-sdk-ui/releases/tag/v0.6.0
[0.5.0]: https://github.com/AINativeKit/chatgpt-apps-sdk-ui/releases/tag/v0.5.0
[0.4.0]: https://github.com/AINativeKit/chatgpt-apps-sdk-ui/releases/tag/v0.4.0
[0.1.0]: https://github.com/AINativeKit/chatgpt-apps-sdk-ui/releases/tag/v0.1.0
