import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../utils/cn';
import { Button, type ButtonProps } from '@openai/apps-sdk-ui/components/Button';
import styles from './CardParts.module.css';

export type CardActionsAlign = 'start' | 'center' | 'end' | 'stretch';

export interface CardActionsProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Horizontal alignment of actions
   * @default 'end'
   */
  align?: CardActionsAlign;
  /**
   * Optional test ID for testing purposes
   */
  'data-testid'?: string;
}

/**
 * Card.Actions - Container for action buttons with flexible alignment
 *
 * Automatically provides proper spacing and alignment for buttons.
 * Works seamlessly with our Button primitive component.
 *
 * @example
 * ```tsx
 * <Card.Actions align="end">
 *   <Button variant="secondary">Cancel</Button>
 *   <Button variant="primary">Confirm</Button>
 * </Card.Actions>
 * ```
 */
export const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>((props, ref) => {
  const { align = 'end', className, children, 'data-testid': testId, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cn(styles.cardActions, className)}
      data-align={align}
      data-testid={testId}
      {...rest}
    >
      {children}
    </div>
  );
});

CardActions.displayName = 'Card.Actions';

// Convenience component for button actions
// Make color optional since we provide a default
export type CardActionButtonProps = Omit<ButtonProps, 'color'> & { color?: ButtonProps['color'] };

/**
 * Card.ActionButton - Pre-configured button for card actions
 *
 * A convenience wrapper around Button with sensible defaults for card usage.
 *
 * @example
 * ```tsx
 * <Card.Actions>
 *   <Card.ActionButton variant="secondary">Cancel</Card.ActionButton>
 *   <Card.ActionButton variant="primary">Save</Card.ActionButton>
 * </Card.Actions>
 * ```
 */
export const CardActionButton = React.forwardRef<HTMLButtonElement, CardActionButtonProps>(
  (props, ref) => {
    // Default to 'primary' color if not specified for convenience
    const { color = 'primary', ...rest } = props;
    return <Button ref={ref} color={color} {...rest} />;
  }
);

CardActionButton.displayName = 'Card.ActionButton';
