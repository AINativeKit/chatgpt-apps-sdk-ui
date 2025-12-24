import { Badge, type BadgeProps } from '@openai/apps-sdk-ui/components/Badge';

export interface CardBadgeProps extends BadgeProps {
  /**
   * Optional test ID for testing purposes
   */
  'data-testid'?: string;
}

/**
 * Card.Badge - Wrapper around the Badge primitive optimized for card usage
 *
 * @example
 * ```tsx
 * <Card.Header>
 *   <Card.Title>Product Name</Card.Title>
 *   <Card.Badge color="success" variant="soft">New</Card.Badge>
 * </Card.Header>
 * ```
 */
export const CardBadge = (props: CardBadgeProps) => {
  return <Badge {...props} />;
};

CardBadge.displayName = 'Card.Badge';
