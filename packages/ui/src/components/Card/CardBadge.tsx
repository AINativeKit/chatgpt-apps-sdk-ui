import { Badge, type BadgeProps } from '@openai/apps-sdk-ui/components/Badge';

/**
 * CardBadgeProps - Badge for card usage
 *
 * Extends BadgeProps with sensible defaults for card contexts:
 * - pill: true (rounded corners)
 * - size: 'sm' (compact size suitable for cards)
 * - color: 'secondary' (neutral gray)
 * - variant: 'soft' (subtle background)
 */
export interface CardBadgeProps extends BadgeProps {
  /**
   * Optional test ID for testing purposes
   */
  'data-testid'?: string;
}

/**
 * Card.Badge - Badge component for card labels and tags
 *
 * Pre-configured with card-friendly defaults:
 * - Pill shape for modern appearance
 * - Small size for compact layouts
 * - Secondary color (neutral gray)
 * - Soft variant for subtle styling
 *
 * All Badge props are supported and can override defaults.
 *
 * @example
 * ```tsx
 * // Basic usage with defaults
 * <Card.Badge>New</Card.Badge>
 *
 * // Custom color and variant
 * <Card.Badge color="success" variant="solid">Featured</Card.Badge>
 *
 * // Multiple badges
 * <Card.BadgeGroup>
 *   <Card.Badge>React</Card.Badge>
 *   <Card.Badge>TypeScript</Card.Badge>
 * </Card.BadgeGroup>
 * ```
 */
export const CardBadge = (props: CardBadgeProps) => {
  const {
    pill = true,
    size = 'sm',
    color = 'secondary',
    variant = 'soft',
    'data-testid': testId,
    ...rest
  } = props;

  return (
    <Badge
      pill={pill}
      size={size}
      color={color}
      variant={variant}
      data-testid={testId}
      {...rest}
    />
  );
};

CardBadge.displayName = 'Card.Badge';
