/**
 * Unified error/empty state display component
 * Used by Map components to show consistent error and empty states
 */

import React from 'react';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { Alert } from '@openai/apps-sdk-ui/components/Alert';

export interface ErrorStateDisplayProps {
  /**
   * State type to display
   */
  state: 'error' | 'empty';

  /**
   * Title text
   */
  title: string;

  /**
   * Message text (optional)
   */
  message?: string;

  /**
   * Action handler (for error state with retry)
   */
  onAction?: () => void;

  /**
   * Action button label
   */
  actionLabel?: string;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Container className
   */
  containerClassName?: string;
}

/**
 * Unified error/empty state display
 * Simplifies repetitive error/empty state rendering across Map components
 */
export const ErrorStateDisplay: React.FC<ErrorStateDisplayProps> = ({
  state,
  title,
  message,
  onAction,
  actionLabel,
  className,
  containerClassName,
}) => {
  const color = state === 'error' ? 'danger' : 'info';
  const defaultActionLabel = state === 'error' ? 'Try again' : undefined;
  const buttonLabel = actionLabel ?? defaultActionLabel;

  return (
    <div className={containerClassName}>
      <Alert
        color={color}
        variant="soft"
        title={title}
        description={message}
        actions={
          onAction && buttonLabel ? (
            <Button color="primary" size="sm" variant="ghost" onClick={onAction}>
              {buttonLabel}
            </Button>
          ) : undefined
        }
        className={className}
      />
    </div>
  );
};

ErrorStateDisplay.displayName = 'ErrorStateDisplay';
