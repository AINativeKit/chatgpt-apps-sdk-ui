import { Badge, type BadgeProps } from '@openai/apps-sdk-ui/components/Badge';

/**
 * CardChipProps - Badge-based chip for card usage
 *
 * Note: In v1, CardChip uses apps-sdk-ui Badge component.
 * Chip-specific features (onRemove, onClick) are no longer supported.
 * Use Badge's color and variant props instead of the old variant prop.
 *
 * Migration:
 * - variant="default" → color="primary" variant="soft"
 * - variant="success" → color="success"
 * - variant="warning" → color="warning"
 * - variant="error" → color="danger"
 * - variant="neutral" → color="secondary"
 */
export interface CardChipProps extends BadgeProps {
  /**
   * Optional test ID for testing purposes
   */
  'data-testid'?: string;
}

/**
 * Card.Chip - Badge-based component for card labels and tags
 *
 * Use Chip for text labels, tags, and categories within cards.
 *
 * @example
 * ```tsx
 * <Card.Body>
 *   <div style={{ display: 'flex', gap: '8px' }}>
 *     <Card.Chip color="secondary" size="sm">Design</Card.Chip>
 *     <Card.Chip color="secondary" size="sm">Systems</Card.Chip>
 *   </div>
 * </Card.Body>
 * ```
 *
 * @example
 * ```tsx
 * <Card.Header>
 *   <Card.Title>Product Name</Card.Title>
 *   <Card.Chip color="success" size="sm">New</Card.Chip>
 * </Card.Header>
 * ```
 */
export const CardChip = (props: CardChipProps) => {
  const { 'data-testid': testId, ...rest } = props;
  return <Badge data-testid={testId} {...rest} />;
};

CardChip.displayName = 'Card.Chip';
