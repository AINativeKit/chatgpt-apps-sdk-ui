/**
 * Shared types for @ainativekit/ui
 *
 * These types follow the conventions from @openai/apps-sdk-ui for consistency.
 * See: https://github.com/openai/apps-sdk-ui/blob/main/src/types.ts
 */

// =============================================================================
// Size Types
// =============================================================================

/**
 * Size scale used across components.
 * Follows apps-sdk-ui conventions for consistency.
 */
export type Size =
  | '5xs'
  | '4xs'
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

/**
 * Generic size type helper for constraining to specific sizes.
 */
export type Sizes<T extends Size = Size> = T;

/**
 * Control sizes for interactive elements (buttons, inputs, etc.).
 */
export type ControlSize = Sizes<'3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'>;

// =============================================================================
// Semantic Color Types
// =============================================================================

/**
 * Semantic colors for communicating intent.
 */
export type SemanticColor =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'caution'
  | 'discovery'
  | 'info';

/**
 * Generic semantic color type helper for constraining to specific colors.
 */
export type SemanticColors<T extends SemanticColor = SemanticColor> = T;

// =============================================================================
// Variant Types
// =============================================================================

/**
 * Visual style variants for components.
 */
export type Variant = 'solid' | 'soft' | 'outline' | 'ghost';

/**
 * Generic variant type helper for constraining to specific variants.
 */
export type Variants<T extends Variant = Variant> = T;

// =============================================================================
// Radius Types
// =============================================================================

/**
 * Border radius scale.
 */
export type Radius = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

/**
 * Generic radius type helper for constraining to specific radii.
 */
export type Radii<T extends Radius = Radius> = T;

// =============================================================================
// Text Types
// =============================================================================

/**
 * Text color emphasis levels.
 */
export type TextColor = 'base' | 'emphasis' | 'secondary' | 'tertiary';

/**
 * Generic text color type helper.
 */
export type TextColors<T extends TextColor = TextColor> = T;

// =============================================================================
// Alignment Types
// =============================================================================

/**
 * Alignment options.
 */
export type Alignment = 'start' | 'center' | 'end';

/**
 * Generic alignment type helper.
 */
export type Alignments<T extends Alignment = Alignment> = T;

// =============================================================================
// Font Weight Types
// =============================================================================

/**
 * Font weight options.
 */
export type FontWeight = 'inherit' | 'normal' | 'medium' | 'semibold' | 'bold';

/**
 * Generic font weight type helper.
 */
export type FontWeights<T extends FontWeight = FontWeight> = T;
